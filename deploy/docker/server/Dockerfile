FROM index.alauda.cn/library/python:3.6
MAINTAINER Kxrr
RUN mkdir /code
COPY ./server/requirements.txt /tmp
ENV LANG C.UTF-8 \
    PYTHONPATH /code
RUN pip install -r /tmp/requirements.txt
WORKDIR /code
CMD ["python", "/code/manage.py", "runserver"]
