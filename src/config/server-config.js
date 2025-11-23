const dotenv = require('dotenv');
// dotenv module actually return a module on that object you call 
// on dotenv object you call the config function so that you can get your environment variable inplace
dotenv.config()
// after this all of your environment variable was loaded inside this object process.env

module.exports = {
    PORT : process.env.PORT
}