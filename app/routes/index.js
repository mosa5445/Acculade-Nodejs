const express = require('express');
const routers = express.Router();

//controllers
const authentication = require('../controllers/authentication/authenticationController');
const passwordRecovery = require('../controllers/authentication/reset-password');
const sendCourseInfo = require('../controllers/course/sendCourseInfo')

//middlewares
const authValidation = require('../middlewares/authentication/registerMiddleWare');
const userCheck = require('../middlewares/authentication/checkLoginMiddleWare');
const access = require('../middlewares/routes access/access')
const uploadImage = require('../stuff/imageUpload')


//admin routes
const admin = require('./admin')


//routes
routers.post('/register', userCheck.isLoggedin, authValidation.registerValidation, authentication.registerProcess)

routers.post('/login', userCheck.isLoggedin, authentication.loginProcess)

routers.post('/reset-password', userCheck.isLoggedin, passwordRecovery.resetPassword)

routers.post('/reset-password-check/:token', userCheck.isLoggedin, passwordRecovery.resetPasswordCheck)

routers.post('/reset-password/:token', userCheck.isLoggedin, passwordRecovery.resetPasswordProcess)

routers.post('/logout', userCheck.isAuthenticate, authentication.logoutProcess)

routers.get('/course/:slug', sendCourseInfo.handle)

routers.use('/admin', uploadImage.single('image') ,access.checkAdmin, admin)


module.exports = routers;