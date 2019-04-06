const http = require ('http');

const app = require('./app');

const server = http.createServer(app);

require('dotenv').config()


server.listen(
    process.env.PORT | 4000 ,
     (err)=> {
         if(err)
            console.log(err);
         else
            console.log('server started')
     });