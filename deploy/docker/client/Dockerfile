FROM registry.alauda.cn/library/node

MAINTAINER Kxrr
RUN mkdir /code \ 
    && mkdir -p ../deploy/docker/client/
ENV LANG C.UTF-8
WORKDIR /code
COPY package.json ../deploy/docker/client/
COPY package.json /code

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
