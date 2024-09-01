import { Request, Response } from 'express';
import { tHttpResponse } from '../types/types';
import logger from './logger';

export const httpResponseUtil = (req: Request, res: Response, resStatusCode: number, resMessage: string, data?: unknown) => {
  const response: tHttpResponse = {
    success: true,
    statusCode: resStatusCode,
    message: resMessage,
    data,
  };

  res.status(resStatusCode).json(response);

  logger.info(`${req.path}: request`, { meta: response });
};
