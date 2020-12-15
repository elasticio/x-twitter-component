module.exports = {
  extends: 'airbnb-base',
  env: {
    mocha: true,
  },
  rules: {
    'max-len': ['error', { code: 180 }],
  },
};
