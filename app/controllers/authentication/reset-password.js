const jwt = require('jsonwebtoken');
const User = require('../../models/user')
const nodemailer = require("nodemailer");



exports.resetPassword = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).json({
            status: "Not Found",
            msg: "هیچ کاربری با این ایمیل در سایت وجود ندارد"
        })
    }

    const token = jwt.sign({ email: user.email }, process.env.RESET_PASSWORD_TOKEN, { expiresIn: 300 }).toString();
    user.token = token;
    user.save();
    // Send recovery link to the user email code goas here
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        secure: false,
        auth: {
            user: "121c4121b7a0d6",
            pass: "e105eb93108c83"
        }
    });

    let mailOptions = {
        from: '"پستچی آکولاد" <no-reply@acculade.ir>', // sender address
        to: `${req.body.email}`, // list of receivers
        subject: "پستچی آکولاد - بازیابی رمز عبور ✔🔑",
        // text: "Hello world?", 
        html: `
    <style>
    .card {
        width: 100%;
        background-color: #f5f5f5;
        border-radius: 10px;
        overflow: hidden;
        text-align: right;                 
        font-family: Tahoma, sans-serif,  'Segoe UI',  Geneva, Verdana !important;
    }
    .card-header {
        width: 100%;
        background-color: #E0E0E0;
        padding: 10px;
        text-align: center;
        margin-bottom: 30px;
    }
    .card-content {
        width: 100%;
        padding: 10px;
    }
    .card-footer {
        width: 100%;
        background-color: #BDBDBD;
        text-align: center;
        font-size: 0.8rem;
        padding: 10px;
        margin-top: 30px;
    }
    .btn {
        text-decoration: none;
        padding: 5px;
        border: 1px solid #263238;
        border-radius: 5px;
        background: none;
        color: #263238;
        transition: all 0.2s;
    }
    .btn:hover {
        background-color: #263238;
        color: #fff;
    }
        </style>
        <div class="card">
        <div class="card-header"><h3>پستچی آکولاد - فراموشی رمز عبور</h3></div>
        <div class="card-content">
        <p>
        اقا سلام علیکم ، یه بنده خدایی (شایدم خود حضرت عالی) درخواست بازیابی رمز عبورش رو کرده ، برای عوض کردن رمز ورودی روی لینک زیر کلیک کن ، اگر هم شما نبودی که این ایمیل رو نادیده بگیر و به زندگیت برس ، و من الله توفیق 😅
        </p>
        <a class="btn" href="localhost:8080/reset-password/${token}">برای تغییر رمز عبور کلیک کن</a>
        </div>
        <div class="card-footer"><strong>این ایمیل به صورت خودکار و به درخواست شما از طرف آکولاد ارسال شده است</strong></div>
        </div>
    
    `
    };

    // send mail with defined transport object
    try {
        let info = await transporter.sendMail(mailOptions)
    } catch (err) {
        return res.status(500).json({
            status: "failed",
            mas: "cant send email"
        })
    }


    res.status(201).json({
        status: "success",
        msg: "لینک بازیابی رمز عبور به ایمیل شما ارسال شد ، لطفا پوشه اسپم را نیز کنترل کنید", // msg: "Token Created",
        token: token
    })
}


exports.resetPasswordCheck = async (req, res, next) => {
    const token = req.params.token;
    try {
        const info = await jwt.verify(token, process.env.RESET_PASSWORD_TOKEN);
        const user = await User.findOne({ email: info.email })
        if (user.token == token)
            return res.status(200).send();

    } catch (err) {
        return res.status(404).json({
            status: "Token Expired",
            msg: "لینک باز یابی رمز عبور شما منقضی شده ، لطفا دوباره همین پروسه را طی کنید"
        })
    }
    return res.status(404).json({
        status: "Token Expired",
        msg: "لینک باز یابی رمز عبور شما منقضی شده ، لطفا دوباره همین پروسه را طی کنید"
    }) 
}
exports.resetPasswordProcess = async (req, res, next) => {

    const token = req.params.token;
    try {

        const info = await jwt.verify(token, process.env.RESET_PASSWORD_TOKEN);
        const user = await User.findOne({ email: info.email })
        if (token === user.token) {

            if (req.body.password.length < 8 || req.body.password.length > 16)
                return res.status(400).json({
                    status: "failed",
                    msg: { password: "طول رمز انتخابی باید بین 8 تا 16 باشد" }
                })


            user.hashPassword(req.body.password);
            user.token = "";
            user.save();



            return res.status(200).json({
                status: "success",
                msg: "پسورد با موفقیت تغییر کرد"
            })


        }
    } catch (err) {


        return res.status(404).json({
            status: "Token Expired",
            msg: "لینک باز یابی رمز عبور شما منقضی شده ، لطفا دوباره همین پروسه را طی کنید"
        })


    }
    res.status(404).json({
        status: "Not Found",
        msg: "توکن بازیابی رمز عبور صحیح نیست"
    })
}
