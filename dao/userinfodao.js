"use strict";
 const mysql = require("mysql");

 //获取mysql连接
const conn =mysql.createConnection({
   host:"127.0.0.1",
    user:"root",
    password:"root",
    database:"blog"
});
conn.connect();

function queryUserByName(name,callback){
    connection.query("select * from userinfo where name = ?",[name],);
};
