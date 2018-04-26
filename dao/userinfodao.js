"use strict";

const connection=require("./connection");
let conn=connection.conn;

function queryUserByName(name,callback){
    conn.query("select * from userinfo where name = ?",[name],function (err,results,fields) {
        callback(results);
    });
};
function insertUser(data,callback){
    console.log(data);
    let  array=[data.username,data.pwd,data.email,data.tell,data.age,data.address]
    conn.query("insert into userinfo (name,pwd,mail,telephone,age,address)values (?,?,?,?,?,?)",array,function (err,results,fields) {
        if (err){
            console.log("插入语句有误，"+err.message);
            callback("fault");
            return;
        }
        console.log("insert id:"+results);
        callback("success");
    });
}
module.exports={queryUserByName,insertUser};