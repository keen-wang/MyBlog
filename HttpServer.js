"use strict";

//引入模块
const http = require("http"),
    fs=require("fs"),
    pt=require("path"),
    url = require("url"),
    querystring=require("querystring");
//创建服务器
const server = http.createServer(function (req,res) {
    let dir = req.url;
    console.log("发出请求"+dir);
    //用url模块的parse方法解析url,第二个参数true表示要将query转为json对象。
    let url_data = url.parse(dir,true);
    if (url_data.pathname=="/logincheck") {
        //    判断表单提交方式method
        if(req.method=="GET"){//get方式接收数据
            //获取表单提交的账号密码
            let username = url_data.query.username;
            let password=url_data.query.password;
            //登录验证
            if(username=="admin"&&password=="admin"){
                res.writeHead(200,{"Content-Typr":"text/html;charset:utf-8"});
                res.write("登陆成功！");
            }else{
                res.writeHead(200,{"Content-Typr":"text/html;charset:utf-8"});
                res.write("登陆失败！");
            }
            //响应结束
            res.end();
        }else{//post方式接收数据
            //post请求参数不会在url中体现，需要通过后台监听方式获取
            // 实现方式，通过添加data和end监听来实现query参数获取
            let query_data="";
            req.addListener("data",function (chunk) {
                let data = querystring.parse(chunk.toString());
                //获取表单提交的账号密码
                let username = data.username;
                let password = data.password;
                //登录验证
                if(username=="admin"&&password=="admin"){
                    res.writeHead(200,{"Content-Typr":"text/html;charset:utf-8"});
                    res.write("登陆成功！");
                }else{
                    res.writeHead(200,{"Content-Typr":"text/html;charset:utf-8"});
                    res.write("登陆失败！");
                }
                //响应结束
                res.end();

            });
        }
    } else{
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