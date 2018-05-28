let mongoose = require('mongoose');
let messageSchema= require('../schemas/message');

module.exports =  mongoose.model('messages',messageSchema); 