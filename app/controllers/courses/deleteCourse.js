const fs = require('fs')
const Course = require('../../models/course')

exports.handle = async (req, res, next) => {
    try {
        let course = await Course.findById(req.body.id);
        if (!course)
            return res.status(402).send();
        await Object.values(course.images).forEach(image => fs.unlinkSync(`./public/${image}`))
        await Course.deleteOne(course);
        return res.json({
            status: "success",
            msg: "دوره با موفقیت پاک شد"
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            status: "failed",
            msg: "خطایی رخ داده",
            err
        })
    }
}