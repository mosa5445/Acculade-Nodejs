const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    token: {
        type: String,
        default: ''
    },
    access: {
        type: String,
        default: 'user'
    }
}, { timestamps: true, toJSON: { virtuals: true } })



userSchema.methods.hashPassword = async function (data) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data, salt);
    this.password = hash;
    return;
}

userSchema.methods.login = async function (user, input) {
    if (!bcrypt.compareSync(input, user))
        return false
    const access = this.access;
    const token = await jwt.sign({ id: this._id.toHexString(), access }, process.env.JSON_WEB_TOKEN_PRIVATE_KEY, { expiresIn: "1d" }).toString();
    this.token = token;
    this.save();
    return token;
}

userSchema.virtual('submitedCourses', {
    ref : 'courses',
    localField: '_id',
    foreignField: 'creator'
})

module.exports = mongoose.model('user', userSchema);