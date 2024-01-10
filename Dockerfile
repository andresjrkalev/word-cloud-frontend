FROM node:16.3.0-alpine

WORKDIR /usr/app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

CMD ["npm", "start"]
