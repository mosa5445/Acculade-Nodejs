const Course = require('../../models/course')

exports.handle = async (req, res, next) => {
    let page = req.body.page || 1;
    let courses = await Course.paginate({}, {
        page,
        sort: { createdAt: -1 },
        limit: 6,
        select: '_id title slug images content time viewCount commentCount type price'
    })
    res.json({ courses })
}