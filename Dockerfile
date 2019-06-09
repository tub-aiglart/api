FROM node:11-alpine

WORKDIR /opt/tub/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "node", "index" ]
