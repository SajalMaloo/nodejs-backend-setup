import { NextFunction, Request, Response } from 'express';
import { httpResponseUtil } from '../utils/httpResponse';
import responseMessage from '../constants/responseMessage';
import { httpErrorUtil } from '../utils/httpError';
import generic from '../utils/generic';

export default {
  selfController: (req: Request, res: Response, next: NextFunction) => {
    try {
      httpResponseUtil(req, res, 200, responseMessage.SUCCESS);
    } catch (error) {
      httpErrorUtil(next, error, 500);
    }
  },
  healthController: (req: Request, res: Response, next: NextFunction) => {
    try {
      const healthData = {
        application: generic.getApplicationHealth(),
        system: generic.getSystemHealth(),
        timestamp: Date.now(),
      };
      httpResponseUtil(req, res, 200, responseMessage.SUCCESS, healthData);
    } catch (error) {
      httpErrorUtil(next, error, 500);
    }
  },
};
