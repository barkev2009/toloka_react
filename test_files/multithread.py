import threading
from requests import get
import os
from time import perf_counter
from test import get_recursive, toloka_token


def get_chunks(data: list, items_in_chunk: int):
    chunks = []
    chunk = []
    for i, item in enumerate(data):
        if (i != 0 and i % items_in_chunk == 0):
            chunks.append(chunk)
            chunk = []
        chunk.append(item)
    if chunk:
        chunks.append(chunk)
    return chunks


def process_image(image_data):
    url = f'https://toloka.yandex.com/api/v1/attachments/{image_data["id"]}/download'
    response = get(
        url,
        headers={
            'Authorization': f'OAuth {toloka_token}'
        }
    )
    file_name = image_data["id"] + '.jpg'
    with open(os.path.join('test_files/test_images', file_name), 'wb') as file:
            file.write(response.content)


def process_chunk(data):
    threads = []
    for item in data:
        x = threading.Thread(target=process_image, args=[item])
        threads.append(x)
        x.start()

    for th in threads:
        th.join()


if __name__ == '__main__':
    t0 = perf_counter()
    attachments_url = 'https://toloka.yandex.com/api/v1/attachments?pool_id=31531273&sort=id&limit=100'
    attachments = get_recursive(toloka_token, attachments_url)
    t1 = perf_counter()
    print(f'Time taken for collecting (Python): {round((t1 - t0), 2)} seconds')
    chunks = get_chunks(attachments, 100)

    print(len(attachments))
    print('-'*60)
    if 'test_images' not in os.listdir('test_files'):
        os.mkdir('test_files/test_images')

    for chunk in chunks:
        process_chunk(chunk)

    print(f'Time taken for downloading (Python): {round((perf_counter() - t1), 2)} seconds')