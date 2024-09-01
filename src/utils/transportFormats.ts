import { format } from 'winston';
import { inspect } from 'util';

export const consoleLogFormat = format.printf((info) => {
  const { level, message: customMessage, timestamp: customTimestamp, meta = {} } = info;

  const customLevel = level.toUpperCase();

  const customMeta = inspect(meta, {
    showHidden: false,
    depth: null,
  });

  return `${customLevel} [${customTimestamp}] ${customMessage}\nMeta: ${customMeta}\n`;
});

export const fileLogFormat = format.printf((info) => {
  const { level, message, timestamp, meta = {} } = info;

  const logMeta: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(meta)) {
    if (value instanceof Error) {
      logMeta[key] = {
        name: value.name,
        message: value.message,
        trace: value.stack || '',
      };
    } else {
      logMeta[key] = value;
    }
  }

  const logData = {
    level: level.toUpperCase(),
    message,
    timestamp,
    meta: logMeta,
  };

  return JSON.stringify(logData, null, 2);
});
