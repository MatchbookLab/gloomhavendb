require('dotenv').config();

export const STAGING_MODE = process.env.NODE_ENV === 'staging';
export const PRODUCTION_MODE = process.env.NODE_ENV === 'production';
export const DEVELOPMENT_MODE = !STAGING_MODE && !PRODUCTION_MODE;
export const IS_DOCKER = process.env.DOCKER === 'yep';

// these things should go into .env
export const JWT_SECRET = process.env.JWT_SECRET;
export const DEFAULT_EMAIL_FROM = process.env.DEFAULT_EMAIL_FROM;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_DATABASE = process.env.DATABASE_DATABASE;
export const HOSTNAME = process.env.HOSTNAME;
export const PROTOCOL = process.env.PROTOCOL;
