FROM node:18

RUN apt-get update -y && apt-get upgrade -y

RUN apt-get install -y vim

WORKDIR /home/app

COPY package.json .
COPY business/package.json ./business/package.json
COPY api/package.json ./api/package.json
COPY ui/package.json ./ui/package.json
COPY e2e/package.json ./e2e/package.json
COPY scripts/package.json ./scripts/package.json

RUN yarn