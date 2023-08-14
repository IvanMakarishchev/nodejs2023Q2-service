FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci && npm cache clean --force

ENV NODE_ENV production

EXPOSE ${PORT}

COPY . .

CMD [ "npm", "run", "start:dev" ]
