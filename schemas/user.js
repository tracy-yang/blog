let mongoose = require('mongoose');

let user = new mongoose.Schema({
    userName:String,
    password:String,
    nickName:String,
    createTime:Date,
    isDelete:Number
})

module.exports = user;