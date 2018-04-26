"use strict"

const connection=require("./connection");
let conn=connection.conn;

//查询分类信息
function queryCategory(userid,callback){
    conn.query("select * from category where userid = ?",[userid],function (err,results,fields) {
        callback(err,results);
    });
};
// 查询所有的博客列表数据
function queryBlogList(userid,cateid,callback){
    let sqlStr="select * from bloginfo where userid=?&&cateid=? limit 0,9";
    let data=[userid,cateid];
    if (cateid==undefined||cateid==null){
        sqlStr="select * from bloginfo where userid=? limit 0,9";
        data=[userid,cateid];
    }
    conn.query(sqlStr,data,function (err,results,fields) {
        callback(err,results);
    });
}
//查询博客总条数
function queryBlogCount(userid,cateid,callback) {
    let sqlStr="select count(*) countBlogs from bloginfo where userid=?&&cateid=? limit 0,9";
    let data=[userid,cateid];
    if (cateid==undefined||cateid==null){
        sqlStr="select count(*) countBlogs from bloginfo where userid=? limit 0,9";
        data=[userid,cateid];
    }
    conn.query(sqlStr,data,function (err,results,fields) {
        callback(err,results);
    });
}

module.exports={queryCategory,queryBlogList,queryBlogCount};