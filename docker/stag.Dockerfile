# Building stage
FROM node:14.2 as builder
WORKDIR /usr/src/app

COPY . .
RUN npm ci
RUN npm run build

# Starting stage
FROM node:14.2-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules node_modules/
COPY --from=builder /usr/src/app/dist dist/
COPY --from=builder /usr/src/app/config config/
COPY --from=builder /usr/src/app/package.json .
EXPOSE 8080 8080
CMD [ "npm", "run", "start:stag"]