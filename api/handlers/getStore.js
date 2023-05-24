import {Plan, Collection, Store} from '../models/index.js';

const getStore = async (request, response) => {
    const storeId = request.storeId;
    const store = await Store.findByPk(storeId);
    const totalPlans = await Plan.count({where: {storeId, status: 'active'}});
    const totalCollections = await Collection.sum('amount', {where: {storeId}});
    const responseData = {totalPlans, totalCollections, ...store.dataValues};
    response.json(responseData);
}

export default getStore;