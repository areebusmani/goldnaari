import { DataTypes } from 'sequelize';
import sequelize from './sequelize.js';

const Store = sequelize.define('Store', {
    businessName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ownerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ['active', 'inactive'],
        allowNull: false
    }
}, { tableName: 'stores' });

export default Store;
