FROM node:lts-alpine

EXPOSE 8000

WORKDIR /app
COPY package.json .
RUN npm install

COPY index.js .
CMD node index.js
