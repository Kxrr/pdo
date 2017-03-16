# coding: utf-8
import asyncio

from aiohttp import web
import socketio

from . import logger, FILES_ROOT
from .models import Task
from .worker import Worker, register_processor
from .utils import cors_middleware, dumps

sio = socketio.AsyncServer()
pdo_loop = asyncio.new_event_loop()
""":type: asyncio.unix_events._UnixSelectorEventLoop"""

id_to_worker = {}


async def hello(request):
    return web.Response(text='THIS IS PDO.')


class AppView(web.View):
    def jsonify(self, data, **kwargs):
        return web.json_response(data, dumps=dumps)

    def response(self, data, code=200):
        return self.jsonify({'data': data, 'code': code})

    def fail(self, error_msg, code=404):
        data = {'error': error_msg, 'code': code}
        return self.jsonify(data)


class TaskWorkersView(AppView):
    async def get(self):
        workers = list(id_to_worker.values())
        # workers += [DummyWorker(task) for task in Task.select()]

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

    async def delete(self):
        data = await self.request.post()
        id_to_worker.pop(data['task_id'])
        return self.response({}, code=204)


@register_processor
def emit_update_item(chunk, worker: Worker):
    if not chunk or (worker.current_size - worker.last_report_size) > 312400:
        pdo_loop.create_task(sio.emit('updateItem', data=worker.to_dict(normalized=True)))
        worker.last_report_size = worker.current_size


@sio.on('connect')
def connect(sid, env):
    logger.info('{} connected'.format(sid))


def make_app(loop):
    app = web.Application(loop=loop, middlewares=[cors_middleware])
    sio.attach(app)
    app.router.add_get('/', hello)
    app.router.add_route('*', '/tasks', TaskWorkersView)
    app.router.add_route('*', '/tasks/{task_id}', TaskWorkerView)
    app.router.add_static('/retrieve/', path=FILES_ROOT)
    return app


def run(port):
    web.run_app(make_app(pdo_loop), port=port)
