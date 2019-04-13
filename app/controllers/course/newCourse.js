const Course = require('../../models/course');
const fs = require('fs')
const sharp = require('sharp');
exports.createNewCourse = async (req, res, next) => {
    try {
        let path;
        var images = { 480: '', 720: '', 1080: '' }
        if (req.file) {


            path = req.file.destination.substring(9);
            let size = [480, 720, 1080]

            for (let i = 0 , success = false; i < 3; i++) {               
                sharp(`${req.file.path}`)
                    .resize(null, size[i])
                    .toFile(`${req.file.destination}/${size[i]}-${req.file.filename}`)
                    images[size[i]] = `${path}/${size[i]}-${req.file.filename}`
            }
            path = req.file.path.substring(7)
        //    await fs.unlink(path, (err) => { console.log(err) })

        }
        let { slug, title, content, type, price, tag } = req.body;
        await new Course({
            slug,
            title,
            content,
            type,
            price,
            tag,
            images
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