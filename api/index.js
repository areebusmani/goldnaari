import { Router } from 'express';
import authenticate from './authenticate.js';
import getStoreHandler from './handlers/getStore.js';
import getPlansHandler from './handlers/getPlans.js';
import getCollectionsHandler from './handlers/getCollections.js';

const router = Router()

router.get('/store', authenticate, getStoreHandler);
router.get('/plans', authenticate, getPlansHandler);
router.get('/collections', authenticate, getCollectionsHandler);

router.get('*', (req, res) => {
    res.send('Unkwown route');
});

export default router;