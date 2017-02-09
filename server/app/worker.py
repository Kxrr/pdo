# coding: utf-8
import logging
import asyncio
import aiohttp

CHUNK_SIZE = 1024

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


@asyncio.coroutine
def get(url, cookies, chunk_size, callback=None) -> list:
    data = []
    with aiohttp.ClientSession(cookies=cookies) as s:
        response = yield from s.get(url)
        while True:
            chunk = yield from response.content.read(chunk_size)
            if not chunk:
                response.close()
                break
            if callable(callback):
                callback(chunk)
            logger.info('Read chunk: {0}'.format(chunk))
            data.append(chunk)
    return data


class Worker(object):
    def __init__(self, task):
        self.task = task

        self.started = False
        self.finished = False
        self.total_size = None
        self.current_size = 0
        self.data = []

        self.chunk_processor = []
        self.add_default_processors()

    @asyncio.coroutine
    def set_size(self):
        with aiohttp.ClientSession(cookies=self.task.cookies) as session:
            response = yield from session.head(self.task.url)
            self.total_size = response.headers['Content-Length']
            response.close()

    @asyncio.coroutine
    def start(self):
        yield from self.set_size()
        self.on_started()
        self.started = True
        data = yield from get(self.task.url, self.task.cookies, CHUNK_SIZE, callback=self._process_chunk)
        self.finished = True
        self.on_finished(data)
        logger.info(self.__dict__)

    def on_finished(self, data):
        pass

    def on_started(self):
        pass

    def add_default_processors(self):
        self.add_chunk_processor(self.size_processor, self.log_processor, self.data_processor)

    def add_chunk_processor(self, *funcs):
        self.chunk_processor += funcs

    def _process_chunk(self, chunk):
        for p in list(set(self.chunk_processor)):
            p(chunk)

    def size_processor(self, chunk):
        self.current_size += len(chunk)

    def log_processor(self, chunk):
        logger.info(chunk)

    def data_processor(self, chunk):
        self.data.append(chunk)
