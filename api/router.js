import { Router } from 'express';
import authenticate from './handlers/authenticate.js';
import getStore from './handlers/getStore.js';
import getPlans from './handlers/getPlans.js';
import getCollections from './handlers/getCollections.js';
import createStore from './handlers/createStore.js';
import createPlan from './handlers/createPlan.js';
const router = Router()

router.get('/store', authenticate, getStore);
router.get('/plans', authenticate, getPlans);
router.get('/collections', authenticate, getCollections);

router.post('/store', createStore);
router.post('/plans', authenticate, createPlan);

router.get('*', (req, res) => {
    res.sendStatus(404);
});

export default router;