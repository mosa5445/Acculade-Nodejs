
const jwt = require('jsonwebtoken')


// دسترسی را برای کاربرای لوگین نشده محدود می کند
exports.isAuthenticate = async (req, res, next) => {

    const token = req.body.token;
    if (token) {
        try {
            const user = await jwt.verify(token, process.env.JSON_WEB_TOKEN_PRIVATE_KEY);
            req.user = user;
            return next()

        } catch (err) {

            return res.status(401).clearCookie('usertoken').json({
                status: "Refresh Login Needed",
                msg: "لطفا دوباره وارد سایت شوید"
            })
        }
    }

    res.status(404).json({
        status: "Login Needed",
        msg: "لطفا  وارد سایت شوید"
    })

}


// دسترسی را برای کاربران وارد شده محدود میکند
exports.isLoggedin = async (req, res, next) => {

    const token = req.body.token;
    if (token) {
        try {
            await jwt.verify(token, process.env.JSON_WEB_TOKEN_PRIVATE_KEY);
            return res.status(404).json({
                status: "Access Denied",
                mag: "کاربر دارای توکن می باشد و اجازه دسترسی به این  را ندارد"
            })
        } catch (err) {
            return res.status(422).json({
                status: "Token Expired",
                msg: "کاربر توکن دارد ولی منقضی شده و نیاز به ورود مجدد است"
            })
        }
    }
    next();
}