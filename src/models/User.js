// src/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajuste o caminho se necessário

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'Users',
  timestamps: true,
  underscored: true,
});

module.exports = User;