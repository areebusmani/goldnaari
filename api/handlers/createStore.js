import {Store} from '../models/index.js';

const createStore = async (request, response) => {
    try {
        await Store.create({
            businessName: request.body.businessName,
            ownerName: request.body.ownerName,
            phoneNumber: request.body.phoneNumber,
            status: 'active'
        });
        response.json({});
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}

export default createStore;