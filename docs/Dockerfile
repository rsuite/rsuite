FROM node

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV LOCALE_ENV CN

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app/
EXPOSE 3000

COPY package.json ./

RUN npm install

COPY ./ ./

CMD npm run start
