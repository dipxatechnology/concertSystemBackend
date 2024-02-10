const rateLimits = require('express-rate-limit')
const { logEvents } = require('./logger')

const loginLimiters = rateLimits({
    windowMs: 60 * 1000, //every min
    max: 3, // Limit each IP to 3 login trials per `window` per minute
    message:
        { message: 'Too many login attempts, please try again after a 60 seconds' },
    handler: (req, res, next, options) => {
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    //followed docs
    standardHeaders: true, 
    legacyHeaders: false,
})

module.exports = loginLimiters