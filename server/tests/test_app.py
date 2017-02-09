# coding: utf-8
from app.app import make_app
from aiohttp.test_utils import AioHTTPTestCase, unittest_run_loop


class AppTestCase(AioHTTPTestCase):
    def get_app(self, loop):
        return make_app(loop=loop)

    @unittest_run_loop
    async def test_index(self):
        response = await self.client.request("GET", "/")
        assert response.status == 200
