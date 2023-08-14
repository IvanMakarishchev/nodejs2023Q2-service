FROM postgres:latest as db
WORKDIR /db
EXPOSE ${DB_PORT}

FROM node:18-alpine as app
WORKDIR /app
COPY package*.json .
RUN npm i && npm cache clean --force
ENV NODE_ENV production
EXPOSE ${PORT}
COPY . .
CMD [ "npm", "run", "start" ]