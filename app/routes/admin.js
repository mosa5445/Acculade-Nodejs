const express = require('express');
const router = express.Router();
const uploadImage = require('../stuff/imageUpload')

//controllers
const newCourse = require('../controllers/course/newCourse')

router.post('/submit-new-course', newCourse.createNewCourse)

module.exports = router;