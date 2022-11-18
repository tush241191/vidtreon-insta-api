FROM node:16-slim

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /usr/api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

RUN npx prisma generate

CMD [ "npm", "run", "devstart" ]
