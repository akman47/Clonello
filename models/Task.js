const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    task_text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'status',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'task'
  }
);

module.exports = Task;