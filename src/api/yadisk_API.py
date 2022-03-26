import posixpath
import os
import yadisk
import requests
from datetime import datetime

URL = 'https://cloud-api.yandex.net/v1/disk/resources'
headers = {
    'Content-Type': 'application/json', 
    'Accept': 'application/json', 
    'Authorization': 'OAuth {}'
}


def upload_file(token, load_file, save_folder, replace=False):
    """
    Загрузка файла.
    save_folder: Путь к файлу на Диске
    load_file: Путь к загружаемому файлу
    replace: true or false Замена файла на Диске
    """
    headers['Authorization'] = headers['Authorization'].format(token)

    save_folder = os.path.join(save_folder, os.path.basename(load_file))

    res = requests.get(f'{URL}/upload?path={save_folder}&overwrite={replace}', headers=headers).json()
    print(res)
    with open(load_file, 'rb') as f:
        try:
            print(load_file)
            requests.put(res['href'], files={'file':f})
        except KeyError:
            print(res)


def create_date_folder_in_container(token, container_folder_name):
    headers['Authorization'] = headers['Authorization'].format(token)

    create_folder_in_root(token, container_folder_name)

    date = str(datetime.now()).split('.')[0].replace(':', '-').replace(' ', '_')
    folder_name = f'{container_folder_name}/{date}/'
    try:
        response = requests.put(URL, headers=headers, params={'path': folder_name})
    except Exception as e:
        print(response.json())
    finally:
        return folder_name


def create_folder_in_root(token, container_folder_name):
    headers['Authorization'] = headers['Authorization'].format(token)
    try:
        response = requests.put(URL, headers=headers, params={'path': container_folder_name})
    except Exception as e:
        print(response.json())
    


if __name__ == '__main__':
    # upload_file('AQAAAABVFx8TAADLWx3o6nmhFU97rEP5-r3pKac', 'public/images/ru.abdab819-05d1-4bbc-a97b-d3619ab93d24.jpg', 'Приложения/')
    create_folder_in_root('AQAAAABVFx8TAADLWx3o6nmhFU97rEP5-r3pKac', 'Data from Toloka Pools')
