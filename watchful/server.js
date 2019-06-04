const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');
const request = require('request-promise');
const db = require('./models/db');

const OMDbAPIKey = process.env.OMDB_API_KEY;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(cors());

app.get('/', (req, res) => db.Show.findAll().then((shows) => {
  res.send(shows);
}).catch((err) => {
  // eslint-disable-next-line
  console.err(`Error was found ${err}`);
}));

app.get('/party/:partyID', (req, res) => db.Party.findAll({ where: { id: req.params.partyID } }).then(((parties) => {
  res.send(parties);
})).catch((err) => {
  // eslint-disable-next-line
  console.err(`Error was found ${err}`);
}));

app.get('/parties/:imdbID', (req, res) => db.Party.findAll({ where: { imdbID: req.params.imdbID } }).then((parties) => {
  res.send(parties);
}).catch((err) => {
  // eslint-disable-next-line
  console.err(`Error was found ${err}`);
}));

app.get('/show/title/:title', (req, res) => {
  const url = {
    url:
      `http://www.omdbapi.com/?apikey=${OMDbAPIKey}&t=${req.params.title}`,
    method: 'GET',
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };
  request(url)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.log(err);
    });
});
app.get('/show/id/:imdbID', (req, res) => {
  const url = {
    url:
      `http://www.omdbapi.com/?apikey=${
      OMDbAPIKey
      }&i=${
      req.params.imdbID}`,
    method: 'GET',
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };
  request(url)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.log(err);
    });
});

app.listen(process.env.PORT || 3001);
