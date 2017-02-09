# coding: utf-8
import json
import asyncio
from functools import partial

from aiohttp import web

from .models import Task
from .utils import json_serial

pdo_loop = asyncio.new_event_loop()
""":type: asyncio.unix_events._UnixSelectorEventLoop"""


async def hello(request):
    return web.Response(text='THIS IS PDO.')


class AppView(web.View):
    def json_response(self, data, **kwargs):
        dumps = partial(json.dumps, default=json_serial)
        return web.json_response(data, dumps=dumps)


class TaskView(AppView):
    async def get(self):
        tasks = list(Task.select().dicts())
        return self.json_response({'data': tasks})


def make_app(loop):
    app = web.Application(loop=loop)
    app.router.add_get('/', hello)
    app.router.add_route('*', '/tasks', TaskView)
    return app


def run():
    web.run_app(make_app(pdo_loop), port=8000)
