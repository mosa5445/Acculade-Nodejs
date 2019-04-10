const Course = require('../../models/course');
const fs = require('fs')

exports.createNewCourse = async (req, res, next) => {
    try {
        let path;

        if (req.file) path = req.file.path;

        let { slug, title, content, type, price, tag } = req.body;
        await new Course({
            slug,
            title,
            content,
            type,
            price,
            tag,
            images: path
        }).save();
        return res.status(201).json({
            status: "succes",
            msg: "اطلاعات دوره جدید ثبت شد"
        })
    } catch (err) {
        if (req.file)
            fs.unlinkSync(req.file.path, (err) => { console.log(err) })

        return res.status(400).json({
            status: "failed",
            msg: "دوره جدید ایجاد نشد",
            err
        })
    }

}