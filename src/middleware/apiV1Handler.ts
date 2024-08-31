import { NextFunction, Request, Response } from 'express';

export const logV1Request = (_req: Request, _res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.log('A request was made to /api/v1 route');
  next();
};
