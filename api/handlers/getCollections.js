import {Plan, Collection} from '../models/index.js';

const getCollections = async (request, response) => {
    const storeId = request.storeId;

    try {
        const collections = await Collection.findAndCountAll({
            where: {storeId},
            order: [['createdAt', 'DESC']],
            include: [Plan]
        });
        const responseData = {
            data: collections.rows.map(formatCollectionRow),
            count: collections.count
        };
        response.json(responseData);
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}

const formatCollectionRow = (collection) => {
    collection.StoreId = undefined;
    collection.PlanId = undefined;
    collection.Plan.StoreId = undefined;
    collection.amount = Number(collection.amount);
    return collection;
}

export default getCollections;