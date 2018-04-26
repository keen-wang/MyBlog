"use strict";

const userinfodao = require("../dao/userinfodao");
function  loginCheck(res,fields){
    userinfodao.queryUserByName(fields.username,function(results) {
        if (results.length==0){
            res.writeHead(200);
            res.end("{result:'fault',desc:'0'}");
        }else{
            let result = results[0];
            if (result.pwd===fields.password) {
                res.writeHead(200);
                res.end("{result:'success',desc:'1',userid:'"+result.id+"'}");
            }else{
                res.writeHead(200);
                res.end("{result:'fault',desc:'2'}");
            }
        }
    });
}
function registCheck(res,fields){
    userinfodao.queryUserByName(fields.username,function(results){
        if (results.length==0){
            console.log("用户不存在");
            res.writeHead(200);
            res.end("{result:'success'}");
        }else{

        }
    });
}
function addUser(res,fields){
    userinfodao.insertUser(fields,function (result) {
        if (result=="success"){
            res.writeHead(200);
            res.end("{result:'success'}");
        }else{
            res.writeHead(200);
            res.end("{result:'fault'}");
        }
    });
}
module.exports={loginCheck,registCheck,addUser};