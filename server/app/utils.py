# coding: utf-8
import datetime


def json_serial(obj):
    """http://stackoverflow.com/a/22238613/5512649"""

    if isinstance(obj, datetime.datetime):
        serial = obj.isoformat()
        return serial
    raise TypeError("Type not serializable")


async def cors_middleware(app, handler):
    """http://aiohttp.readthedocs.io/en/stable/web.html#example"""

    async def middleware_handler(request):
        response = await handler(request)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    return middleware_handler
