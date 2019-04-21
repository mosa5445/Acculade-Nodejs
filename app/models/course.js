const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
const courseSchema = new Schema({
    updator: [
        {
            type:  Schema.Types.ObjectId,      
            ref: 'user',      
        }
    ],
    creator :{
        type:  Schema.Types.ObjectId,      
        ref: 'user',      
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    images: {
        type: Object
    },
    tag: {
        type: String,
    },
    time: {
        type: String,
        default: '00:00:00'
    },
    viewCount: {
        type: String,
        default: 0
    },
    commentCount: {
        type: String,
        default: 0
    },
    slug: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0
    },
    episodes: 
        {
            type: Array,
            title: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            },
            hour :{
                type: Number,
                required: true
            },
            min: {
                type: Number,
                required: true
            },
            sec : {
                type: Number,
                required: true
            },
            preview :{
                type: Boolean,
                default: false
                
            }
        }
    
}, { timestamps: true });

courseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('courses', courseSchema);