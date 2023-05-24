const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const AuthToken = sequelize.define('AuthToken', {
  storeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'stores',
        key: 'id',
    },
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expiry: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type:   DataTypes.ENUM,
    values: ['active', 'inactive'],
    allowNull: false
  }
}, {tableName: 'auth_token'});

module.exports = AuthToken;