FROM node:16-alpine3.17
WORKDIR /home/app
COPY --chown=node package*.json ./
RUN apk add --update python3 build-base && npm install -g nodemon sequelize-cli pm2
