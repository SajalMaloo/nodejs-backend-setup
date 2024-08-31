export type tHttpResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: unknown;
};

export type tHttpError = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: unknown;
  trace?: object;
};
