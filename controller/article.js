let articles = require('../models/articles');
let util = require('../util/baseRes');
let mongoose = require('mongoose');

class Article {
    // 接口
    getNewsList(req,res){
            let page = Number(req.body.page);
            let row = Number(req.body.row);
            let start = (row - 1)*page;
            let title = req.body.title?req.body.title:'';
            let createUser = req.body.createUser?req.body.createUser:'';
            let createTime = req.body.createTime?req.body.createTime:null;
            let state = req.body.state !==''?Number(req.body.state):'';  
            let baseQuery = {'title':{$regex:title},'createUser':{$regex:createUser}};
            if(state !== ''){
                Object.assign(baseQuery,{'state':state})
            }   
            if(createTime){
                let date = new Date(createTime);
                Object.assign(baseQuery,{'createTime':{$gte:date,$lt:new Date(date.getFullYear(),date.getMonth(),date.getDate()+1)}});
            }  
            let info = articles.find(baseQuery).limit(page).skip(start).sort({'createTime':-1});
            let count = articles.find(baseQuery);
            // 方法1：
            let result = new Promise((resolve,reject) =>{
                info.exec((err,data) =>{
                    if(err) throw err;
                    // resolve(data)
                    // 写在一个promise
                    count.count((err,total) =>{
                        resolve({'data':data,'total':total})
                    })
                })
            })
            

            result.then(data =>{
                res.send(util.setResult(200,'查询列表成功',data.data,util.pagination(page,row,data.total)));
                
                //写2个promise
                // return new Promise((resolve,reject) =>{
                //     info.count((err,total) =>{
                //         resolve({'data':data,'total':total})
                //     })
                // })
            })
            // 在抓一个then
            // .then(data =>{
            //     console.log(data)
            //     res.send(util.setResult(200,'查询列表成功',data.data,util.pagination(page,row,data.total)));
                
            // })

            
            // 方法2 报错不成功
            // let a = info.exec((err,doc) =>{
            //     if(err) throw err;
            // })
            // a.then(data =>{
            //     console.log(data);
            // })       
    }

    // 给ejs传递新闻列表
    getNews(state=0,page=10,row=1,){
        let list = [];
        let start = (row - 1)*page;
        let info = articles.find({'state':{$gte:state}}).limit(page).skip(start).sort({'createTime':-1});
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
            // console.log(title,content,createUser,state,createTime) 
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
                let err = info.validateSync(); 
                if(err){
                    throw err
                }
                info.save((err,fluffy) =>{
                    if(err) throw err;
                    console.log(fluffy);
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
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    // 根据ID改变state的状态
    setStateById(req,res){
        let oId = mongoose.Types.ObjectId(req.body.id);
        let state = req.body.state; 
        if(oId){
            articles.update({_id:oId},{$set:{state:state}},(err,data) =>{  // 该条update语句等价于：articles.where({_id:oId}).update({$set:{state:state}},(err,data)=>{})
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
        articles.update({_id:oId},{$set:{'title':title,'content':content,'createUser':createUser,'updateTime':updateTime}},(err,data) =>{
            if(data.nModified){
                res.send(util.setResult(200,'操作成功'));
            }
        }) 
    }
}

module.exports = new Article()

// module.exports = Article;




