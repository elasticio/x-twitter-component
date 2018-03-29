const Twitter = require('twitter');

const { promisify } = require('../utils.js');

module.exports = verify;

function verify(credentials, callback) {
    callback(null, true);
}

// verify({
//     apiKey: ''
// }, (err, data) => {
//     console.log('err', err);
//     console.log('data', data);
// });
