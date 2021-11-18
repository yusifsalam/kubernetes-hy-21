FROM node:alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --production && yarn cache clean

COPY . .

CMD ["yarn", "start"]