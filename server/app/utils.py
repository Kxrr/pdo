# coding: utf-8
import json
import datetime
from functools import partial


def json_serial(obj):
    """http://stackoverflow.com/a/22238613/5512649"""

    if isinstance(obj, datetime.datetime):
        serial = obj.isoformat()
        return serial
    raise TypeError("Type not serializable")


dumps = partial(json.dumps, default=json_serial)
loads = json.loads


def normalize_dict(d):
    return loads(dumps(d))


async def cors_middleware(app, handler):
    """http://aiohttp.readthedocs.io/en/stable/web.html#example"""

    async def middleware_handler(request):
        response = await handler(request)
        response.headers['Access-Control-Allow-Origin'] = request.headers['Origin']
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        response.headers['Access-Control-Allow-Headers'] = 'origin, x-requested-with, content-type'
        response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
        return response

    return middleware_handler
