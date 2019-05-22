const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/watchfulstore.db"
});

class Show extends Model {}

Show.init(
  {
    id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
    imdbID: { type: Sequelize.INTEGER, allowNull: false },
    title: Sequelize.TEXT
  },
  { sequelize, modelName: "Show", freezeTableName: true, timestamps: false }
);

// Show.sync();

class Party extends Model {}

Party.init(
  {
    id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
    title: Sequelize.TEXT,
    date: Sequelize.TEXT,
    hostName: Sequelize.TEXT,
    hostContact: Sequelize.INTEGER,
    suburb: Sequelize.TEXT,
    size: Sequelize.INTEGER,
    going: Sequelize.INTEGER,
    description: Sequelize.TEXT,
    imdbID: Sequelize.INTEGER
  },
  { sequelize, modelName: "Party", freezeTableName: true, timestamps: false }
);

// sequelize.sync();

/* 
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the db has been established successfully");
  })
  .catch(err => {
    console.err("Unable to connect to the db", err);
  }); 
  */

module.exports = { PartyModel: Party, ShowModel: Show, DBConn: sequelize };
