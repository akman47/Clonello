const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class UserProject extends Model {}

UserProject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'project',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'user',
          key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userproject'
  }
);

module.exports = UserProject;