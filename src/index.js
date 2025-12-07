// Inside this file basic server configuration is present 
const express = require('express');
const {severconfig,logger} = require('./config');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 30, // Limit each IP to 2 requests per `window` (here, per 15 minutes).
})

const apiroutes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/flightService',createProxyMiddleware({
    target:severconfig.FLIGHT_SERVICE,
    changeOrigin:true,
    pathRewrite: {'^/flightService':'/'}
}))
app.use('/bookingService',createProxyMiddleware({
    target:severconfig.BOOKING_SERVICE,
    changeOrigin:true,
    pathRewrite: {'^/bookingService':'/'}
}))
app.use(limiter)

app.use('/api',apiroutes) // after /api whatever was written was handled by apiroutes
app.listen(severconfig.PORT,()=>{
    console.log(`Successfully started the server on port : ${severconfig.PORT}`);
    //logger.info("Successfully started the server",{});
})