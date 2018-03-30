const Twitter = require('twitter');

module.exports = verify;

function verify(credentials, callback) {
    (async () => {
        const {
            consumer_key,
            consumer_secret,
            access_token_key,
            access_token_secret
        } = credentials;

        const client = new Twitter({
            consumer_key,
            consumer_secret,
            access_token_key,
            access_token_secret
        });

        try {
            const tweets = await client.get('search/tweets', {q: 'hi', count: 1});

            if (tweets.statuses) {
                return callback(null, true);
            }
        } catch (e) {
            return callback(e);
        }

        callback({
            message: 'Something went wrong'
        });
    })();
}

// verify({
// }, (err, data) => {
//     console.log('err', err);
//     console.log('data', data);
// });
