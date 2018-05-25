let user = require('../models/user');
let util = require('../util/baseRes');
let mongoose = require('mongoose');

class User{
    
    // 判断用户是否存在
    checkUserName(req,res){
        let userName = req.body.userName;
        return new Promise((resolve,reject) =>{
            article.findOne({'userName':userName},(err,data) =>{
                if(err) reject(err);
                resolve(data);
            })
        })
    }

    // 登陆
    login(req,res){
        try {
            let userName = req.body.userName?req.body.userName:'';
            console.log(req.body.password)
            let password = req.body.password?req.body.password:'';
            user.findOne({'userName':userName,'password': password},(err,data) =>{
                if(err)  throw err;                  
                console.log(data,3333);
                if(data){
                    res.send(util.setResult(200,'登陆成功',data));
                }else{
                    res.send(util.setResult(4006,'用户名密码错误'));  
                }   
            })
        } catch (error) {
            res.send(util.setResult(4006,'参数错误'));       
        }
        
    }

    // 注册
    register(req,res){
        checkUserName(req.body.userName).then(data =>{
            console.log(data);

        })
        let account = new user({
            userName:req.body.userName,
            password:req.body.password,
            nickName:req.body.userName,
            createTime:req.body.createTime,
            isDelete:0
        });

        // account.save((err,fluffy) =>{
        //     if(err) throw err;
        //     res.send(util.setResult(200,'插入成功'));
        // })


    }

}

module.exports = new User()