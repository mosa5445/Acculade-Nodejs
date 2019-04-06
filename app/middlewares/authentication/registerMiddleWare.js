const validator = require('validator');
const User = require('../../models/user')

exports.registerValidation = async (req , res , next) => {

    let err = []
    ;
    //Name Validation

    if(validator.isEmpty(req.body.name))
        err.push('فیلد نام نباید خالی باشد');
    //Email Validation

    if(validator.isEmpty(req.body.email))
        err.push('فیلد ایمیل نباید خالی باشد');

    else if(!validator.isEmail(req.body.email))
        err.push('ایمیل نامعتبر');

    else {
        let result = await User.findOne({email : req.body.email});

        if(result)
            err.push('این ایمیل قبلا ثبت نام کرده است')
    }


    //username Validation

    if(validator.isEmpty(req.body.username))
        err.push('فیلد نام کاربری نباید خالی باشد')

    else {
        result = await User.findOne({username : req.body.username});
    
        if(result)
            err.push('این نام کاربری توسط کاربر دیگری استفاده شده است')
    }    


    //password Validation

    if(validator.isEmpty(req.body.password))
        err.push('فیلد رمز عبور نباید خالی باشد')

    else if(!validator.isLength(req.body.password , {min:8 , max: 16}))
        err.push('طول رمز عبور انتخابی باید حداقل 8 و حداکثر 16 باشد')

    if(err.length)
       return res.status(406).json({
            status : "Validation Failed",
            msg:"لطفا ورودی های خود را کنترل کنید",
            err
        })
    next();
}