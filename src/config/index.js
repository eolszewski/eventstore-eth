const defaultEnv = require('./env.json');

const ENV = process.env.ENV || 'localhost';

let env = defaultEnv[ENV];

module.exports = env;

