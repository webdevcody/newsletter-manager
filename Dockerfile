FROM node:18

RUN apt-get update -y && apt-get upgrade -y

WORKDIR /home/app

COPY package.json .
RUN npm i
