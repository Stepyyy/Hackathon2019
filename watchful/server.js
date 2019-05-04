const express = require('express')
const app = express()
const port = 3001
const sqlite3 = require('better-sqlite3');
const request = require('request-promise')
const OMDbAPIKey = '60f7b912';


app.get('/', (req, res) => res.send(res.send(getAllShows())))
app.get('/party/:partyID', (req, res) => res.send(getParty(req.params.partyID)))
app.get('/parties/:imdbID', (req, res) => res.send(getAllParties(req.params.imdbID)))
app.get('/show/title/:title', (req, res) => res.send(getShowDataByTitle(req.params.title)))
app.get('/show/id/:imdbID', (req, res) => res.send(getShowDataByID(req.params.imdbID)))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function getAllShows() {
  const db = new sqlite3('./db/watchfulstore.db', { verbose: console.log });
  const showsql = db.prepare('select title, imdbID from Show')
  const rows = showsql.get()
  db.close()
  return rows
}

function getParty(partyID) {
  const db = new sqlite3('./db/watchfulstore.db', { verbose: console.log });
  const partysql = db.prepare(`SELECT partyID, title, date, hostName, hostContact, suburb, size, going, description, imdbID 
  FROM Party WHERE partyID = ?`);
  const row = partysql.get(partyID);
  var returnparty = row
  db.close();
  return returnparty;
}

function getAllParties(imdbID) {
  const db = new sqlite3('./db/watchfulstore.db', { verbose: console.log });
  const partiessql = db.prepare(`SELECT * FROM Party
  WHERE imdbID = ?`);
  const rows = partiessql.all(imdbID);
  var returnParties = rows;
  db.close();
  return returnParties;
}

function getShowDataByTitle(title) {
  var currentshow = returnSingleShow(title);
  if (typeof currentshow === 'undefined'){
    const OMDdRequest = {
      url: 'http://www.omdbapi.com/?apikey=' + OMDbAPIKey + '&t=' + title,
      method: 'GET',
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true

    };
    request(OMDdRequest).then(function(show){
      //console.log(show);
      const db = new sqlite3('./db/watchfulstore.db', { verbose: console.log });
      const showInsert = db.prepare(`INSERT INTO Show (imdbID, title, year, genre, plot, poster, type)
      VALUES(?, ?, ?, ?, ?, ?, ?)`);
      const insert = showInsert.run(show.imdbID, show.Title, show.Year, show.Genre, show.Plot, show.Poster, show.Type)
      console.log(insert.changes);
      db.close();
      return returnSingleShow(show.Title);
    });
  }
  else {
    return currentshow;
  } 
}

function returnSingleShow(title){
  const db = new sqlite3('./db/watchfulstore.db', { verbose: console.log });
  const showLookup = db.prepare(`SELECT * FROM Show WHERE title LIKE ? || '%'`);
  const currentshow = showLookup.get(title);
  db.close();
  return currentshow;
}

function returnSingleShowByID(imdbID){
  const db = new sqlite3('./db/watchfulstore.db', { verbose: console.log });
  const showLookup = db.prepare(`SELECT * FROM Show WHERE imdbID = ?`);
  const currentshow = showLookup.get(imdbID);
  db.close();
  return currentshow;
}

function getShowDataByID(imdbID) {
  var currentshow = returnSingleShowByID(imdbID);
  if (typeof currentshow === 'undefined'){
    const OMDdRequest = {
      url: 'http://www.omdbapi.com/?apikey=' + OMDbAPIKey + '&i=' + imdbID,
      method: 'GET',
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true

    };
    request(OMDdRequest).then(function(show){
      //console.log(show);
      const db = new sqlite3('./db/watchfulstore.db', { verbose: console.log });
      const showInsert = db.prepare(`INSERT INTO Show (imdbID, title, year, genre, plot, poster, type)
      VALUES(?, ?, ?, ?, ?, ?, ?)`);
      const insert = showInsert.run(show.imdbID, show.Title, show.Year, show.Genre, show.Plot, show.Poster, show.Type)
      console.log(insert.changes);
      db.close();
      return returnSingleShowByID(show.imdbID);
    });
  }
  else {
    return currentshow;
  } 
}