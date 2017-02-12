# coding: utf-8
import json
import asyncio
from functools import partial

from aiohttp import web

from app.worker import DummyWorker
from .models import Task
from .worker import Worker
from .utils import json_serial, cors_middleware

pdo_loop = asyncio.new_event_loop()
""":type: asyncio.unix_events._UnixSelectorEventLoop"""

id_to_worker = {}



async def hello(request):
    return web.Response(text='THIS IS PDO.')


class AppView(web.View):
    def jsonify(self, data, **kwargs):
        dumps = partial(json.dumps, default=json_serial)
        return web.json_response(data, dumps=dumps)

    def response(self, data, code=200):
        return self.jsonify({'data': data, 'code': code})

    def fail(self, error_msg, code=404):
        data = {'error': error_msg, 'code': code}
        return self.jsonify(data)


class TaskWorkersView(AppView):
    async def get(self):
        workers = list(id_to_worker.keys())
        if not self.request.match_info.get('activated', False):
            workers += [DummyWorker(task) for task in Task.select()]

        return self.response([w.to_dict() for w in workers], code=200)

    async def post(self):
        data = await self.request.post()
        task = Task.create(url=data['url'], cookies=data.get('cookies'), headers=data.get('headers'))
        worker = Worker(task)
        pdo_loop.create_task(worker.start())
        id_to_worker[task.id] = worker
        return self.response(worker.to_dict(), code=201)


class TaskWorkerView(AppView):
    async def get(self):
        task_id = int(self.request.match_info['task_id'])
        worker = id_to_worker.get(task_id)
        if not worker:
            return self.fail('TaskWorker {} not exists.'.format(task_id), code=404)
        return self.response(worker.to_dict(), code=200)


def make_app(loop):
    app = web.Application(loop=loop, middlewares=[cors_middleware])
    app.router.add_get('/', hello)
    app.router.add_route('*', '/tasks', TaskWorkersView)
    app.router.add_route('*', '/tasks/{task_id}', TaskWorkerView)

    return app


def run():
    web.run_app(make_app(pdo_loop), port=3000)
