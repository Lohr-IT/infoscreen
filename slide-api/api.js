import mongoose from 'mongoose';
import express from 'express';

import { createSlideSchema } from 'shared/models/slide.js';
import { createSettingsSchema, getSettings } from 'shared/models/settings.js';

let Slide = undefined;
let Settings = undefined;

function loadSchema() {
  Slide = createSlideSchema(mongoose);
  Settings = createSettingsSchema(mongoose);
}

const router = express.Router();

// Set default API response
router.get('/', async (req, res) => {
  res.json({
    status: 'success',
    message: 'The slide-api is working <3',
  });
});

router.get('/slides', async (req, res) => {
  try {
    if (mongoose.connection.readyState == 0) {
      throw 'mongo not connected';
    }

    if (!Settings) {
      throw 'Settings schema not created';
    }

    const settings = await getSettings(Settings);

    const query = { hide: false };

    if (settings['filter']) {
      query.tags = { $in: settings['filterTags'] };
    }

    let result = await Slide.find(query).sort({ priority: 1 }).lean().exec();

    // drop hide property, since we only expose unhidden slides anyways
    result = result.map(({ hide, ...keepAttrs }) => keepAttrs);

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default { loadSchema, router };
