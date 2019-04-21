const express = require('express');
const router = express.Router();

//controllers
const authentication = require('../controllers/authentication/authenticationController');
const passwordRecovery = require('../controllers/authentication/reset-password');
const sendCourseInfo = require('../controllers/courses/sendCourseInfo')
const pagination = require('../controllers/courses/pagination')

//middlewares
const authValidation = require('../middlewares/authentication/registerMiddleWare');
const userCheck = require('../middlewares/authentication/checkLoginMiddleWare');
const access = require('../middlewares/routes access/access')
const uploadImage = require('../stuff/imageUpload')


//admin routes
const admin = require('./admin')


//routes
router.post('/register', userCheck.isLoggedin, authValidation.registerValidation, authentication.registerProcess)

router.post('/login', userCheck.isLoggedin, authentication.loginProcess)

router.post('/reset-password', userCheck.isLoggedin, passwordRecovery.resetPassword)

router.post('/reset-password-check/:token', userCheck.isLoggedin, passwordRecovery.resetPasswordCheck)

router.post('/reset-password/:token', userCheck.isLoggedin, passwordRecovery.resetPasswordProcess)

router.post('/logout', userCheck.isAuthenticate, authentication.logoutProcess)

router.get('/courses-info' , pagination.handle )

router.get('/course/:slug', sendCourseInfo.handle)


router.use('/admin', uploadImage.single('image'), access.checkAdmin, admin)





const course = require('../models/course');
const user = require('../models/user');
router.get('/', async (req, res, next) => {

   /* let result = await course.findById('5cbb6e7b70e51d46ac2792a5')
      .populate({
         path: 'creator updator',
         select: 'username email name'
      })
      .exec(); */


   let result = await user.findById('5ca38ec94ac34633ec40b803')
      .populate(
         {
            path: 'submitedCourses',
            select: 'title slug type',
            options: {
               sort: {
                  updatedAt: -1
               }
            }
         })
      .exec();

   res.json(result);
})




module.exports = router;