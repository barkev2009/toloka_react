import re
import sys
import yadisk
from requests import get


# Token = AQAAAAADveuLAAct8hKjsmCSIkCiqK0fF98JuUM

# y = yadisk.YaDisk(token='AQAAAAADveuLAAct8hKjsmCSIkCiqK0fF98JuUM')
# print(list(y.listdir("/Приложения")))

# toloka_token = 'AQAAAABVFx8TAAIbupmTNSLnLE9ostJWyUWHY-M'
toloka_token = 'AgAAAAA7bQhFAACtpUs2RzuyK092hHU20esRLcg'
suites_url = 'https://toloka.yandex.com/api/v1/task-suites?pool_id=31500595&sort=id&limit=300'
pools_url = 'https://toloka.yandex.com/api/v1/pools?sort=id&limit=300'


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
