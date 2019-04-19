const express = require('express');
const router = express.Router();

//controllers
const newCourse = require('../controllers/course/newCourse')
const pagination = require('../controllers/course/pagination')
const deleteCourse = require('../controllers/course/deleteCourse')
const editCourse = require('../controllers/course/editCourse')

router.all('/' , (req , res , next) => res.status(200).send())

router.post('/submit-new-course', newCourse.handle)

router.get('/courses-info' , pagination.handle )

router.delete('/courses/remove' , deleteCourse.handle)

router.put('/edit-course', editCourse.handle)

module.exports = router;