const Course = require('../../models/course')

exports.sendCourseInfo = async (req , res , next) => {

   

   try {

    const course = await Course.findOne({slug: req.params.slug});
        if(course)
            return res.json(course)
            return res.status(404).send();
   } catch (err) {
    res.status(500).json({
        status: "failed",
        msg: "خطای سمت سرور",
        err
    });
   }   
}