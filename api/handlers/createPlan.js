import {Store} from '../models/index.js';

const createPlan = async (request, response) => {
    const storeId = request.storeId;
    const store = await Store.findByPk(storeId);
    const currentTime = new Date();
    const plan = await store.createPlan({
        customerName: request.body.customerName,
        customerPhoneNumber: request.body.customerPhoneNumber,
        installmentAmount: request.body.installmentAmount,
        installmentFrequency: 'monthly',
        totalInstallments: 11,
        startedAt: currentTime,
        status: 'active',
      });
    const collection = await plan.createCollection({
        datetime: currentTime,
        amount: request.body.installmentAmount,
    });
    try {
        await collection.setStore(store);
        response.json({});
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}

export default createPlan;