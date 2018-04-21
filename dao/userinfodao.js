"use strict";
const mysql = require("mysql");;

 //获取mysql连接
const conn =mysql.createConnection({
   host:"127.0.0.1",
    user:"root",
    password:"root",
    database:"blogsystem"
});
conn.connect();

function queryUserByName(name,callback){
    conn.query("select * from userinfo where name = ?",[name],function (err,results,fields) {
        callback(results);
    });
};

module.exports={queryUserByName};