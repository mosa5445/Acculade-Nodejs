const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const courseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String , 
        required: true,
    },
    content:{
        type: String,
        required : true,
    },
    images:{
        type: Object
    },
    tag:{
        type: String,
    },
    time:{
        type: String,
        default : '00:00:00'
    },
    viewCount:{
        type: String,
        default: 0
    },
    commentCount:{
        type: String,
        default: 0
    },
    slug:{
        type: String,
        required : true,
    },
    type:{
        type: String,
        required : true,
    },
    price:{
        type : Number,
        default: 0
    },
},  {timestamps: true});

courseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('courses' , courseSchema);