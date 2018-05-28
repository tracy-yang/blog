let mongoose = require('mongoose');

let message = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    state:Number,
    createTime:{
        type:Date,
        default:Date.now
    }
})

module.exports = message;