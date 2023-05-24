import { DataTypes } from 'sequelize';
import sequelize from './sequelize.js';

const AuthOtp = sequelize.define('AuthOtp', {
  otp: {
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

export default AuthOtp;
