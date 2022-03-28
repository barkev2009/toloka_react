import asyncio
import os
from test import get_recursive
from aiohttp import ClientSession
from requests import get
from time import perf_counter
import aiofiles

# Pool ID: 19662458 | Number of attachments: 541
# Pool ID: 30174382 | Number of attachments: 3711
# Pool ID: 31500595 | Number of attachments: 5
# Pool ID: 31501531 | Number of attachments: 2
# Pool ID: 31502004 | Number of attachments: 3
# Pool ID: 31502418 | Number of attachments: 6286
# Pool ID: 31531106 | Number of attachments: 1
# Pool ID: 31531273 | Number of attachments: 10379
# Pool ID: 32280321 | Number of attachments: 30


toloka_token = 'AgAAAAA7bQhFAACtpUs2RzuyK092hHU20esRLcg'
attachments_url = 'https://toloka.yandex.com/api/v1/attachments?pool_id=19662458&sort=id&limit=100'


async def process_image(image_data):
    url = f'https://toloka.yandex.com/api/v1/attachments/{image_data["id"]}/download'
    headers = {
        'Authorization': f'OAuth {toloka_token}'
    }
    async with ClientSession(headers=headers) as session:
        async with session.get(url) as response:
            file_name = image_data["id"] + '.jpg'
            f = await aiofiles.open(os.path.join('test_files/test_images', file_name), 'wb')
            await f.write(await response.read())
            await f.close()


async def run_batch(batch):
    tasks = []
    for file in batch:
        task = asyncio.ensure_future(process_image(file))
        tasks.append(task)

    await asyncio.wait(tasks)


async def main():
    if 'test_images' not in os.listdir('test_files'):
        os.mkdir('test_files/test_images')

    atts = get_recursive(toloka_token, attachments_url)
    batches = [atts[:200], atts[200:400], atts[400:]]
    t0 = perf_counter()
    for batch in batches:
        task = asyncio.create_task(run_batch(batch))
        await task
    print(perf_counter() - t0)

asyncio.get_event_loop_policy().get_event_loop().run_until_complete(main())
