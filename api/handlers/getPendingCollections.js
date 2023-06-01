import {getPendingStoreCollections} from '../collections/pending.js';

const getPendingCollections = async (request, response) => {
    const {storeId} = request;

    try {
        const collections = await getPendingStoreCollections(storeId);
        const responseData = {
            data: collections,
            count: collections.length
        };
        response.json(responseData);
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}

export default getPendingCollections;
