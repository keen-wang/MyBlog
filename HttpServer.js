"use strict";

//引入模块
const http = require("http"),
    fs=require("fs"),
    pt=require("path"),
    url = require("url"),
    formidable = require("formidable"),
    userinfodao = require("./dao/userinfodao");
//创建服务器
const server = http.createServer(function (req,res) {
    let dir = req.url;
    console.log("发出请求"+dir);
    //用url模块的parse方法解析url,第二个参数true表示要将query转为json对象。
    let url_data = url.parse(dir,true);
    if (url_data.pathname=="/loginaction") {
        let form = new formidable.IncomingForm();
        //设置上传路径
        form.uploadDir="../upload";
        form.parse(req,function (err,fields,files) {
            //获取表单提交信息
            userinfodao.queryUserByName(fields.username,function (results) {
                if (results.length==0){
                    console.log("用户不存在");
                    res.writeHead(200);
                    res.end("{result:'fault',desc:'0'}");
                }else{
                    let result = results[0];
                    if (result.pwd===fields.password) {
                        console.log("登陆成功");
                        res.writeHead(200);
                        res.end("{result:'success',desc:'1',userid:"+result.id+"}");
                    }else{
                        console.log("用户名或密码错误");
                        res.writeHead(200);
                        res.end("{result:'fault',desc:'2'}");
                    }
                }
            });

        });
       res.end();
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