var express = require('express');
var router = express.Router();
let Message = require('../controller/message')
let util = require('../util/baseRes');

router.get('/',(req,res,next) => {
    Message.getMessageList(1).then(data =>{
        res.render('message',{data})
    })
})
// 获取所有留言信息
router.post('/getMessageList',(req,res,next)=>{
    let state = req.body.state || null;
    Message.getMessageList(state).then(data =>{
        res.render('message',{data})
        res.send(util.setResult(200,'查询列表成功',data));
    })
})
// 新增
router.post('/addNewMessage',Message.addNewMessage)

module.exports = router;