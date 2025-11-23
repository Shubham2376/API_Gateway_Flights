// Inside this file basic server configuration is present 
const express = require('express');
const {severconfig,logger} = require('./config');
const app = express();
const apiroutes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',apiroutes) // after /api whatever was written was handled by apiroutes
app.listen(severconfig.PORT,()=>{
    console.log(`Successfully started the server on port : ${severconfig.PORT}`);
    //logger.info("Successfully started the server",{});
})