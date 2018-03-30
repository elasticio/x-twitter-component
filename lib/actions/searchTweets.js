const { messages } = require('elasticio-node');
const Twitter = require('twitter');

exports.process = action;

// exports.process({
//     body: {
//         text: 'hello world',
//         count: 25
//     }
// }, {
//
// }).then(process.exit).catch(console.error);

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
                createdAt: tweet.created_at,
                text: tweet.text,
                lang: tweet.lang
            };
        })
    });
}
