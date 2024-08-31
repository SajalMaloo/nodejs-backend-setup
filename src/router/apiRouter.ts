import { Router } from 'express';
import apiControllers from '../controller/apiController';

const router = Router();

router.route('/self').get(apiControllers.selfController);

export default router;
