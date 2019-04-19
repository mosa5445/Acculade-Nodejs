const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const morgan = require('morgan')

const cors = require('cors')



//db
mongoose.connect(
    'mongodb://localhost:27017/acculade',
    {
        useNewUrlParser: true,
        useCreateIndex: true
    },
    (err) => {
        if (err)
            console.log(err);
        else
            console.log('DB Connected');
    });



//middleware


app.use(cors());
/*
app.use((req , res , next)=>{
    res.setHeader('Access-Control-Allow-Origin' , '*')
    res.setHeader('Access-Control-Allow-Methods' , 'GET , POST , PUT , PATCH , DELETE')
    res.setHeader('Access-Control-Allow-Headers' , 'Content-Type , Authorization')
    next();
})
*/
app.use(express.static('public'));

app.use(bodyParser.json());

// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));

//token handler
app.use((req, res, next) => {
    let token = req.get('token')
    if (token) {
        req.body.token = token;
    }
    // console.log('token' , token ,'\n\n', 'req.body.token' , req.body.token)
    next();
})

//routes
app.use(require('./routes'));

//404
app.use((req, res, next) => {
    res.status(404).json({
        msg: "not found"
    })
})

// //500
// app.use((err ,req, res, next) => {
//     res.status(500).json({
//         msg: "internal server error",
//         err
//     })
// })


module.exports = app;

