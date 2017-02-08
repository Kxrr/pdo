# coding: utf-8

import datetime
from peewee import *
from playhouse.sqlite_ext import SqliteExtDatabase

db = SqliteExtDatabase('pdo-server.db')


class BaseModel(Model):
    class Meta:
        database = db


class File(BaseModel):
    filename = CharField()
    path = CharField()


class Task(BaseModel):
    STATE_TO_TEXT = {
        0o000: '未开始',
        0o001: '下载中',
        0o010: '错误',
        0o100: '已完成',
    }

    url = CharField()
    cookies = CharField(null=True)

    status = SmallIntegerField()
    file = ForeignKeyField(File)
    add_time = DateTimeField(default=datetime.datetime.now)

    def get_progress(self, pid):
        """
        :rtype: float
        """
        pass

    def __str__(self):
        return '<Task {0}>'.format(self.url)


def create_tables():
    db.connect()
    db.create_tables([Task])


if __name__ == '__main__':
    create_tables()
