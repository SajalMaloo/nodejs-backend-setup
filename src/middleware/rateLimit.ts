import { NextFunction, Request, Response } from 'express';
import { rateLimiterMongo } from '../config/rateLimiter';
import { httpErrorUtil } from '../utils/httpError';
import responseMessage from '../constants/responseMessage';
import { eApplicationEnvironment } from '../constants/application';

export default (req: Request, _: Response, next: NextFunction) => {
  if (process.env.ENV === eApplicationEnvironment.DEVELOPMENT) {
    return next();
  }

  if (rateLimiterMongo) {
    rateLimiterMongo
      .consume(req.ip as string, 1)
      .then(() => {
        next();
      })
      .catch(() => {
        httpErrorUtil(next, new Error(responseMessage.TOO_MANY_REQUESTS), 429);
      });
  }
};
