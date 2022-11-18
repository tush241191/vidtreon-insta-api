FROM node:16-slim

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /usr/api

ARG DATABASE_URL
ARG NOTION_API_SECRET

ENV DATABASE_URL ${DATABASE_URL}
ENV NOTION_API_SECRET ${NOTION_API_SECRET}
ENV NODE_ENV "production"
ENV PORT 80

# Move this to GIthub Secrets
ENV JWT_TOKEN_KEY "ulH^ttqk%F5nU8T5iKk@2Ckb^BT*sK@JBMfbDGa8&ZlC9*8P1ji&u@xX1"

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

# @TOOD We should run this in a separate container outside of API and APP context
RUN npx prisma migrate deploy
# RUN npx prisma db seed

EXPOSE 80

CMD [ "npm", "start" ]
