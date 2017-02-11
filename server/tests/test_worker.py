# coding: utf-8
import asyncio
import unittest
import json
from app import worker
from app.models import Task


class WorkerTestCase(unittest.TestCase):
    def setUp(self):
        self.loop = self._new_loop()

    def test_get(self):
        data = self.loop.run_until_complete(worker.get('http://httpbin.org/', cookies=None, chunk_size=64))
        self.assertTrue(data)

    def test_get_with_cookies(self):
        cookies = {'k1': 'v1'}
        data = self.loop.run_until_complete(
            worker.get('http://httpbin.org/cookies', cookies=tuple(cookies.items()), chunk_size=64)
        )
        d = json.loads(self._data2str(data))
        self.assertDictEqual(cookies, d['cookies'])

    def test_with_headers(self):
        pass

    def test_Worker(self):
        w = worker.Worker(Task(url='http://httpbin.org/'))
        self.loop.run_until_complete(w.start())
        self.assertEqual(w.current_size, w.total_size)
        self.assertTrue(w.started)
        self.assertTrue(w.finished)

    def _new_loop(self) -> asyncio.unix_events._UnixSelectorEventLoop:
        return asyncio.new_event_loop()

    def _data2str(self, data) -> str:
        return ''.join(map(bytes.decode, data))
