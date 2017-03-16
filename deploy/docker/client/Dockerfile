FROM registry.alauda.cn/library/node
MAINTAINER Kxrr
ENV LANG=C.UTF-8
RUN mkdir /code
COPY package.json /code
WORKDIR /code
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
CMD ["npm", "start"]
