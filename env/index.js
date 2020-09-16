const dotenv = require('dotenv');
const colors = require('colors')

// Set default to "development"
const envFile = process.env.ENV_FILE || 'development'
console.log(colors.cyan(`Node environment: ${envFile}`))

const result2 = dotenv.config({
  path: `./env/${envFile}.env`,
});

if (result2.error) {
  throw result2.error;
}