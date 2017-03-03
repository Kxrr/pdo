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
        0o000: 'pending',
        0o001: 'started',
        0o010: 'failure',
        0o100: 'success',
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
        data['state'] = self.STATE_TO_TEXT[data['status']]
        data['id'] = self.id
        return data

    def __str__(self):
        return '<Task {0}>'.format(self.url)


def check_tables():
    for model in (Task, File):
        if not model.table_exists():
            model.create_table()
