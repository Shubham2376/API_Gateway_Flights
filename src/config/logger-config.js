const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format; //format is a object we destructuring the object here

const customLogger = printf(({ level, message,timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
    timestamp({format : 'YYYY-MM-DD HH:mm:ss'}),
    customLogger,
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename : 'combined.log'}) // i make one file to combined all the log i don't make separate file for separte log 
    ]
})
module.exports = logger