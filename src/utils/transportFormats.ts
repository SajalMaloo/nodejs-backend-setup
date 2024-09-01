import { format } from 'winston';
import { blue, green, red, yellow } from 'colorette';

const colorizeLevel = (level: string, message: string) => {
  switch (level) {
    case 'ERROR':
      return red(message);
    case 'INFO':
      return blue(message);
    case 'WARN':
      return yellow(message);
    default:
      return level;
  }
};

export const consoleLogFormat = format.printf((info) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { level, message: customMessage, timestamp, meta = {} } = info;

  const customLevel = level.toUpperCase();

  const customTimestamp = green(`[${timestamp}]`);

  const customMeta = JSON.stringify({ details: meta as object });

  return colorizeLevel(customLevel, `${customLevel} ${customTimestamp} ${customMessage}: ${customMeta}\n`);
});

export const fileLogFormat = format.printf((info) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { level, message, timestamp, meta = {} } = info;

  const logMeta: Record<string, unknown> = {};

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    message,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    timestamp,
    meta: logMeta,
  };

  return JSON.stringify(logData, null, 2);
});
