import {Store} from '../models/index.js';

const createPlan = async (request, response) => {
    const storeId = request.storeId;
    const store = await Store.findByPk(storeId);
    const currentTime = new Date().toISOString();
    const plan = await store.createPlan({
        customerName: request.body.customerName,
        customerPhoneNumber: request.body.customerName,
        installmentFrequency: 'monthly',
        totalInstallments: 11,
        startedAt: currentTime,
        status: 'active',
      });
    const collection = await plan.createCollection({
        datetime: currentTime,
        amount: 15000,
    });
    await collection.setStore(store);
    response.json({status: 'SUCCESS'});
}

export default createPlan;