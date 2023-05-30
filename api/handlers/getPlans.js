import {Plan} from '../models/index.js';

const getPlans = async (request, response) => {
    const storeId = request.storeId;

    try {
        const plans = await Plan.findAndCountAll({
            where: {storeId, status: 'active'},
            order: [['createdAt', 'DESC']]
        });
        const responseData = {data: plans.rows.map(formatPlanRow), count: plans.count};
        response.json(responseData);
    }  catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}

const formatPlanRow = (plan) => {
    plan.StoreId = undefined;
    plan.installmentAmount = Number(plan.installmentAmount)
    return plan;
}

export default getPlans;