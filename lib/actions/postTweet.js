const { messages } = require('elasticio-node');
const Twitter = require('twitter');

const { promisify } = require('../utils.js');

exports.process = action;

// exports.process({
//     body: {
//         text: 'hello world ' + new Date()
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
        text
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

    const [ tweet ] = await promisify(client.post.bind(client))('statuses/update', {status: text});

    return messages.newMessageWithBody({
        createdAt: tweet.created_at,
        id: tweet.id_str,
        text: tweet.text
    });
}
