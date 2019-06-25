const Sequelize = require('sequelize');

const db = {};
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE,
  define: { freezeTableName: true, timestamps: false },
});

const Show = sequelize.import(`${__dirname}/Show.js`);
const Party = sequelize.import(`${__dirname}/Party.js`);

/*
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the db has been established successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the db', err);
  });
 */

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Show = Show;
db.Party = Party;

module.exports = db;
