FROM node:21.6-alpine

USER root

WORKDIR /app

ADD dist/ /app/dist/
ADD node_modules/ /app/node_modules/
ADD package*.json /app/
ADD .env.cloud /app/

USER 1001
EXPOSE 8080

ADD docker-entrypoint.sh ./
ENTRYPOINT ["/bin/bash", "docker-entrypoint.sh"]
