FROM node:18

RUN apt-get update -y && apt-get upgrade -y

WORKDIR /home/app

COPY package.json .
COPY business/package.json ./business/package.json
COPY api/package.json ./api/package.json
COPY ui/package.json ./ui/package.json
COPY e2e/package.json ./e2e/package.json

RUN yarn