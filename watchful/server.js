const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("better-sqlite3");
const request = require("request-promise");
const OMDbAPIKey = "60f7b912";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());

app.get("/", (req, res) => res.send(getAllShows()));
app.get("/party/:partyID", (req, res) =>
  res.send(getParty(req.params.partyID))
);
app.get("/parties/:imdbID", (req, res) =>
  res.send(getAllParties(req.params.imdbID))
);
app.get("/show/title/:title", (req, res) => {
  const url = {
    url:
      "http://www.omdbapi.com/?apikey=" + OMDbAPIKey + "&t=" + req.params.title,
    method: "GET",
    headers: {
      "User-Agent": "Request-Promise"
    },
    json: true
  };
  request(url)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log(err);
    });
});
app.get("/show/id/:imdbID", (req, res) => {
  const url = {
    url:
      "http://www.omdbapi.com/?apikey=" +
      OMDbAPIKey +
      "&i=" +
      req.params.imdbID,
    method: "GET",
    headers: {
      "User-Agent": "Request-Promise"
    },
    json: true
  };
  request(url)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(process.env.PORT || 3001);

function getAllShows() {
  const db = new sqlite3("./db/watchfulstore.db", { verbose: console.log });
  const showsql = db.prepare(`SELECT title, imdbID from Show`);
  const rows = showsql.all();
  db.close();
  return rows;
}

function getParty(partyID) {
  const db = new sqlite3("./db/watchfulstore.db", { verbose: console.log });
  const partysql = db.prepare(`SELECT partyID, title, date, hostName, hostContact, suburb, size, going, description, imdbID 
  FROM Party WHERE partyID = ?`);
  const row = partysql.get(partyID);
  var returnparty = row;
  db.close();
  return returnparty;
}

function getAllParties(imdbID) {
  const db = new sqlite3("./db/watchfulstore.db", { verbose: console.log });
  const partiessql = db.prepare(`SELECT * FROM Party
  WHERE imdbID = ?`);
  const rows = partiessql.all(imdbID);
  var returnParties = rows;
  db.close();
  return returnParties;
}
