import { Plan, Collection } from '../models/index.js';
import sequelize from '../models/sequelize.js';

export const getPendingStoreCollections = async (storeId) => {
    const currentDate = new Date();

    const plans = await Plan.findAll({
        where: { storeId, status: 'active' }
    });
    const collections = await Collection.findAll({
        attributes: [
            'PlanId',
            [sequelize.fn('count', sequelize.col('PlanId')), 'collectionCount'],
        ],
        group: ['PlanId'],
        where: { storeId }
    });
    const collectionsMap = collections.reduce((accumulator, collection) => {
        const {PlanId, collectionCount} = collection.dataValues;
        return {...accumulator, [PlanId]: collectionCount};
    }, {});
    const pendingCollections = plans.map(plan => {
        const {
            id,
            customerName,
            customerPhoneNumber,
            totalInstallments,
            installmentAmount,
            startedAt
        } = plan.dataValues;
   
        const timeDiff = Math.abs(currentDate - startedAt);
        const monthsPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
        const installmentsExpected = Math.min(monthsPassed + 1, totalInstallments);
        const installmentsDone = Number(collectionsMap[id]);
        const installmentsPending = Math.max(installmentsExpected - Number(installmentsDone));
        const dueDate = new Date(startedAt);
        dueDate.setMonth(dueDate.getMonth() + Number(installmentsDone));
        return {
            planId: id,
            customerName,
            customerPhoneNumber,
            dueDate,
            dueAmount: installmentsPending * installmentAmount
        };
    }).filter((collection) => {
        return collection.dueAmount > 0;
    });

    return pendingCollections;
}
