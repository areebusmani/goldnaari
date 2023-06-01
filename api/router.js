import { Router } from 'express';
import authenticate from './handlers/authenticate.js';
import generateOtp from './handlers/generateOtp.js';
import validateOtp from './handlers/validateOtp.js';
import getStore from './handlers/getStore.js';
import getPlans from './handlers/getPlans.js';
import getCollections from './handlers/getCollections.js';
import createStore from './handlers/createStore.js';
import createPlan from './handlers/createPlan.js';
import getPendingCollections from './handlers/getPendingCollections.js';
import createCollection from './handlers/createCollection.js';

const router = Router()

router.get('/store', authenticate, getStore);
router.get('/plans', authenticate, getPlans);
router.get('/collections', authenticate, getCollections);
router.get('/pendingCollections', authenticate, getPendingCollections);

router.get('/generate-otp', generateOtp);
router.get('/validate-otp', validateOtp);

router.post('/store', createStore);
router.post('/plans', authenticate, createPlan);
router.post('/collections', authenticate, createCollection);

router.get('*', (request, response) => {
    response.sendStatus(404);
});

export default router;
