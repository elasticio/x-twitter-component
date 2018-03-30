const { messages } = require('elasticio-node');
const Twitter = require('twitter');

exports.process = action;

exports.process({
    body: {
        text: 'hello world',
        count: 2
    }
}, {
    consumer_key: 'qENyJqzOQjNaQXdYWDTNUGtEj',
    consumer_secret: 'zCiAV7uxi0O2elh24FxCymhkWwGOkLr5ontFQpZMcU7jVqpwAU',
    access_token_key: '979002930916413441-fhyELCCNZN0a18AbtyengaoauCAZ22X',
    access_token_secret: '529HClw9R2FYkNtsI4u60AUkH4RQ5lYUkFjZAEcESW9xW'
}).then(process.exit).catch(console.error);

async function action(msg, cfg) {
    try {
        const actionResult = await exec.call(this, msg, cfg);

        console.log('actionResult', actionResult);

        return actionResult;
    } catch (err) {
        console.error('ERROR:', err);
        this.emit('error', err);
    } finally {
        this.emit('end');
    }
}

async function exec(msg, cfg) {
    const {
        text,
        count
    } = msg.body;

    const {
        consumer_key,
        consumer_secret,
        access_token_key,
        access_token_secret
    } = cfg;

    const client = new Twitter({
        consumer_key,
        consumer_secret,
        access_token_key,
        access_token_secret
    });

    const tweets = await client.get('search/tweets', {q: text, count});

    return messages.newMessageWithBody({
        tweets: (tweets.statuses || []).map(tweet => {
            return {
                id: tweet.id_str,
                userId: tweet.user.id_str,
                createdAt: tweet.created_at,
                text: tweet.text,
                lang: tweet.lang
            };
        })
    });
}
