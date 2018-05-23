let mongoose = require('mongoose');

let article = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'标题为必填项']
    },
    content:{
        type:String,
        required:[true,'内容为必填项']
    },
    createUser:String,
    state:Number,
    createTime:Date,
    updateTime:Date
})

module.exports = article;