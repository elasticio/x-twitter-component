exports.promisify = promisify;

function promisify(func) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            func(...args, (err, ...args) => {
                if (err) return reject(err);

                resolve(args);
            });
        });
    }
}
