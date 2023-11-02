/* eslint-disable max-len */
/* eslint-disable import/first */
process.env.LOG_LEVEL = 'TRACE';
process.env.LOG_OUTPUT_MODE = 'short';
import getLogger from '@elastic.io/component-logger';
import sinon from 'sinon';
import { existsSync } from 'fs';
import { config } from 'dotenv';

if (existsSync('.env')) {
  config();
  const {
    APP_KEY, APP_SECRET, ACCESS_TOKEN, ACCESS_SECRET
  } = process.env;
  if (!APP_KEY || !APP_SECRET || !ACCESS_TOKEN || !ACCESS_SECRET) {
    throw new Error('Please, provide all environment variables');
  }
} else {
  throw new Error('Please, provide environment variables to .env');
}
const { APP_KEY, APP_SECRET, ACCESS_TOKEN, ACCESS_SECRET } = process.env;

export const creds = {
  consumer_key: APP_KEY,
  consumer_secret: APP_SECRET,
  access_token_key: ACCESS_TOKEN,
  access_token_secret: ACCESS_SECRET,
};

export const getContext = () => ({
  logger: getLogger(),
  emit: sinon.spy(),
});
