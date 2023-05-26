import { DataTypes } from 'sequelize';
import sequelize from './sequelize.js';

const Collection = sequelize.define('Collection', {
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, { tableName: 'collections' });

export default Collection;
