var express = require('express');
var router = express.Router();
let Article = require('../controller/article')

router.get('/',(req,res,next) => {
    res.render('article',{});
})
router.post('/getNewsList',Article.getNewsList);
router.post('/addNews',Article.addNews);

module.exports = router;