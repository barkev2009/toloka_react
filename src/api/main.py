from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import os

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
    response = requests.get(
        url,
        headers={
            'Authorization': f'OAuth {token}',
        }
    )
    # print(response.json())
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

    folder_name = '../../public/images'

    if 'images' not in os.listdir('../../public'):
        os.mkdir(folder_name)
    if file_name in os.listdir(folder_name):
        print(f'File {file_name} is already in folder')
    else:
        with open(f'{folder_name}/{file_name}', 'wb') as file:
            file.write(response.content)
