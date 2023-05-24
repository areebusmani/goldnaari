import { Router } from 'express';
import authenticate from './authenticate.js';
import getStoreHandler from './handlers/getStore.js';

const router = Router()

router.get('/store', authenticate, getStoreHandler);

router.get('*', (req, res) => {
    res.send('Unkown route');
});

export default router;