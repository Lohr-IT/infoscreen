import mongoose from 'mongoose';

import { createSlideSchema, RenderType } from 'shared/models/slide.js';

const CREATOR_IDENTIFIER = 'EVENT_CRAWLER';

let Slide = undefined;

function loadSchema() {
  Slide = createSlideSchema(mongoose);
}

/**
 * Updates slides in database from events
 */
async function createSlides(events) {
  if (mongoose.connection.readyState == 0) {
    console.error('mongo not connected');
    return;
  }

  if (!Slide) {
    console.error('Slide schema not created');
    return;
  }

  const slides = [];

  // collect all events by one musengruppe
  const mgEvents = {};
  events.forEach((event) => {
    // create comment
    if (event.title.toLowerCase().includes('kneipe')) {
      event.comment = 'Nur+f%C3%BCr+geladene+G%C3%A4ste.'; // use https://www.url-encode-decode.com/
    }

    // create single slides for AGV aktivities
    if (
      event.musengruppe == 'Aktivitas' ||
      event.musengruppe == 'Philisterium'
    ) {
      slides.push({
        tags: [event.musengruppe, event.musengruppe + event.tribeId],
        renderType: RenderType.event,
        data: event,
        image: event.image,
        creator: CREATOR_IDENTIFIER,
        _internalIdentifierTag: event.musengruppe + event.tribeId, // used to identify that slide, not stored in database
      });
    } else {
      // aggregate musengruppen events
      const mg = event.musengruppe;
      delete event.musengruppe;

      if (!mgEvents[mg]) mgEvents[mg] = [];
      mgEvents[mg].push(event);
    }
  });

  // create one slide per musengruppe
  for (var mg in mgEvents) {
    var events = mgEvents[mg];

    slides.push({
      tags: [mg],
      renderType: RenderType.musengruppe,
      data: {
        events: events,
        musengruppe: mg
      },
      image: events[0].image,
      creator: CREATOR_IDENTIFIER,
      _internalIdentifierTag: mg, // used to identify that slide, not stored in database
    });
  }

  await removeOldSlides(slides);
  addNewSlides(slides);

  return slides;
}

/**
 * Remove slides from the database, if they are not in our slides list
 */
async function removeOldSlides(currSlides) {
  // get the identifier tags
  const keepTags = currSlides.map((slide) => {
    return slide._internalIdentifierTag;
  });

  await Slide.deleteMany({
    creator: CREATOR_IDENTIFIER,
    tags: { $nin: keepTags },
  })
    .exec()
    .catch((err) => console.error('deleteMany error:', err));
}

/**
 * Add new slides
 */
function addNewSlides(currSlides) {
  const bulkOps = currSlides.map((slide) => ({
    updateOne: {
      filter: { tags: { $gte: slide._internalIdentifierTag } },
      update: slide,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  }));
  Slide.bulkWrite(bulkOps).catch((err) =>
    console.eror('BULK update error:', err)
  );
}

export default { loadSchema, createSlides };
