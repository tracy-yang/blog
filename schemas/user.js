let mongoose = require('mongoose');

let user = new mongoose.Schema({
    id:String,
    userName:String,
    password:String,
    nickName:String
})

module.exports = user;