const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Plan = sequelize.define('Plan', {
  storeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Stores',
        key: 'id',
    },
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerPhoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  installmentFrequency: {
    type:   DataTypes.ENUM,
    values: ['monthly'],
    allowNull: false
  },
  totalInstallments: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  startedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type:   DataTypes.ENUM,
    values: ['active', 'inactive', 'expired'],
    allowNull: false
  }
}, {tableName: 'plans'});

module.exports = Plan;