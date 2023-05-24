import { DataTypes } from 'sequelize';
import sequelize from './sequelize.js';

const Plan = sequelize.define('Plan', {
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerPhoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  installmentAmount: {
    type: DataTypes.DECIMAL,
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

export default Plan;