# coding: utf-8
import tempfile
import logging
import asyncio
import aiohttp

from .models import Task, File
from . import FILES_ROOT

CHUNK_SIZE = 1024
logger = logging.getLogger(__name__)


@asyncio.coroutine
def get(url, cookies, headers, chunk_size, callback=None) -> list:
    data = []
    with aiohttp.ClientSession(cookies=cookies, headers=headers) as s:
        response = yield from s.get(url)
        while True:
            chunk = yield from response.content.read(chunk_size)
            if not chunk:
                response.close()
                break
            if callable(callback):
                callback(chunk)
            logger.debug('Read chunk: {0}'.format(chunk))
            data.append(chunk)
    return data


class Worker(object):
    def __init__(self, task: Task):
        self.task = task

        self.started = False
        self.finished = False
        self.total_size = 0
        self.current_size = 0
        self.data = []

        self.chunk_processor = []
        self.add_default_processors()

    @asyncio.coroutine
    def start(self):
        yield from self.set_size()
        self.on_started()
        self.started = True
        data = yield from \
            get(self.task.url, self.task.cookies, self.task.headers, CHUNK_SIZE, callback=self._process_chunk)
        self.finished = True
        self.on_finished(data)
        logger.info(self.__dict__)

    def to_dict(self):
        d = self.task.to_dict()
        d['progress'] = self.current_size / self.total_size if self.total_size else 0
        d['total_size'] = self.total_size
        return d

    @property
    def id(self):
        # use the unique id of `task`
        return self.task.id

    @asyncio.coroutine
    def set_size(self):
        with aiohttp.ClientSession(cookies=self.task.cookies) as session:
            response = yield from session.head(self.task.url)
            self.total_size = int(response.headers['Content-Length'])
            response.close()

    def on_finished(self, data):
        f = File(path=tempfile.mktemp(dir=FILES_ROOT), size=self.total_size)
        with open(f.path, 'wb') as g:
            [g.write(chunk) for chunk in self.data]
        f.save()
        self.task.status = 0o100
        self.task.file = f
        self.task.save()

    def on_started(self):
        self.task.status = 0o001

    def add_default_processors(self):
        self.add_chunk_processor(self.size_processor, self.data_processor)

    def add_chunk_processor(self, *funcs):
        self.chunk_processor += funcs

    def _process_chunk(self, chunk):
        for p in list(set(self.chunk_processor)):
            p(chunk)

    def size_processor(self, chunk):
        self.current_size += len(chunk)

    def log_processor(self, chunk):
        logger.debug(chunk)

    def data_processor(self, chunk):
        self.data.append(chunk)


class DummyWorker(Worker):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.started = True
        self.finished = True

    def start(self):
        raise RuntimeError('{0} is unable to start.'.format(type(self)))
