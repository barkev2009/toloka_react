from typing import Optional
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from redis import Redis
import json
from checks import fname_check, lowest_pix_size, white_pixels_area

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

FOLDER_NAME = '../../public/images'


@app.get("/pools/")
def read_item(token: Optional[str] = None, sandbox: Optional[str] = True):
    url = 'https://toloka.yandex.com/api/v1/pools?limit=300&sort=-created' if sandbox == 'false' else \
        'https://sandbox.toloka.yandex.com/api/v1/pools?limit=300&sort=-created'
    response = requests.get(
        url,
        headers={
            'Authorization': f'OAuth {token}',
        }
    )
    return response.json()


@app.post('/pools/{action}/')
def open_pool(
    token: Optional[str] = None,
    sandbox: Optional[str] = True,
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
    # print(response.json())
    return response.json()


@app.get('/read_images')
def read_image_names():
    return list(filter(lambda x: ('jpg' in x) or ('jpeg' in x) or ('png' in x), os.listdir('../../public/images')))


@app.get('/read_images_from_pool/')
def read_images_from_pool(token: Optional[str] = None, sandbox: Optional[str] = True, pool_id: Optional[str] = None):
    url = f'https://toloka.yandex.com/api/v1/attachments?pool_id={pool_id}' if sandbox == 'false' else \
        f'https://sandbox.toloka.yandex.com/api/v1/attachments?pool_id={pool_id}'
    r = Redis()

    if r.exists(pool_id) == 1:
        print(json.loads(r.get(pool_id)))
        return json.loads(r.get(pool_id))
    else:
        response = requests.get(
            url,
            headers={
                'Authorization': f'OAuth {token}',
            }
        )

        r.setex(pool_id, 3600, json.dumps(response.json()))
        return response.json()


@app.get('/download_image/')
def download_image(
        token: Optional[str] = None,
        sandbox: Optional[str] = True,
        file_id: Optional[str] = None,
        file_name: Optional[str] = None
):
    url = f'https://toloka.yandex.com/api/v1/attachments/{file_id}/download' if sandbox == 'false' else \
        f'https://sandbox.toloka.yandex.com/api/v1/attachments/{file_id}/download'
    response = requests.get(
        url,
        headers={
            'Authorization': f'OAuth {token}',
        }
    )

    file_name = f'{file_id}.{file_name.split(".")[-1]}'

    if 'images' not in os.listdir('../../public'):
        os.mkdir(FOLDER_NAME)
    if file_name in os.listdir(FOLDER_NAME):
        print(f'File {file_name} is already in folder')
    else:
        with open(f'{FOLDER_NAME}/{file_name}', 'wb') as file:
            file.write(response.content)


@app.post('/check_name_pattern/')
async def check_name_pattern(request: Request):
    body = await request.json()
    for item in body:
        check_result = fname_check(item['name'])
        if check_result == 'reject':
            item['decision'] = check_result
    return body


@app.post('/check_images_size/')
async def check_images_size(request: Request):
    body = await request.json()
    for item in body:
        check_result = lowest_pix_size(f'{FOLDER_NAME}/{item["fake_name"]}')
        if check_result == 'reject':
            item['decision'] = check_result
    return body


@app.post('/check_white_area/')
async def check_white_area(request: Request):
    body = await request.json()
    for item in body:
        check_result = white_pixels_area(f'{FOLDER_NAME}/{item["fake_name"]}')
        if check_result == 'reject':
            item['decision'] = check_result
    return body
