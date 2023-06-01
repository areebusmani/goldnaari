import {Store} from '../models/index.js';

const createPlan = async (request, response) => {
    const {storeId} = request;

    try {
        const store = await Store.findByPk(storeId);
        const currentTime = new Date();
        const {customerName, customerPhoneNumber, installmentAmount} = request.body;
        const plan = await store.createPlan({
            customerName,
            customerPhoneNumber,
            installmentAmount,
            installmentFrequency: 'monthly',
            totalInstallments: 11,
            startedAt: currentTime,
            status: 'active',
        });
        const collection = await plan.createCollection({
            amount: installmentAmount
        });
        await collection.setStore(store);
        response.json();
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}

export default createPlan;
