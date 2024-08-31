import { tHttpError } from '../types/types';
import responseMessage from '../constants/responseMessage';

export default (err: Error | unknown, errStatusCode: number = 500) => {
  const errorObject: tHttpError = {
    success: false,
    statusCode: errStatusCode,
    message: err instanceof Error ? err.message || responseMessage.SOMETHING_WENT_WRONG : responseMessage.SOMETHING_WENT_WRONG,
    trace: err instanceof Error ? { error: err.stack } : undefined,
  };

  return errorObject;
};
