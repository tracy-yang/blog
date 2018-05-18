var express = require('express');
var router = express.Router();
let Article = require('../controller/article')
let articles = require('../models/articles');
let util = require('../util/baseRes')
let mongoose = require('mongoose');

router.get('/',(req,res,next) => {
    Article.getNews().then(data => {
        res.render('article',{'data':data});
    }); 
})
router.post('/getNewsList',Article.getNewsList);
router.post('/addNews',Article.addNews);
router.get('/detail/:id',(req,res,next) =>{
    let oid = mongoose.Type.ObjectId(req.params);
    console.log(oid)
    articles.findById(oid,(err,data)=>{
        console.log('111111',data);
    })
    res.render('articleDetail');
})

module.exports = router;