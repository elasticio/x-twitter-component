/* eslint-disable import/first */
process.env.LOG_OUTPUT_MODE = 'short';
process.env.API_RETRY_DELAY = '0';
import getLogger from '@elastic.io/component-logger';
import sinon from 'sinon';

export const getContext = () => ({
  logger: getLogger(),
  emit: sinon.spy(),
});

export class StatusCodeError extends Error {
  response: any;

  constructor(status) {
    super('');
    this.response = { status };
    this.message = 'StatusCodeError';
  }
}

export const creds = {
  consumer_key: 'APP_KEY',
  consumer_secret: 'APP_SECRET',
  access_token_key: 'ACCESS_TOKEN',
  access_token_secret: 'ACCESS_SECRET',
};
