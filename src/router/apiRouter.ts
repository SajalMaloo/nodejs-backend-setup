import { Router } from 'express';
import apiControllers from '../controller/apiController';
import rateLimit from '../middleware/rateLimit';

const router = Router();

router.route('/self').get(rateLimit, apiControllers.selfController);
router.route('/health').get(apiControllers.healthController);

export default router;
