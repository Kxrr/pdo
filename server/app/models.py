# coding: utf-8
import datetime

from peewee import *
from playhouse.sqlite_ext import SqliteExtDatabase

from . import DB_PATH

db = SqliteExtDatabase(DB_PATH)


class BaseModel(Model):
    class Meta:
        database = db


class File(BaseModel):
    path = CharField()
    size = IntegerField()


class Task(BaseModel):
    STATE_TO_TEXT = {
        0o000: '未开始',
        0o001: '下载中',
        0o010: '错误',
        0o100: '已完成',
    }

    id = PrimaryKeyField()
    url = CharField()
    cookies = CharField(null=True)
    headers = CharField(null=True)

    status = SmallIntegerField(default=0o000)
    file = ForeignKeyField(File, null=True)
    add_time = DateTimeField(default=datetime.datetime.now)

    def to_dict(self):
        data = self._data.copy()
        data['_status'] = data['status']
        data['status'] = self.STATE_TO_TEXT[data['_status']]
        data['id'] = self.id
        return data

    def __str__(self):
        return '<Task {0}>'.format(self.url)


def create_tables():
    db.connect()
    db.create_tables([Task, File])
