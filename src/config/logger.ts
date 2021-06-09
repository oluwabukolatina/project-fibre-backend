import winston from 'winston';
import { ENVIRONMENT } from './secrets';

const format = winston.format.cli({
  colors: {
    info: 'blue',
    error: 'red',
    warn: 'yellow',
    http: 'magenta',
    debug: 'white',
  },
});
const level = () => {
  return ENVIRONMENT === 'development' ? 'debug' : 'info';
};
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const options: winston.LoggerOptions = {
  levels,
  level: level(),
  transports: [
    new winston.transports.Console({
      level: ENVIRONMENT === 'production' ? 'error' : 'debug',
      format,
    }),
    new winston.transports.File({ filename: 'logs/debug.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  ),
};
const logger = winston.createLogger(options);
if (ENVIRONMENT !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;
