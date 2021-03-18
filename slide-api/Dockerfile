FROM node:13.13-alpine

ENV NODE_ENV=production
ENV PORT=8083
ENV MONGO=mongodb://localhost:27017/infoscreen

WORKDIR /app
COPY /shared /shared
COPY /slide-api/package*.json ./
RUN npm install
COPY /slide-api/ .

EXPOSE 8080
CMD [ "npm", "run", "prod" ]
