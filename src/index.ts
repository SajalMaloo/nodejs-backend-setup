import app from './app';
import databaseService from './service/databaseService';
import logger from './utils/logger';

const server = app.listen(process.env.PORT);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  try {
    await databaseService.connect();

    logger.info(`Application started successfully on ${process.env.PORT} at ${process.env.SERVER_URL}`);
  } catch (error) {
    logger.error(`Error is running Application`, { meta: error });

    server.close((err) => {
      if (err) {
        logger.error(`Error in closing the application`, { meta: err });
      }
      process.exit(1);
    });
  }
})();
