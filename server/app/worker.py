# coding: utf-8
import logging
import asyncio
import aiohttp

CHUNK_SIZE = 64
logger = logging.getLogger(__name__)

cached_sessions = {}


@asyncio.coroutine
def get(url, cookies=None) -> list:
    s = cached_sessions.setdefault(cookies, aiohttp.ClientSession(cookies=cookies))
    response = yield from s.get(url)

    data = []
    chunk = yield from response.content.read(CHUNK_SIZE)
    while chunk:
        data.append(chunk)
        logger.info('Read chunk: {0}'.format(chunk))
        chunk = yield from response.content.read(CHUNK_SIZE)
    return data


@asyncio.coroutine
def download(url, cookies):
    get(url, cookies)


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    tasks = [get('http://z.cn')]

    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()
