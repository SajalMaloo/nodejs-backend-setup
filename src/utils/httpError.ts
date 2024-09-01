import { NextFunction } from 'express';
import errorObject from './errorObject';

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export const httpErrorUtil = (nextFunc: NextFunction, err: Error | unknown, errStatusCode: number = 500) => {
  const errObject = errorObject(err, errStatusCode);

  return nextFunc(errObject);
};
