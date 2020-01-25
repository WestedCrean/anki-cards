FROM node:12

RUN mkdir -p /usr/src/node-app

WORKDIR /usr/src/app

COPY backend/package*.json ./

RUN npm install

COPY backend/. .