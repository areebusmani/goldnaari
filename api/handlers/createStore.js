import {Store} from '../models/index.js';

const createStore = async (request, response) => {
    await Store.create({
        businessName: request.body.businessName,
        ownerName: request.body.ownerName,
        phoneNumber: request.body.phoneNumber,
        status: 'active'
    });
    response.json({status: 'SUCCESS'});
}

export default createStore;