const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Show extends Sequelize.Model {}
  Show.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      imdbID: { type: DataTypes.INTEGER, allowNull: false },
      title: DataTypes.TEXT,
    },
    { sequelize },
  );
  return Show;
};
