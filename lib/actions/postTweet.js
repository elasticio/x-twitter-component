const { messages } = require('elasticio-node');
const Twitter = require('twitter');

exports.process = action;

// exports.process.bind({
//     emit(...data) {
//         // console.log('emitted', ...data);
//     }
// })({
//     body: {
//         // text: 'hello world ' + new Date()
//         text: ''
//     }
// }, {
// }).then(process.exit).catch(console.error);

async function action(msg, cfg) {
    try {
        const actionResult = await exec.call(this, msg, cfg);

        console.log('actionResult', actionResult);

        return actionResult;
    } catch (err) {
        console.error('ERROR:', err);

        if (Array.isArray(err)) {
            return Promise.reject({
                message: err.map(i => i.message).join(', ')
            });
        }

        return  Promise.reject(err);
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

    const tweet = await client.post('statuses/update', {status: text});

    return messages.newMessageWithBody({
        createdAt: tweet.created_at,
        id: tweet.id_str,
        text: tweet.text
    });
}
