import {getPendingStoreCollections} from '../collections/pending.js';

const getPendingCollections = async (request, response) => {
    const {storeId} = request;

    try {
        const collections = getPendingStoreCollections(storeId);
        const responseData = {
            data: collections,
            count: collections.count
        };
        response.json(responseData);
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}

export default getPendingCollections;
