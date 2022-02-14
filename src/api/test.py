from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()
origins = [
    "http://localhost:3000"
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
    print(response.json())
    return response.json()
