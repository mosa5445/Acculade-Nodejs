const Course = require('../../models/course')

exports.sendCourseInfo = async (req, res, next) => {
    try {

        const course = await Course.findOne({ slug: req.params.slug });
        if (course)
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

// send add courses info
exports.sendCoursesInfo = async (req, res, next) => {
    let page = req.body.page || 1 ;
    let courses = await Course.paginate({}, {page, sort: { updatedAt: -1 }, limit: 5 })

    res.json({ courses })
}
