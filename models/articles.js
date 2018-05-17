let mongoose = require('mongoose');
let article= require('../schemas/articles');

module.exports =  mongoose.model('articles',article);