"use strict"

const blogdao=require("../dao/bloginfodao");

//获取用户的分类的列表
function initListCate(res,fields) {
    let json={};
    //查询所有分类
    blogdao.queryCategory(fields.userid,function (err,results1) {
        if(err) throw err;
        // 查询该用户所有博客
        blogdao.queryBlogList(fields.userid,null,function (err,results2) {
            if(err) throw err;
            // 查询分页数
            blogdao.queryBlogCount(fields.userid,null,function (err,results3) {
                if(err) throw err;
                //保存分类信息
                let cates=[];
                results1.forEach(function (result) {
                    cates[cates.length]={
                        cateid:result.id,
                        name:result.categoryname
                    }
                });
                json.cates=cates;
                //保存所有博客
                let blogs=[];
                results2.forEach(function (result) {
                    blogs[blogs.length]={
                        blogid:result.id,
                        title:result.title,
                        summary:result.summary
                    };
                });
                json.blogs=blogs;
                // 整理分页总数
                let count = results3[0].countBlogs;
                json.pageNum=Math.ceil(count/9);
                //返回数据到浏览器
                res.writeHead(200);
                res.end(JSON.stringify(json));
            });
        })
    });
}

module.exports={initListCate};