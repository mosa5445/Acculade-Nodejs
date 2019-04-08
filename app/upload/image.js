const multer  = require('multer');
const mkdirp  = require('mkdirp');

const filestorage = multer.diskStorage({
    destination:( req, file , cb)=>{
        let year  = new Date.getFullYear();
        let month = new Date.getFullMonth();
        let day   = new Date.getFullDay();
        let dir = `../../uploads/images/${year}/${month}/${day}`
        mkdirp(dir , err => cb(null , dir));     
    } ,
    filename: ( req, file , cb)=>{
        cb(null , new Date().toISOString() + '-' + file.originalname)
    } ,
})

const fileFilter = (req , file , cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
        cb(null , true)

    cb(null , false)
}
 const fileLimits = {
    fileSize: 1024 * 1024 * 1
}
const upload = multer({
    storage: filestorage , 
    fileFilter: fileFilter,
    limits: fileLimits
})

module.exports = upload;



