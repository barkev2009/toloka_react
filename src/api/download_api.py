import re
import threading
import multiprocessing
from requests import get
import os
from time import perf_counter


IMAGES_FOLDER = '../../public/images'
PUBLIC_FOLDER = '../../public'

def get_recursive(token, url, limit=None):
    items = []
    response = get(
        url,
        headers={
            'Authorization': f'OAuth {token}'
        }
    )
    if 'items' not in response.json().keys():
        return response.json()
    items += response.json()['items']

    if response.json()['has_more']:
        has_more = True
        while has_more:
            if limit is not None and len(items) >= limit:
                break
            last_id = response.json()['items'][-1]['id']

            response = get(
                f'{url}&id_gt={last_id}',
                headers={
                    'Authorization': f'OAuth {token}'
                }
            )
            items += response.json()['items']
            has_more = response.json()['has_more']
    return items


def process_all_images(sandbox, token, image_data, num_processes, num_threads):
    chunks = get_chunks(image_data, num_threads)

    if 'images' not in os.listdir(PUBLIC_FOLDER):
        os.mkdir(IMAGES_FOLDER)

    process_chunks = get_chunks_number(chunks, num_processes)

    processes = []
    for p_chunk in process_chunks:
        x = multiprocessing.Process(target=process_thread_chunks, args=(sandbox, token, p_chunk, ))
        processes.append(x)
        x.start()
    
    for pr in processes:
        pr.join()


def get_chunks(data: list, items_in_chunk: int):
    chunks = []
    chunk = []
    for i, item in enumerate(data):
        if i != 0 and i % items_in_chunk == 0:
            chunks.append(chunk)
            chunk = []
        chunk.append(item)
    if chunk:
        chunks.append(chunk)
    return chunks


def get_chunks_number(data: list, num_chunks: int):
    chunk_length = round(len(data) / num_chunks)
    chunks, chunk = [], []
    for i, item in enumerate(data):
        if i != 0 and i % chunk_length == 0:
            chunks.append(chunk)
            chunk = []
        chunk.append(data[i])
    if chunk:
        chunks.append(chunk)
    return chunks


def process_image(sandbox: str, token: str, image_data: list):
    url = f'https://toloka.yandex.com/api/v1/attachments/{image_data["id"]}/download' if sandbox == False else \
        f'https://sandbox.toloka.yandex.com/api/v1/attachments/{image_data["id"]}/download'
    response = get(
        url,
        headers={
            'Authorization': f'OAuth {token}'
        }
    )
    file_name = image_data["fake_name"]
    with open(os.path.join(IMAGES_FOLDER, file_name), 'wb') as file:
        file.write(response.content)


def process_thread_chunks(sandbox, token, chunks):
    for chunk in chunks:
        process_chunk(sandbox, token, chunk)


def process_chunk(sandbox, token, data):
    threads = []
    for item in data:
        x = threading.Thread(target=process_image, args=[sandbox, token, item])
        threads.append(x)
        x.start()

    for th in threads:
        th.join()