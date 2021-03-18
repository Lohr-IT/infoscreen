FROM node:13.13-alpine

ENV NODE_ENV=production
ENV INTERVAL=0\ */30\ *\ *\ *\ *
ENV TIMEZONE=Europe/Berlin
ENV EVENT_API=https://www.agv-muenchen.de/wp-json/tribe/events/v1/events
ENV MAX_EVENTS=50

WORKDIR /app
COPY /shared /shared
COPY /event-crawler/package*.json ./
RUN npm install
COPY /event-crawler/ .

CMD [ "npm", "run", "prod" ]
