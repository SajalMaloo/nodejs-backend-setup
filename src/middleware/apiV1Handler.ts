import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export const logV1Request = (_req: Request, _res: Response, next: NextFunction) => {
  logger.info('logV1Request', { meta: { details: '/api/v1 request made' } });
  next();
};
