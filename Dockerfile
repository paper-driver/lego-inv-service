FROM node:21.6-alpine

USER root

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN apk update && apk add bash

USER 1001
EXPOSE 8080

ADD docker-entrypoint.sh ./
ENTRYPOINT ["/bin/bash", "docker-entrypoint.sh"]
