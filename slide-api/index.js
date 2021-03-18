import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

import api from './api.js';

dotenv.config();

// Initialize the app
const app = express();

// setup cors (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
app.use(cors());

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

// Setup server port
const port = process.env.PORT || 8080;

api.loadSchema();

// Send message for default URL
app.get('/', (req, res) =>
  res.send('API root. The client should be served here.')
);

// Use Api routes in the App
app.use('/api', api.router);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log('Running slide-api on port ' + port);
});
