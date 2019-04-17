const Course = require('../../models/course')
const fs = require('fs')
const sharp = require('sharp')

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
    let page = req.body.page || 1;
    let courses = await Course.paginate({}, { page, sort: { updatedAt: -1 }, limit: 5 })

    res.json({ courses })
}


exports.deleteCourse = async (req, res, next) => {
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
        return res.status(400).json({
            status: "failed",
            msg: "خطایی رخ داده",
            err
        })
    }
}

exports.editCourse = async (req, res, next) => {
    try {
        const { id, slug, title, content, type, price, tag } = req.body;

        let course = await Course.findById(id);

        // search for double slug
        const result = await Course.findOne({ slug })


        if (result && result.slug != slug) {

            //remove uploaded picture if double slug found
            if (req.file)
                fs.unlinkSync(`./${req.file.path}`)

            return res.status(400).json({
                status: "failed",
                msg: "ادرس دوره قبلا قبت شده",
                err: "این ادرس قبلا برای دوره ی دیگری به ثبت رسیده است ، لطفا ادرس دیگری انتخاب کنید"
            })
        }

        if (req.file) {
            var path;
            var images;
            if (req.file) {
                path = req.file.destination.substring(9);
                //generate defferent sizes from original image 
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
            //Delete old images
            Object.values(course.images).forEach(image => fs.unlinkSync(`./public/${image}`))
        }

        if (req.file) course.images = images;
        if (type == 'sale') course.price = price;
        else course.price = 0
        course.slug = slug
        course.title = title
        course.content = content
        course.type = type

        course.tag = tag
        await course.save();
        return res.json({
            status: "success",
            msg: "دوره با موفقیت ویرایش شد"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "failed",
            msg: "مشکلی در روند ویرایش به وجود امد",
            err
        })
    }
}