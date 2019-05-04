const express = require('express')
const app = express()
const port = 3001
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/watchfulstore.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the watchful database.');
  });

let partysql = 'SELECT title, date, hostName FROM Party';

db.all(partysql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.title, row.date, row.hostName);
    });
  });

db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });

app.get('/', (req, res) => res.send('Life'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))




