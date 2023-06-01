import {Store, Plan} from '../models/index.js';

const createCollection = async (request, response) => {
    const {storeId} = request;

    try {
        const store = await Store.findByPk(storeId);
        const {planId} = request.body;
        const plan = await Plan.findByPk(planId);
        const collection = await plan.createCollection({
            amount: plan.installmentAmount
        });
    
        await collection.setStore(store);
        response.json();
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}

export default createCollection;
