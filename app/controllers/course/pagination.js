const Course = require('../../models/course')

exports.handle = async (req, res, next) => {
    let page = req.body.page || 1;
    let courses = await Course.paginate({}, { page, sort: { updatedAt: -1 }, limit: 5 })

    res.json({ courses })
}