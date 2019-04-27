const Course = require('../../models/course')
const https = require('https')
exports.handle = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id)
        const episode = course.episodes[req.query.index]
        https.get(episode.url, async function (file) {
            res.set('Content-Disposition')
            res.attachment(`${episode.title}.mp4`);
            await file.pipe(res)
        });


    } catch (err) {
        res.status(400).json('some thing went wrong');
    }
}
/*
    http://localhost:4000/course/5cbb788dc775fa44046dbdc2/episode?index=0

    res.download(`public/${course.episodes[req.query.index].url}`)

    res.header('Content-Disposition', 'attachment; filename="new file name.pdf"');
*/