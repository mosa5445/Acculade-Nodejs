const jwt = require('jsonwebtoken')
const User = require('../../models/user')


exports.checkAdmin = async (req, res, next) => {
    const token = req.body.token;
    if (token) {
        try {
            const result = await jwt.verify(token, process.env.JSON_WEB_TOKEN_PRIVATE_KEY);
            let id = result.id;
            const user = await User.findById(id)

            if (user && user.access === 'admin') {


                next();
            }
            else
                return res.status(403).json({
                    status: 'Access Denied',
                    msg: 'شما اجازه دسترسی به این صفحه را ندارید'
                })
        } catch (err) {
            return res.status(401).json({
                status: "failed",
                msg: 'لطفا دوباره وارد سایت شوید',
                err: 'توکن کاربر منتقضی شده'
            })
        }
    }
    else {
        return res.status(401).json({
            status: "failed",
            msg: 'لطفا ابتدار وارد سایت شوید',
            err: 'کاربر به سایت وارد نشده است'
        })
    }
}