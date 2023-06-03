import {getUpcomingCollectionForPlan} from '../collections/upcoming.js';

const getUpcomingCollection = async (request, response) => {
    const {storeId} = request;
    const {planId} = request.params;

    try {
        const collection = await getUpcomingCollectionForPlan(storeId, planId);
        response.json(collection);
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}

export default getUpcomingCollection;
