import {Plan} from '../models/index.js';

const getPlans = async (request, response) => {
    const storeId = request.storeId;
    // const offset = parseInt(request.query.offset) || 0;
    // const limit = parseInt(request.query.limit) || 20;

    const plans = await Plan.findAndCountAll({
        where: {storeId, status: 'active'},
        // limit,
        // offset,
        order: [['createdAt', 'DESC']]
    });
    const responseData = {data: plans.rows.map(formatPlanRow), count: plans.count};
    response.json(responseData);
}

const formatPlanRow = (plan) => {
    plan.StoreId = undefined;
    plan.installmentAmount = Number(plan.installmentAmount)
    return plan;
}

export default getPlans;