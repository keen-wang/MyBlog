"use strict";

//引入模块
const http = require("http"),
    fs=require("fs"),
    pt=require("path"),
    url = require("url"),
    formidable = require("formidable"),
    userctrl = require("./control/usercontrol.js"),
    blogctrl = require("./control/blogcontrol.js");
//创建服务器
const server = http.createServer(function (req,res) {
    let dir = req.url;
    console.log("发出请求"+dir);
    //用url模块的parse方法解析url,第二个参数true表示要将query转为json对象。
    let url_data = url.parse(dir,true);
    if(url_data.pathname=="/initlistaction"){
        let form = new formidable.IncomingForm();
        form.parse(req,function (err,fields,files) {
            // 获取博客列表信息
            blogctrl.initListCate(res,fields);
        });
    }else if(url_data.pathname=="/loginaction") {
        let form = new formidable.IncomingForm();
        //设置上传路径
        form.uploadDir="../upload";
        form.parse(req,function (err,fields,files) {
            //获取表单提交信息并做校验
            userctrl.loginCheck(res,fields);
        });
    }else if (url_data.pathname=="/usernameaction"){
        let form = new formidable.IncomingForm();
        form.parse(req,function (err,fields,files) {
            //获取表单提交信息并做校验
            userctrl.loginCheck(res,fields);
        });
    }else if (url_data.pathname=="/registaction"){
        let form = new formidable.IncomingForm();
        form.parse(req,function (err,fields,files) {
            //将用户信息保存到数据库中，完成注册
            userctrl.addUser(res,fields);
            console.log(fields);
        });
    }  else{
        //读取服务器静态资源
        readFile(res,pt.join(__dirname,"webapp"+dir));

    }
});
//启动服务器
server.listen(9090,function (err) {
    if(err) throw err;
    console.log("服务器创建成功");
});

function  readFile(res,dir) {
    fs.readFile(dir,function (err,data) {
        if (err){
            res.writeHead(500,{"Content-type":"text/html;charset=utf-8"});
            res.write("服务器读取文件错误！");
            res.end();
        }else{
            res.write(data);
            res.end();
        }
    });
}