let message = require('../models/message');
let util = require('../util/baseRes');
let mongoose = require('mongoose');

class Message{
    // 获取所有留言
    getMessageList(state){
        try {
            let baseQuery = {}
            if(state){
                Object.assign(baseQuery,{'state':state});
            }
            return new Promise((resolve,reject) =>{
                message.find(baseQuery).sort({'createTime':-1}).exec((err,data)=>{
                   if(err) throw err;
                   resolve(data);
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
    // 新增留言
    addNewMessage(req,res){
        try {
            let userName = req.body.userName || '';
            let content = req.body.content || '';
            let state = req.body.state;
            let info = new message({
                userName:userName,
                content:content,
                state:state
            })
            let error = info.validateSync();
            if(!error){
                info.save((err,data) =>{
                    if(err) throw err;
                    res.send(util.setResult(200,'新增成功'));
                })
            }else{
                throw error;
            } 
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Message();