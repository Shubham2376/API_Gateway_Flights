const dotenv = require('dotenv');
// dotenv module actually return a module on that object you call 
// on dotenv object you call the config function so that you can get your environment variable inplace
dotenv.config()
// after this all of your environment variable was loaded inside this object process.env

module.exports = {
    PORT : process.env.PORT,
    SALT_ROUNDS : process.env.SALT_ROUNDS,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXPIRY : process.env.JWT_EXPIRY,
    FLIGHT_SERVICE: process.env.FLIGHT_SERVICE,
    BOOKING_SERVICE: process.env.BOOKING_SERVICE
}