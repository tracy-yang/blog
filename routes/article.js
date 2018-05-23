var express = require('express');
var router = express.Router();
let Article = require('../controller/article')
let util = require('../util/baseRes');

router.get('/',(req,res,next) => {
    Article.getNews(1).then(data => {
        res.render('article',{data});
    }); 
})

router.get('/detail/:id',(req,res,next) =>{
    Article.getNewsDetailById(req.params.id).then(data =>{
        res.render('articleDetail',{data});
    })  
})
router.post('/detail',(req,res,next) =>{
    Article.getNewsDetailById(req.body.id).then(data =>{
        res.send(util.setResult(200,'查询列表成功',data));
    })
});

router.post('/getNewsList',Article.getNewsList);
router.post('/addNews',Article.addNews);
router.post('/editNews',Article.editNews)
router.post('/setStateById',Article.setStateById);

module.exports = router;