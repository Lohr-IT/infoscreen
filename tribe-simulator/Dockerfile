FROM node:13.13-alpine

ENV NODE_ENV=production
ENV PORT=8082
ENV FILE=./responses/default.json

WORKDIR /app
COPY /tribe-simulator/package*.json ./
RUN npm install
COPY /tribe-simulator/ .

EXPOSE 8080
CMD [ "npm", "run", "prod" ]
