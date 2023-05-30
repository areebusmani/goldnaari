import {Plan, Collection, Store} from '../models/index.js';

const getStore = async (request, response) => {
    const storeId = request.storeId;
    try {
        const store = await Store.findByPk(storeId);
        const totalPlans = await Plan.count({where: {storeId, status: 'active'}});
        const totalCollections = await Collection.sum('amount', {where: {storeId}});
        const responseData = {
            totalPlans: Number(totalPlans),
            totalCollections: Number(totalCollections),
            ...store.dataValues
        };
        response.json(responseData);
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}

export default getStore;