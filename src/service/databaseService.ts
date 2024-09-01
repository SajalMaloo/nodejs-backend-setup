import mongoose from 'mongoose';
import logger from '../utils/logger';

export default {
  connect: async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URL as string);
      logger.info(`Connection to ${mongoose.connection.name} DB successful...`);
      return mongoose.connection;
    } catch (error) {
      logger.error(`Error while connecting to ${mongoose.connection.name} DB`, {
        meta: {
          error,
        },
      });
      throw error;
    }
  },
};
