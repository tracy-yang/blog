let articles = require('../models/articles');
let util = require('../util/baseRes')

class Article {
    // 接口
    getNewsList(req,res){
            let page = Number(req.body.page) || 10;
            let row = Number(req.body.row) || 1;
            let start = (row - 1)*page;
            let list = null;
            let info = articles.find({}).limit(page).skip(start);
            // 方法1：
            let result = new Promise((resolve,reject) =>{
                info.exec((err,data) =>{
                    console.log(data);
                    if(err) throw err;
                    resolve(data);
                })
            })
            result.then(data =>{
                console.log(data);
                // res.send(util.setResult(200,'查询列表成功',data,util.pagination(page,row)));
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
    getNews(page=10,row=1){
        let list = [];
        let start = (row - 1)*page;
        let info = articles.find({}).limit(page).skip(start);
        let result = new Promise((resolve,reject) =>{
            info.exec((err,data) =>{
                if(err) throw err;
                resolve(data);
            })
        })
        return result;
    }

    // 新增新闻接口
    addNews(req,res){
        let info = new articles({
            title:'这是第四篇文章',
            content:'这是第四篇文章的内容发的咖啡机的卡了几分链接发的卡拉解放立刻搭街坊了大家发了打算减肥的',
            createUser:'test01',
            state:'1',
            createTime:'2018-5-17 18:00:00'
        })
        info.save((err,fluffy) =>{
            if(err) throw err;
            res.send(util.setResult(200,'插入成功'));
        })
    }

    // 根据ID查询新闻详情
    getNewsDetail(id){
        articles.findById(id,(err,data)=>{
            console.log(data);
        })
    }




}

module.exports = new Article()






