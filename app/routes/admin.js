const express = require('express');
const router = express.Router();

//controllers
const newCourse = require('../controllers/courses/newCourse')

const deleteCourse = require('../controllers/courses/deleteCourse')
const editCourse = require('../controllers/courses/editCourse')

router.all('/', (req, res, next) => res.status(200).send())

router.post('/submit-new-course', newCourse.handle)


router.delete('/courses/remove', deleteCourse.handle)

router.put('/edit-course', editCourse.handle)



module.exports = router;