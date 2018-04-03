'use static';

const express = require('express');

const db = require('./model-mysql');

const app = express();

// logging
app.use('/', (req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
});

//   SERVER API
//
//   GET  /api/weeks            - List weeks ordered by week number
//   POST /api/weeks            - Add a new week to the database
//   PUT  /api/weeks            - Update a week with new data taken from p element
//   DELETE /api/weeks/x        - Delete a week with the given id

app.get('/api/weeks', getWeeks);
app.post('/api/weeks', uploadWeek);
app.put('/api/weeks', updateWeek);
app.delete('/api/weeks/:id', deleteWeek);

app.use('/', express.static('files/webpages', {
  extensions: ['html'],
}));

// start the server, on port 8080
app.listen(8080, (err) => {
  if (err) console.error('There was an error starting the server.', err);
  else console.log('Server started successfully.');
});

// SERVER FUNCTIONS

async function getWeeks(req, res) {
  try {
    const retval = await db.getWeeks();
    res.json(retval);
  } catch (e) {
    error(res, e);
  }
}


async function uploadWeek(req, res) {
  try {
    const retval = await db.uploadWeek(
      req.query.weekNo, req.query.lecTopic, req.query.labTopic,
      req.query.semTopic, req.query.resources,
    );
    res.json(retval);
  } catch (e) {
    error(res, e);
  }
}

async function updateWeek(req, res) {
  try {
    const retval = await db.updateWeek(
      req.query.weekNo, req.query.lecTopic, req.query.labTopic,
      req.query.semTopic, req.query.resources, req.query.old,
    );
    res.json(retval);
  } catch (e) {
    error(res, e);
  }
}

async function deleteWeek(req, res) {
  try {
    db.deleteWeek(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    if (e.status === 'gone') {
      res.sendStatus(410);
    } else {
      error(res, e);
    }
  }
}

// for sending error codes, taken from JStagram
function error(res, err) {
  res.sendStatus(500);
  console.error(err);
}
