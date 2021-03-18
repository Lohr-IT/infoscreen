import dotenv from 'dotenv';
import mongoose from 'mongoose';

import crawler from './crawler.js';
import cron from './cron.js';
import slideManager from './slideManager.js';

dotenv.config();

// enable logging in mongoose
mongoose.set('debug', (collectionName, method, query, doc) => {
  console.debug(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

// Connect to Mongoose and set connection variable
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    throw new Error('Database connection error:', err);
  });

// schedule crawling job
const interval = process.env.INTERVAL || '0 */10 * * * *';
const timezone = process.env.TIMEZONE || 'Europe/Berlin';

const job = cron.scheduleJob(interval, timezone, crawler.crawl);

// load schemas
slideManager.loadSchema();

// crawl now
crawler.crawl();

// start job
job.start();
