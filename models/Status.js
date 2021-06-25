const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Status extends Model {}

Status.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'status'
  }
);

module.exports = Status;