const User = require('../../models/user')


exports.registerProcess = async (req , res , next) => {
    const newUser = new User(req.body);
    await newUser.hashPassword(req.body.password);
  
        newUser.save((err)=> {
            if(err)
                res.status(500).json({
                    status: "failed",
                    msg : "خطا ی سمت سرور"
                });
            else
                res.status(201).json({
                    status: "success",
                    msg : "ثبت نام با موفقیت انجام شد"
                })
        });
}

exports.loginProcess = async (req , res , next) => {
   let user = await User.findOne({username : req.body.username});
   if(!user) user = await User.findOne({email : req.body.username});
   if(user) {
        const result = await User(user).login(user.password , req.body.password); // return false if password was incorrect and return token if it was correct
       
        if(result)
            {
               return res.json({
                    status:"success",
                    msg: "ورود موفق",
                    token: result
                })
            }
    }  
    res.status(422).send({
        status: "failed",
        msg: "اطلاعات وارد شده صحیح نمی باشد"
    })
}


exports.logoutProcess = async (req , res , next) => {
    try {
        const user  = await User.findOne({_id: req.user.id});
        user.token = "";
        user.save();
        return res.status(200).json({
            status: "success",
            msg: "کاربر با موفقیت خارج شد"
        })
         
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            msg: "خروج کاربر با خطا مواجه شد"
        })
    } 
 }