/* eslint-disable no-use-before-define,camelcase */
const { messages } = require('elasticio-node');
const Twitter = require('twitter');

// exports.process({
//     body: {
//         text: 'hello world',
//         count: 2
//     }
// }, {
//
// }).then(process.exit).catch(console.error);

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
    count,
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

  const tweets = await client.get('search/tweets', { q: text, count });

  return messages.newMessageWithBody({
    tweets: (tweets.statuses || []).map((tweet) => ({
      id: tweet.id_str,
      userId: tweet.user.id_str,
      createdAt: tweet.created_at,
      text: tweet.text,
      lang: tweet.lang,
    })),
  });
}
