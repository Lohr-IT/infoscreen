# Event Crawler

Crawls the AGV website for upcoming events and adds them as slides to the database.

## Usage

Run it in development mode using `npm run dev`.

## Environment Variables

`MONGO`: should contain a valid mongodb connection string
`INTERVAL`: a cronstyle timing intruction, on the interval to crawl
`TIMEZONE`: the timezone
`EVENT_API`: URL to the events api
`MAX_EVENTS`: Max count of events that should be created slides for

Example values of those variables are shown in the .env file.

The live event API is currently reachable under: [https://www.agv-muenchen.de/wp-json/tribe/events/v1/events](https://www.agv-muenchen.de/wp-json/tribe/events/v1/events)
