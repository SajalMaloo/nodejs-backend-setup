import { createLogger, format, transports } from 'winston';
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports';
import { eApplicationEnvironment } from '../constants/application';
import { consoleLogFormat, fileLogFormat } from './transportFormats';
import path from 'path';
import { install } from 'source-map-support';
import 'winston-mongodb';
import { MongoDBTransportInstance } from 'winston-mongodb';

install();

const consoleTransport = (): Array<ConsoleTransportInstance> => {
  if (process.env.ENV !== eApplicationEnvironment.PRODUCTION) {
    return [
      new transports.Console({
        level: 'info',
        format: format.combine(format.timestamp(), consoleLogFormat),
      }),
    ];
  }
  return [];
};

const fileTransport = (): Array<FileTransportInstance> => {
  return [
    new transports.File({
      filename: path.join(__dirname, '../../logs', `${process.env.ENV}.log`),
      level: 'info',
      format: format.combine(format.timestamp(), fileLogFormat),
    }),
  ];
};

const mongoDbTransport = (): Array<MongoDBTransportInstance> => {
  return [
    new transports.MongoDB({
      level: 'info',
      db: process.env.DATABASE_URL as string,
      metaKey: 'meta',
      expireAfterSeconds: 3600 * 24 * 30,
      options: {
        useUnifiedTopology: true,
      },
      collection: 'application-logs',
    }),
  ];
};

export default createLogger({
  defaultMeta: {
    meta: {},
  },
  transports: [...consoleTransport(), ...fileTransport(), ...mongoDbTransport()],
});
