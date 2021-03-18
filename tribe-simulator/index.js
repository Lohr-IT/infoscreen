import fs from 'fs';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

// Initialize the app
const app = express();

// Envs
const port = process.env.PORT || 8080;
const file = process.env.FILE || './responses/default.json';

// Send json response
app.get('/v1/events', (req, res) => {
  var data = fs.readFileSync(file, 'utf8');
  res.setHeader('Content-Type', 'application/json');
  res.end(data);
});

// Launch app to listen to specified port
app.listen(port, function () {
  console.log(`Running tribe-simulator on port ${port} serving ${file}`);
});
