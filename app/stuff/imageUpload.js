const multer = require('multer');
const mkdirp = require('mkdirp')

const getDirImage = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;

    return `./public/uploads/images/${year}/${month}`;
}


const ImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = getDirImage();

        mkdirp(dir, (err) => cb(null, dir))
    },
    filename: (req, file, cb) => {
        let filePath = getDirImage() + '/' + file.originalname;
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
})

const filterFile = (req, file, cb) => {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == "image/jpeg") {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}


const upload = multer({
    storage: ImageStorage,
    fileFilter: filterFile,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});

module.exports = upload;