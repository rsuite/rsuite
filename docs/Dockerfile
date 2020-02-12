FROM node

ENV NODE_ENV production

RUN mkdir -p /usr/src/app 

WORKDIR /usr/src/app/

COPY package.json /usr/src/app/package.json

RUN npm i --production --registry=https://registry.npm.taobao.org

COPY . /usr/src/app

CMD npm run build && npm run start
