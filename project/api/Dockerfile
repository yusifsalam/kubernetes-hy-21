FROM node:alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile && yarn cache clean

COPY . .
RUN yarn build
EXPOSE 4000

CMD ["yarn", "start:js"]