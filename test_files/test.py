from os import sep
import re
import sys
import yadisk
from requests import get


# Token = AQAAAAADveuLAAct8hKjsmCSIkCiqK0fF98JuUM

# toloka_token = 'AQAAAABVFx8TAAIbupmTNSLnLE9ostJWyUWHY-M'
toloka_token = 'AgAAAAA7bQhFAACtpUs2RzuyK092hHU20esRLcg'
suites_url = 'https://toloka.yandex.com/api/v1/task-suites?pool_id=31500595&sort=id&limit=300'
pools_url = 'https://toloka.yandex.com/api/v1/pools?sort=id&limit=300'


def get_recursive(token, url, limit=None):
    url += '&sort=id'
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

url = f'https://sandbox.toloka.yandex.com/api/v1/task-suites?limit=100&pool_id=1115729'
task_suites_resp_items = get_recursive('AQAAAABVFx8TAAIbupmTNSLnLE9ostJWyUWHY-M', url, limit=1000)
# print(*[item['tasks'][0]['input_values']['product_title'] for item in task_suites_resp_items], sep='\n')
print(len(task_suites_resp_items))