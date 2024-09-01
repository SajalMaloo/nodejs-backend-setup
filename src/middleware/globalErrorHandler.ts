import { NextFunction, Request, Response } from 'express';
import { tHttpError } from '../types/types';
import logger from '../utils/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: tHttpError, _: Request, res: Response, __: NextFunction) => {
  res.status(err.statusCode).json(err);

  logger.error(`${res.req.path}: error`, { meta: err });
};
