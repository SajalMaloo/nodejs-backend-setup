import { Request, Response } from 'express';
import { tHttpResponse } from '../types/types';

export const httpResponseUtil = (_req: Request, res: Response, resStatusCode: number, resMessage: string, data?: unknown) => {
  const response: tHttpResponse = {
    success: true,
    statusCode: resStatusCode,
    message: resMessage,
    data,
  };

  res.status(resStatusCode).json(response);

  // eslint-disable-next-line no-console
  console.log(res.statusCode, res.statusMessage);
};
