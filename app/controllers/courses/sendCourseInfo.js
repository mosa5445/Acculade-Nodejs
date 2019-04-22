const Course = require('../../models/course')

exports.handle = async (req, res, next) => {
    try {

        const course = await Course.findOne({ slug: req.params.slug });
        
        if (course) {           
            course.viewCount ++;
            course.save();
            return res.json(course)
        }
        return res.status(404).send();
    } catch (err) {
        res.status(500).json({
            status: "failed",
            msg: "خطای سمت سرور",
            err
        });
    }
}






