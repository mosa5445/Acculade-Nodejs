const express = require('express');
const router = express.Router();

//controllers
const newCourse = require('../controllers/course/newCourse')
const Courses = require('../controllers/course/course')

router.all('/' , (req , res , next) => res.status(200).send())

router.post('/submit-new-course', newCourse.createNewCourse)

router.post('/courses-info' , Courses.sendCoursesInfo )

router.delete('/courses/remove' , Courses.deleteCourse)

router.put('/edit-course', Courses.editCourse)

module.exports = router;