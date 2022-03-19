import requests
from download_api import get_chunks


class TaskCreator:
    def __init__(self, pool_id, input_value):
        self.task = {
            'pool_id': pool_id,
            'input_values': input_value
        }


class TaskSuiteCreator:
    def __init__(self, pool_id, input_values=None):
        tasks = []
        if input_values is not None:
            for item in input_values:
                tasks.append(TaskCreator(pool_id, item).task)
        self.task_suite = {
            'pool_id': pool_id,
            'tasks': tasks,
            'overlap': 1,
            'infinite_overlap': 'false'
        }
    

def create_task_suite(token, sandbox, pool_id, input_values=None, tasks_on_suite=10):
    """
    Creates either a Toloka task or a Toloka task-suite by dictionary-stored input values

    :param pool_id: ID of the pool
    :param input_values: a list of dictionaries with a certain key-value structure,
                        check get_project_params method for reference
    :param tasks_on_suite: the number of tasks on one suite
    :return: ID of a new task-suite
    """

    url = 'https://sandbox.toloka.yandex.ru/api/v1/' if sandbox else 'https://toloka.yandex.ru/api/v1/'
    headers = {"Authorization": "OAuth " + token}

    if input_values is not None:
        if len(input_values) <= tasks_on_suite:
            object_creator = TaskSuiteCreator(pool_id, input_values).task_suite
        else:
            object_creator = []
            for chunk in get_chunks(input_values, tasks_on_suite):
                chunk_creator = TaskSuiteCreator(pool_id, chunk).task_suite
                object_creator.append(chunk_creator)
        response = requests.post(url + f'task-suites?allow_defaults=true', headers=headers,
                                    json=object_creator)
        if response.ok:
            try:
                print(f'Task-suite {response.json()["id"]} successfully created')
                return response.json()['id']
            except KeyError:
                print('Task-suites successfully created')