from typing import Optional
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from shutil import rmtree, copyfile
from redis import Redis
from pydantic import BaseModel

from checks import fname_check, lowest_pix_size, white_pixels_area
from download_api import get_recursive, process_all_images
from yadisk_API import create_date_folder_in_container, upload_file
from pydantic import BaseModel
from autotoloka_min import create_task_suite


app = FastAPI()
origins = [
    "http://localhost:3000",
    "https://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

IMAGES_FOLDER = '../../public/images'
PUBLIC_FOLDER = '../../public'
ACCEPTED_FOLDER = '../../public/accepted'
ACCEPT_COMMENT = 'Спасибо за участие!'
REJECT_COMMENT = 'К сожалению, фото не соответствует требованиям заказчика'


class DownloadBody(BaseModel):
    sandbox: bool;
    token: str;
    imageData: list


class TasksBody(BaseModel):
    sandbox: bool;
    yaToken: str;
    poolID: str;
    inputValues: list


@app.get("/pools/")
def get_pools(token: Optional[str] = None, sandbox: Optional[str] = None):

    pool_data = []
    for status in ['OPEN', 'CLOSED']:
        url = f'https://toloka.yandex.com/api/v1/pools?limit=300&sort=-created&status={status}' if sandbox == 'false' else \
            f'https://sandbox.toloka.yandex.com/api/v1/pools?limit=300&sort=-created&status={status}'
        resp_items = get_recursive(token, url)
        if type(resp_items) == dict:
            return resp_items
        pool_data += resp_items

    project_ids = [item['project_id'] for item in pool_data]
    project_names = {}

    for project_id in project_ids:
        url = f'https://toloka.yandex.com/api/v1/projects/{project_id}' if sandbox == 'false' else \
            f'https://sandbox.toloka.yandex.com/api/v1/projects/{project_id}'

        project_response = requests.get(
            url,
            headers={
                'Authorization': f'OAuth {token}',
            }
        )
        project_names[project_id] = [project_response.json()['public_name'], project_response.json()['task_spec']['input_spec']]
    for pool in pool_data:
        pool['project_name'] = project_names[pool['project_id']][0]
        pool['input_spec'] = project_names[pool['project_id']][1]
        url = f'https://toloka.yandex.com/api/v1/assignments?limit=100&pool_id={pool["id"]}' if sandbox == 'false' else \
            f'https://sandbox.toloka.yandex.com/api/v1/assignments?limit=100&pool_id={pool["id"]}'
        assignment_resp_items = get_recursive(token, url, limit=1000)
        url = f'https://toloka.yandex.com/api/v1/task-suites?limit=100&pool_id={pool["id"]}' if sandbox == 'false' else \
            f'https://sandbox.toloka.yandex.com/api/v1/task-suites?limit=100&pool_id={pool["id"]}'
        task_suites_resp_items = get_recursive(token, url, limit=1000)
        pool['all_tasks_done'] = not (len(assignment_resp_items) < len(task_suites_resp_items))
        pool['tasks_done'] = len(assignment_resp_items)
        pool['tasks_overall'] = len(task_suites_resp_items)

    return {'items': pool_data}


@app.post('/pools/{action}/')
def open_pool(
    token: Optional[str] = None,
    sandbox: Optional[str] = None,
    pool_id: Optional[str] = None,
    action: Optional[str] = None
):
    url = f'https://toloka.yandex.com/api/v1/pools/{pool_id}/{action}' if sandbox == 'false' else \
        f'https://sandbox.toloka.yandex.com/api/v1/pools/{pool_id}/{action}'
    response = requests.post(
        url,
        headers={
            'Authorization': f'OAuth {token}',
        }
    )

    return response.json()


@app.get('/read_images')
def read_image_names():
    return list(filter(lambda x: ('jpg' in x) or ('jpeg' in x) or ('png' in x), os.listdir(IMAGES_FOLDER)))


@app.get('/read_images_from_pool/')
def read_images_from_pool(token: Optional[str] = None, sandbox: Optional[str] = None, pool_id: Optional[str] = None):
    url = f'https://toloka.yandex.com/api/v1/attachments?limit=100&pool_id={pool_id}' if sandbox == 'false' else \
        f'https://sandbox.toloka.yandex.com/api/v1/attachments?limit=100&pool_id={pool_id}'

    attachments = get_recursive(token, url, limit=1000)

    # Getting assignment statuses
    url = f'https://toloka.yandex.com/api/v1/assignments?limit=100&pool_id={pool_id}' if sandbox == 'false' else \
        f'https://sandbox.toloka.yandex.com/api/v1/assignments?limit=100&pool_id={pool_id}'
    assignments = get_recursive(token, url, limit=1000)

    if type(assignments):
        for item in attachments:
            list_for_filter = list(filter(lambda x: x['id'] == item['details']['assignment_id'], assignments))
            if list_for_filter:
                item.update(
                    {
                        'status': list_for_filter[0]['status']
                    }
                )

    return {"items": attachments}


@app.post('/download_images')
def download_images(body: DownloadBody):
    if len(os.listdir(IMAGES_FOLDER)) != 0:
        rmtree(IMAGES_FOLDER)
    process_all_images(body.sandbox, body.token, body.imageData, 3, 16)


@app.post('/check_name_pattern/')
async def check_name_pattern(request: Request):
    body = await request.json()
    for item in body:
        check_result = fname_check(item['name'])
        if check_result == 'reject':
            item['decision'] = check_result
            item['comment'] = REJECT_COMMENT
    return body


@app.post('/check_images_size/')
async def check_images_size(request: Request):
    body = await request.json()
    for item in body:
        check_result = lowest_pix_size(f'{IMAGES_FOLDER}/{item["fake_name"]}')
        if check_result == 'reject':
            item['decision'] = check_result
            item['comment'] = REJECT_COMMENT
    return body


@app.post('/check_white_area/')
async def check_white_area(request: Request):
    body = await request.json()
    for item in body:
        check_result = white_pixels_area(f'{IMAGES_FOLDER}/{item["fake_name"]}')
        if check_result == 'reject':
            item['decision'] = check_result
            item['comment'] = REJECT_COMMENT
    return body


@app.post('/send_checked_tasks/')
async def send_checked_tasks(request: Request):
    body = await request.json()

    if 'accepted' not in os.listdir(PUBLIC_FOLDER):
        os.mkdir(ACCEPTED_FOLDER)
    
    if body['pushToDisk']:
        folder_name = create_date_folder_in_container(body['yaDiskToken'], body['folderName'])

    for item in body['items']:
        url = f'https://toloka.yandex.com/api/v1/assignments/{item["details"]["assignment_id"]}' if body['sandbox'] == False else \
            f'https://sandbox.toloka.yandex.com/api/v1/assignments/{item["details"]["assignment_id"]}'
        response = requests.patch(
            url,
            json={
                'status': (item['decision'] + 'ed').upper(),
                'public_comment': item['comment']
            },
            headers={
                'Authorization': f'OAuth {body["token"]}',
                'Content-Type': 'application/JSON'
            }
        )
        item['status'] = (item['decision'] + 'ed').upper()
        if item['decision'] == 'accept' and item['name'] not in os.listdir(ACCEPTED_FOLDER):
            copyfile(
                os.path.join(IMAGES_FOLDER, item['fake_name']),
                os.path.join(ACCEPTED_FOLDER, item['name'])
            )
            if body['pushToDisk']:
                print('Trying to push to disk')
                upload_file(body['yaDiskToken'], os.path.join(ACCEPTED_FOLDER, item['name']), folder_name)

    rmtree(IMAGES_FOLDER)
    return body['items']


@app.post('/create_tasks')
def create_tasks(body: TasksBody):
    create_task_suite(token=body.yaToken, sandbox=body.sandbox, pool_id=body.poolID, input_values=body.inputValues, tasks_on_suite=1)
