const express = require('express');
const routers = express.Router();
const mkdirp = require('mkdirp')

//controllers
const authentication = require('../controllers/authentication/authenticationController');
const passwordRecovery = require('../controllers/authentication/reset-password');
const newCourse = require('../controllers/course/newCourse')
const course = require('../controllers/course/course')

//middlewares
const authValidation = require('../middlewares/authentication/registerMiddleWare');
const userCheck = require('../middlewares/authentication/checkLoginMiddleWare');
const multer = require('multer');
const fs = require('fs');

const getDirImage = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();

    return `./public/uploads/images/${year}/${month}/${day}`;
}


const ImageStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        let dir = getDirImage();

        mkdirp(dir , (err) => cb(null , dir))
    },
    filename : (req , file , cb) => {
        let filePath = getDirImage() + '/' + file.originalname;
            cb(null ,  new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
            // new Date().toISOString().replace(':' , '_') + '-' + file.originalname
            // Date.now() + '-' + file.originalname
    }
})

const  filterFile = (req , file , cb) =>  {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == "image/jpeg")
       {
        cb(null , true)
       }
    else
    {
        cb(null , false)
    }
}


const upload = multer({
    storage : ImageStorage,
    fileFilter: filterFile,
    limits : {
        fileSize : 1024 * 1024 * 10
    }
});

//routes
routers.post('/register', userCheck.isLoggedin, authValidation.registerValidation, authentication.registerProcess)

routers.post('/login', userCheck.isLoggedin, authentication.loginProcess)

routers.post('/reset-password', userCheck.isLoggedin, passwordRecovery.resetPassword)

routers.post('/reset-password-check/:token', userCheck.isLoggedin, passwordRecovery.resetPasswordCheck)

routers.post('/reset-password/:token', userCheck.isLoggedin, passwordRecovery.resetPasswordProcess)

routers.post('/logout', userCheck.isAuthenticate, authentication.logoutProcess)

routers.post('/course/:slug', course.sendCourseInfo)

routers.post('/submit-new-course' , upload.single('image') , (req , res , next)=> {
    res.json({
        file: req.file
        
    })
})

module.exports = routers;