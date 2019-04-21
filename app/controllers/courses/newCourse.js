const Course = require('../../models/course');
const fs = require('fs')
const sharp = require('sharp');

exports.handle = async (req, res, next) => {

    let { slug, title, content, type, price, tag, episodes , time} = req.body;

    episodes = JSON.parse(episodes)

    //check for double slug
    const result = await Course.findOne({ slug })
    if (result) {
        fs.unlinkSync(`./${req.file.path}`)
        return res.status(400).json({
            status: "failed",
            msg: "ادرس دوره قبلا قبت شده",
            err: "این ادرس قبلا برای دوره ی دیگری به ثبت رسیده است ، لطفا ادرس دیگری انتخاب کنید"
        })
    }

    //generate defferent sizes from original image
    try {
        let path;
        var images;
        if (req.file) {
            path = req.file.destination.substring(9);
            images = { 480: '', 720: '', 1080: '', original: `${path}/${req.file.filename}` }
            let size = [480, 720, 1080]

            for (let i = 0, success = false; i < 3; i++) {
                sharp(`${req.file.path}`)
                    .resize(null, size[i])
                    .toFile(`${req.file.destination}/${size[i]}-${req.file.filename}`)
                images[size[i]] = `${path}/${size[i]}-${req.file.filename}`
            }
            path = req.file.path.substring(7)
        }

        //save course
        new Course({
            slug,
            title,
            content,
            type,
            price,
            tag,
            time,
            images,
            episodes,
            creator : req.userId
        }).save().then();
        return res.status(201).json({
            status: "succes",
            msg: "اطلاعات دوره جدید ثبت شد"
        })

    } catch (err) {
        if (req.file)
            // fs.unlinkSync(`./${req.file.path}`)

            return res.status(400).json({
                status: "failed",
                msg: "دوره جدید ایجاد نشد",
                err
            })
    }

}