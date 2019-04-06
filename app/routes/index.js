const express = require('express');
const routers = express.Router();


//controllers
const authentication = require('../controllers/authentication/authenticationController');
const passwordRecovery = require('../controllers/authentication/reset-password');
const newCourse = require('../controllers/course/newCourse')
const course = require('../controllers/course/course')


//middlewares
const authValidation = require('../middlewares/authentication/registerMiddleWare');
const userCheck = require('../middlewares/authentication/checkLoginMiddleWare');
const courseCheck = require('../middlewares/course/courseMW');

//routes
routers.post('/register' , userCheck.isLoggedin , authValidation.registerValidation ,authentication.registerProcess)

routers.post('/login' , userCheck.isLoggedin ,authentication.loginProcess)

routers.post('/reset-password' ,userCheck.isLoggedin , passwordRecovery.resetPassword)

routers.post('/reset-password-check/:token' ,userCheck.isLoggedin , passwordRecovery.resetPasswordCheck)

routers.post('/reset-password/:token' ,userCheck.isLoggedin , passwordRecovery.resetPasswordProcess)

routers.post('/logout' , userCheck.isAuthenticate , authentication.logoutProcess)

routers.post('/admin/submit-course' ,userCheck.isAuthenticate , courseCheck.checkAdminAccess ,courseCheck.submitNewCoursevalidate , newCourse.createNewCourse)

routers.post('/course/:slug' , course.sendCourseInfo)


module.exports = routers;