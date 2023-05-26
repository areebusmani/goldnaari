import {Plan, Collection} from '../models/index.js';

const getCollections = async (request, response) => {
    const storeId = request.storeId;
    const offset = parseInt(request.query.offset) || 0;
    const limit = parseInt(request.query.limit) || 20;

    const collections = await Collection.findAndCountAll({
        where: {storeId},
        order: [['createdAt', 'DESC']],
        limit,
        offset,
        include: [Plan]
    });
    const responseData = {
        data: collections.rows.map(formatCollectionRow),
        count: collections.count
    };
    response.json(responseData);
}

const formatCollectionRow = (collection) => {
    collection.StoreId = undefined;
    collection.PlanId = undefined;
    collection.Plan.StoreId = undefined;
    collection.amount = Number(collection.amount);
    return collection;
}

export default getCollections;