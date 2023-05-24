const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Collection = sequelize.define('Collection', {
  storeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'stores',
        key: 'id',
    },
  },
  planId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'plans',
        key: 'id',
    },
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
}, {tableName: 'collections'});

module.exports = Collection;
