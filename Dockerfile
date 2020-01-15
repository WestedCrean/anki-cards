FROM node:12.13-alpine

RUN mkdir -p /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000
