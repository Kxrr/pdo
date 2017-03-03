FROM index.alauda.cn/library/python:3.6

MAINTAINER Kxrr
RUN mkdir /code
ENV LANG C.UTF-8
ENV PYTHONPATH /code
WORKDIR /code
COPY requirements.txt /code

RUN pip install -r /code/requirements.txt
