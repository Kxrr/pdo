# coding: utf-8
from io import BytesIO
from os import path
import tempfile
import logging
import asyncio
import aiohttp

from .models import Task, File
from . import FILES_ROOT
from .utils import normalize_dict

CHUNK_SIZE = 1024
logger = logging.getLogger(__name__)


@asyncio.coroutine
def get(url: str, cookies: tuple, headers: tuple, chunk_size: int, callback=None) -> list:
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
    chunk_processors = set()

    def __init__(self, task: Task):
        self.task = task

        self.started = False
        self.finished = False
        self.total_size = 0
        self.current_size = 0
        self.last_report_size = 0
        self.data = BytesIO()

    @asyncio.coroutine
    def start(self):
        yield from self.set_size()
        self.on_started()
        self.started = True
        data = yield from \
            get(self.task.url, self.task.cookies, self.task.headers, CHUNK_SIZE, callback=self._process_chunk)
        self.finished = True
        self.on_success(data)
        self._process_chunk(b'')  # call all the callback after done

    def to_dict(self, normalized=False):
        d = self.task.to_dict()
        d['current_size'] = self.current_size
        d['total_size'] = self.total_size
        if self.finished:
            d['filename'] = path.split(self.task.file.path)[-1]
        if normalized:
            return normalize_dict(d)
        return d

    @property
    def id(self):
        # use the unique id of `task`
        return self.task.id

    @classmethod
    def add_chunk_processors(cls, *processors):
        """
        A chunk processor should receive params of (chunk, worker_instance) .
        """

        for p in processors:
            cls.chunk_processors.add(p)

    @asyncio.coroutine
    def set_size(self):
        with aiohttp.ClientSession(cookies=self.task.cookies) as session:
            response = yield from session.head(self.task.url)
            self.total_size = int(response.headers['Content-Length'])
            response.close()

    def on_started(self):
        self.task.status = 0o001

    def on_success(self, data):
        f = File(
            path=tempfile.mktemp(dir=FILES_ROOT, suffix='_{}'.format(path.basename(self.task.url))),
            size=self.total_size
        )
        self.data.seek(0)
        with open(f.path, 'wb') as g:
            g.write(self.data.read())
        f.save()
        self.task.status = 0o100
        self.task.file = f
        self.task.save()

    def _process_chunk(self, chunk):
        self.data.write(chunk)
        self.current_size += len(chunk)

        for p in self.chunk_processors:
            p(chunk, self)


class DummyWorker(Worker):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.started = True
        self.finished = True

    def start(self):
        raise RuntimeError('{0} is unable to start.'.format(type(self)))


def register_processor(p):
    Worker.add_chunk_processors(p)
