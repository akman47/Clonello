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
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    status_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'status',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'project',
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