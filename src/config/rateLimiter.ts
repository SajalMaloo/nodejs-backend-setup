import { Connection } from 'mongoose';
import { RateLimiterMongo } from 'rate-limiter-flexible';
import logger from '../utils/logger';

export let rateLimiterMongo: RateLimiterMongo | null = null;

const DURATION = 60;
const POINTS = 10;

export const initiRateLimiter = (mongooseConnection: Connection) => {
  logger.info('Ratelimiter initiated...');
  rateLimiterMongo = new RateLimiterMongo({
    storeClient: mongooseConnection,
    points: POINTS,
    duration: DURATION,
  });
};
