import fs from 'node:fs';
import path from 'node:path';
import winston from 'winston';
import winstonDailyRotate from 'winston-daily-rotate-file';

const directory = path.join(process.cwd(), 'logs');
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

const LOG_CONFIG = {
  FILE_DATE_PATTERN: 'YYYY-MM-DD',
  FILENAME: '%DATE%.log',
  LEVELS: {
    CONSOLE: 'debug',
    ERROR: 'error',
    INFO: 'info',
  },
  FORMAT: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] (${level.toUpperCase()}) ${message.trim()}`;
    }),
  ),
};

const createRotateFileTransport = (level, dirname) => {
  return new winstonDailyRotate({
    level,
    dirname: path.join(directory, dirname),
    filename: LOG_CONFIG.FILENAME,
    datePattern: LOG_CONFIG.FILE_DATE_PATTERN,
    zippedArchive: true,
  });
};

export const morganFormat = ':remote-addr :method :url :status :response-time ms';

export const morganOptions = {
  stream: {
    write: (message) => logger.info(message),
  },
};

const logger = winston.createLogger({
  format: LOG_CONFIG.FORMAT,
  transports: [
    new winston.transports.Console({
      level: LOG_CONFIG.LEVELS.CONSOLE,
    }),
    createRotateFileTransport(LOG_CONFIG.LEVELS.ERROR, 'error'),
    createRotateFileTransport(LOG_CONFIG.LEVELS.INFO, 'info'),
  ],
});

export default logger;
