/* eslint-disable camelcase,no-use-before-define */
const { messages } = require('elasticio-node');
const Twitter = require('twitter');

exports.process = async function action(msg, cfg) {
  try {
    const actionResult = await exec.call(this, msg, cfg);

    this.logger.info('Action Result received');

    return actionResult;
  } catch (err) {
    this.logger.error('Error occurred');

    if (Array.isArray(err)) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        message: err.map((i) => i.message).join(', '),
      });
    }

    return Promise.reject(err);
  }
};

async function exec(msg, cfg) {
  const {
    text,
  } = msg.body;

  const {
    consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret,
  } = cfg;

  const client = new Twitter({
    consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret,
  });

  const tweet = await client.post('statuses/update', { status: text });

  return messages.newMessageWithBody({
    createdAt: tweet.created_at,
    id: tweet.id_str,
    text: tweet.text,
  });
}
