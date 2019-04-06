const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const  morgan = require('morgan')

const cookieParser = require('cookie-parser')


const multer = require('multer');


const cors  = require('cors')


//configuration

const filestorage = multer.diskStorage({
    destination:( req, file , cb)=>{
        cb(null , 'upload/images')
    } ,
    filename: ( req, file , cb)=>{
        cb(null , new Date().toISOString() + '-' + file.originalname)
    } ,
})

const fileFilter = (req , file , cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
        cb(null , true)

    cb(null , false)
}




//db
mongoose.connect(
    'mongodb://localhost:27017/acculade',
     {
         useNewUrlParser: true,
         useCreateIndex: true} , 
     (err)=> {
        if(err)
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
app.use(bodyParser.json());


// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));


app.use(cookieParser(`${process.env.COOCKIE_SIGN_PASSWORD}`));


app.use(multer({
    storage: filestorage , 
    fileFilter: fileFilter
})
    .single('image'))




    
//routes
app.use(require('./routes'));

//404
app.use((req , res , next)=>{
    res.status(404).json({
        msg: "not found"
    })
})


module.exports = app;

