import { Plan } from "../models/index.js";

export const getUpcomingCollectionForPlan = async (storeId, planId) => {
    const currentDate = new Date();
    const plan = await Plan.findByPk(planId);
    if (plan.dataValues.StoreId !== storeId) {
        throw new Error('Invalid Plan Id');
    }
    const {
        startedAt,
        installmentAmount,
        customerName,
        customerPhoneNumber,
        totalInstallments
    } = plan.dataValues;

    const collections = await plan.getCollections();

    const installmentsDone = collections.length;
    const dueDate = new Date(startedAt);
    dueDate.setMonth(dueDate.getMonth() + installmentsDone);

    const timeDiff = Math.abs(currentDate - startedAt);
    const monthsPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
    const installmentsExpected = Math.min(monthsPassed + 1, totalInstallments);
    const installmentsPending = installmentsExpected - installmentsDone;
    const dueAmount = Math.max(installmentsPending * installmentAmount, installmentAmount);

    return {
        planId,
        customerName,
        customerPhoneNumber,
        dueDate,
        dueAmount,
        isDueDateInFuture: installmentsPending <= 0
    };
}
