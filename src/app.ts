import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import router from './router/apiRouter';
import { logV1Request } from './middleware/apiV1Handler';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import notFoundHandler from './middleware/notFoundHandler';
import helmet from 'helmet';
import cors from 'cors';

const app: Application = express();

app.use(helmet());
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    origin: process.env.APP_BASE_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/v1', logV1Request);
app.use('/api/v1', router);

app.use((_: Request, _res: Response, next: NextFunction) => notFoundHandler(next));

app.use(globalErrorHandler);

export default app;
