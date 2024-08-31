import { NextFunction, Request, Response } from 'express';
import { httpResponseUtil } from '../utils/httpResponse';
import responseMessage from '../constants/responseMessage';
import { httpErrorUtil } from '../utils/httpError';

export default {
  selfController: (req: Request, res: Response, next: NextFunction) => {
    try {
      httpResponseUtil(req, res, 200, responseMessage.SUCCESS);
    } catch (error) {
      httpErrorUtil(next, error, 500);
    }
  },
};
