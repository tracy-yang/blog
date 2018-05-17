let mongoose = require('mongoose');

let article = new mongoose.Schema({
    title:String,
    content:String,
    createUser:String,
    state:Number,
    createTime:Date,
    updateTime:Date
})

module.exports = article;