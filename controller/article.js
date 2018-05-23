let articles = require('../models/articles');
let util = require('../util/baseRes');
let mongoose = require('mongoose');
let assert = require('assert');

class Article {
    // 接口
    getNewsList(req,res){
            let page = Number(req.body.page) || 10;
            let row = Number(req.body.row) || 1;
            let start = (row - 1)*page;
            let state = req.body.state?Number(req.body.state):null;
            let list = null;
            let info ;
            if(state === null){
                info = articles.find({}).limit(page).skip(start).sort({'createTime':-1});
            }else{
                info = articles.find({'state':state}).limit(page).skip(start).sort({'createTime':-1});
            }
            // 方法1：
            let result = new Promise((resolve,reject) =>{
                info.exec((err,data) =>{
                    if(err) throw err;
                    resolve(data);
                })
            })
            result.then(data =>{
                res.send(util.setResult(200,'查询列表成功',data,util.pagination(page,row)));
            })

            // 方法2 报错不成功
            // let a = info.exec((err,doc) =>{
            //     if(err) throw err;
            // })
            // a.then(data =>{
            //     console.log(data);
            // })       
    }

    // 给ejs传递新闻列表
    getNews(state=null,page=10,row=1,){
        let list = [];
        let start = (row - 1)*page;
        let info;
        if(state === null){
            info = articles.find({}).limit(page).skip(start).sort({'createTime':-1});
        }else{
            info = articles.find({'state':state}).limit(page).skip(start).sort({'createTime':-1});
        }
        return new Promise((resolve,reject) =>{
            info.exec((err,data) =>{
                if(err) reject(err);
                resolve(data);
            })
        })
    }

    // 新增新闻接口
    addNews(req,res){
        try {
            let title = req.body.title;
            let content = req.body.content;
            let createUser  = req.body.createUser;
            let state = req.body.state;
            let createTime = req.body.createTime;   
            // if(title === '' || content === ''  ){
            //     res.send(util.setResult(4006,'参数错误'));
            // } else{
                let info = new articles({
                    title:title,
                    content:content,
                    createUser:createUser,
                    state:state,
                    createTime:createTime
                })
                throw info.validateSync(); 
                info.save((err,fluffy) =>{
                    if(err) throw err;
                    res.send(util.setResult(200,'插入成功'));
                })
            // }       
        } catch (error) {
            res.send(util.setResult(4006,'参数错误'));
            console.log(error.errors['title'].message);
            
        }
    }

    // 根据ID查询新闻详情
    getNewsDetailById(id){
        let oId = mongoose.Types.ObjectId(id); // 转换成Object类型
        return new Promise((resolve,reject) =>{
            articles.findById({_id: oId},(err,data)=>{
                console.log(1111111,data)
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    // 根据ID改变state的状态
    setStateById(req,res){
        let oId = mongoose.Types.ObjectId(req.body.id);
        let state = req.body.state;
        console.log(state)
        if(oId){
            articles.where({_id:oId}).update({$set:{state:state}},(err,data) =>{
                if(data.nModified){
                    res.send(util.setResult(200,'操作成功'));
                }
            })
        }
    }

    // 编辑新闻详情
    editNews(req,res){
        let oId = mongoose.Types.ObjectId(req.body.id);
        let title = req.body.title;
        let content = req.body.content;
        let createUser  = req.body.createUser;
        let updateTime = req.body.updateTime;
        console.log(oId,title,content,createUser,updateTime);
        articles.where({_id:oId}).update({'title':title},{$set:{"content":content}},(err,data) =>{
            console.log(data);
            if(data.nModified){
                res.send(util.setResult(200,'操作成功'));
            }
        }) 
    }
}

module.exports = new Article()






