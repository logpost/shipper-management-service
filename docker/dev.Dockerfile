FROM --platform=linux/arm64/v8 node:14.2

WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 8080 8080

CMD [ "npm", "run", "start:dev"]