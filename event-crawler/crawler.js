import stripHtml from 'string-strip-html';
import he from 'he';
import axios from 'axios';

import slideManager from './slideManager.js';

/**
 * Crawls the website for events
 */
async function crawl() {
  console.log('Crawling...');

  const response = await fetchEvents();
  const events = parseEvents(response);
  await slideManager.createSlides(events);
}

/**
 * Fetches the event list from the tribe api
 */
async function fetchEvents() {
  console.info('Fetching Events...');

  const eventApi =
    process.env.EVENT_API ||
    'https://www.agv-muenchen.de/wp-json/tribe/events/v1/events';

  const response = await axios.get(eventApi).catch((e) => {
    console.error(e);
  });

  return response;
}

/**
 * Filters the response from the tribe api for important values and formats them as needed
 */
function parseEvents(response) {
  const maxEvents = Number(process.env.MAX_EVENTS) || 50;

  if (!response) {
    console.error('No data recieved');
    return;
  }

  // get the events from the json response
  let eventData = response.data.events;

  // build list of elements that meets criteria
  const events = [];
  for (
    let i = 0;
    events.length < Math.min(maxEvents, eventData.length) &&
    i < eventData.length;
    i++
  ) {
    const rawEvent = eventData[i];

    // ignore unpublished events
    if (!rawEvent.status == 'publish') continue;

    // detect musengruppe
    let musengruppe = '';
    if (rawEvent.categories.length > 0) {
      musengruppe = rawEvent.categories[0].name;
    }

    // detect cost
    let cost = '';
    if (rawEvent.cost.length > 0) {
      if (rawEvent.cost == 'kostenlos') {
        cost = 'frei';
      } else {
        cost = rawEvent.cost;
      }
    }

    // format date accordingly //TODO: date missing
    let date = formatDate(new Date(rawEvent.start_date))

    events.push({
      tribeId: rawEvent.id,
      title: encode(rawEvent.title),
      musengruppe: musengruppe,
      venue: encode(rawEvent.venue.venue),
      excerpt: encode(stripHtml(rawEvent.excerpt)),
      cost: cost,
      date: date,
      rawDate: new Date(rawEvent.start_date),
      image: rawEvent.image.url,
      url: rawEvent.url,
      mgUrl: rawEvent.website
    });
  }

  // sort the events by date
  events.sort(function (a, b) {
    return a.rawDate - b.rawDate;
  });

  return events;
}

function encode(str) {
  if (str) {
    // since the event plugin does encode some entites, decode everything before encoding again
    return he.encode(he.decode(str));
  } else {
    return null;
  }
}

const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const MONTHS = ['Januar', 'Februar', 'MÃ¤rz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

// produce custom date format; thanks Sandro
function formatDate(date) {

  let addZero = function (i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  // time
  let time = "";

  let hours = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());
  if (minutes == 0)
    time = hours;
  else
    time = `${hours}:${minutes}`;

  time += " Uhr"

  // date
  let dayName = WEEKDAYS[date.getDay()];
  let monthName = MONTHS[date.getMonth()];
  let day = date.getDate();

  return `${dayName}, ${day}. ${monthName} – ${time}`;
}

export default { crawl };
