"use strict"

const mysql=require("mysql");

//获取mysql连接
const conn =mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"root",
    database:"blogsystem"
});
conn.connect();

module.exports={conn};