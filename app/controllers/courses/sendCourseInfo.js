const Course = require('../../models/course')

exports.handle = async (req, res, next) => {
    try {

        const course = await Course.findOne({ slug: req.params.slug });
        
        if (course) {           
            course.viewCount ++;
            course.save();
            let mycourse = course
            mycourse.episodes.forEach((episode , index) => {
                episode.url = `${process.env.SERVER_ADDRESS}/course/${mycourse._id}/episode?index=${index}`
            });
            return res.json(mycourse)
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






