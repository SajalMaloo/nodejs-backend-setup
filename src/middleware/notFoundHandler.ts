import { NextFunction } from 'express';
import responseMessage from '../constants/responseMessage';
import { httpErrorUtil } from '../utils/httpError';

export default (next: NextFunction) => {
  httpErrorUtil(next, new Error(responseMessage.NOT_FOUND('route')), 404);
};
