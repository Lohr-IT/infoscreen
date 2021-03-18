FROM node:13.13-alpine as build-stage

COPY /shared /shared

WORKDIR /app
COPY /client/package*.json ./

RUN npm install

COPY /client/ .
RUN npm run build


FROM nginx:stable-alpine as production-stage

ENV NODE_ENV=production

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
