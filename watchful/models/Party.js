const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Party extends Sequelize.Model { }
  Party.init(
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      title: DataTypes.TEXT,
      date: DataTypes.TEXT,
      hostName: DataTypes.TEXT,
      hostContact: DataTypes.INTEGER,
      suburb: DataTypes.TEXT,
      size: DataTypes.INTEGER,
      going: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      imdbID: DataTypes.INTEGER,
    },
    { sequelize },
  );
  return Party;
};
