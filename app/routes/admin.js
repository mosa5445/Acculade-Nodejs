const express = require('express');
const router = express.Router();
const uploadImage = require('../stuff/imageUpload')

//controllers
const newCourse = require('../controllers/course/newCourse')
const Courses = require('../controllers/course/course')

router.post('/submit-new-course', newCourse.createNewCourse)

router.post('/courses-info' , Courses.sendCoursesInfo )

module.exports = router;