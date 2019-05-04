const express = require('express')
const app = express()
const port = 3001
const sqlite3 = require('better-sqlite3');
const request = require('request')
const OMDbAPIKey = 'ENTERKEYHERE';


app.get('/', (req, res) => res.send('Life'))

app.get('/party/:partyID', (req, res) => res.send(getParty(req.params.partyID)))
app.get('/parties/:imdbID', (req, res) => res.send(getAllParties(req.params.imdbID)))
app.get('/show/:title', (req, res) => res.send(getShowData(req.params.title)))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

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

function getShowData(title) {
  var showResult;
  const OMDdRequest = {
    url: 'http://www.omdbapi.com/?apikey=' + OMDbAPIKey + '&t=' + title,
    method: 'GET'
  };
  request(OMDdRequest, function(err, res, body){
    let json = JSON.parse(body);
    console.log(json);
    const db = new sqlite3('./db/watchfulstore.db', { verbose: console.log });
    const showInsert = db.prepare(`INSERT INTO Show (imdbID, title, year, genre, plot, poster, type)
    VALUES(?, ?, ?, ?, ?, ?, ?)`);
    const insert = showInsert.run(json.imdbID, json.Title, json.Year, json.Genre, json.Plot, json.Poster, json.Type)
    console.log(insert.changes);
    db.close();
    return json;
  });
  
}


