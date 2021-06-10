import dotenv from 'dotenv';
import fs from 'fs';
import logger from './logger';

if (fs.existsSync('.env')) {
  logger.info('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
}
function throwIfUndefined<T>(secret: T | undefined, name?: string): T {
  if (!secret) {
    logger.error(`${name} must not be undefined`);
    return process.exit(1);
  }
  return secret;
}
export const ENVIRONMENT = process.env.NODE_ENV;

export const APP_DB = throwIfUndefined(process.env.APP_DB, 'APP_DB');
export const APP_JWT_SECRET = throwIfUndefined(
  process.env.APP_JWT_SECRET,
  'APP_JWT_SECRET',
);

export const JWT_EXPIRY = throwIfUndefined(
  process.env.JWT_EXPIRY,
  'JWT_EXPIRY',
);
export const LOCAL_DB = throwIfUndefined(process.env.LOCAL_DB, 'LOCAL_DB');
export const MAIL_TRAP_PASSWORD = throwIfUndefined(
  process.env.MAIL_TRAP_PASSWORD,
  'MAIL_TRAP_PASSWORD',
);
export const MAIL_TRAP_USER = throwIfUndefined(
  process.env.MAIL_TRAP_USER,
  'MAIL_TRAP_USER',
);

export const EMAIL_FROM = throwIfUndefined(
  process.env.EMAIL_FROM,
  'EMAIL_FROM',
);
export const EMAIL_PASSWORD = throwIfUndefined(
  process.env.EMAIL_PASSWORD,
  'EMAIL_PASSWORD',
);
