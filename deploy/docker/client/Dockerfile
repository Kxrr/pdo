FROM registry.alauda.cn/library/node
MAINTAINER Kxrr
ENV LANG=C.UTF-8
ARG PACKAGE_CONTROLLER
RUN mkdir /code
COPY ./client/package.json /code
WORKDIR /code
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN $PACKAGE_CONTROLLER install
CMD ["npm", "start"]
