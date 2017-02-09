# coding: utf-8
import datetime


def json_serial(obj):
    """http://stackoverflow.com/a/22238613/5512649"""

    if isinstance(obj, datetime.datetime):
        serial = obj.isoformat()
        return serial
    raise TypeError("Type not serializable")
