import { createLogger, format, transports } from 'winston';
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports';
import { eApplicationEnvironment } from '../constants/application';
import { consoleLogFormat, fileLogFormat } from './transportFormats';
import path from 'path';
import { install } from 'source-map-support';

install();

export const consoleTransport = (): Array<ConsoleTransportInstance> => {
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

export const fileTransport = (): Array<FileTransportInstance> => {
  return [
    new transports.File({
      filename: path.join(__dirname, '../../logs', `${process.env.ENV}.log`),
      level: 'info',
      format: format.combine(format.timestamp(), fileLogFormat),
    }),
  ];
};

export default createLogger({
  defaultMeta: {
    meta: {},
  },
  transports: [...consoleTransport(), ...fileTransport()],
});
