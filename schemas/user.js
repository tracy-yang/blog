let mongoose = require('mongoose');

let user = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    nickName:String,
    createTime:Date,
    isDelete:Number
})

module.exports = user;