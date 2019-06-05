const db = require('../models/db')

exports.show_list = (req, res) => {
    db.Show.findAll().then((shows) => {
        res.send(shows);
    }).catch(err => {
        console.err(`Error was found ${err}`)
    })
}