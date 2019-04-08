const Course = require('../../models/course')
const validator = require('validator');


exports.submitNewCoursevalidate = async (req , res , next) => {

    let {title , content , slug , images , tag , price , type} = req.body;

    let err = {
         title: "" ,
         content: "", 
         slug: "", 
         images: "", 
         tag: "", 
         price: "",
         type: ""
    }

    if(validator.isEmpty(title))
        err.title = "فیلد عنوان رو پر کن ادمین جان";
       
    if(validator.isEmpty(content)) 
        err.content = "توضیحات دوره رو پر کن لطفا";

    if(validator.isEmpty(slug)) 
        err.slug = "آدرس دوره رو انتخاب نکردی مهندس";

    else {

      let result = await Course.findOne({slug});

      if(result) err.slug = "آدرس دوره قبلا استفاده شده فرزندم";
    }

    /* 
    
        If necessary images validation goes here 

    */

   if(validator.isEmpty(tag)) err.tag = "برای دوره تگ انتخاب کن";

   if(validator.isEmpty(price)) err.price = "واقعا یادت رفت قیمت رو وارد کنی؟ ";

   else if(price <= 1000) err.price = "لطفا مبلغ ورودی رو دوباره چک کن"


   if(err.title || err.content || err.slug || err.images || err.tag || err.price || err.type)
   return res.status(406).json({
    status: "Validation Failed",
    msg:"لطفا ورود های خود را کنترل کنید",
    err
})
    next();
}


exports.checkAdminAccess = async (req , res , next) => {
    if(req.user.access != 'admin')
        return res.status(403).json({
            status: "Access Denied",
            msg: "دسترسی فقط برای مدیران محدود شده"
        })
    
    next();
}

