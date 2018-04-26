$(function () {
    $("#submit").on("click",function () {
        $(".warn-box").show();
        console.log("点击提交")
        //获取表单数据
        var data=$("#login-form").serialize();
        console.log(data);
        //将表单数据转化为json
        var jsonstr = paramToJson(data);
        var json=strToJson(jsonstr);
        //判断账号密码是否为空
        if(json.username==""||json.password==""){
            $(".warn-box").text("用户名和密码不能为空，请确认后重新提交！").slideDown(200);
            //定时消失
            setTimeout(function () {
                $("#waringbar").slideUp();
            },3000);
            return;
        }
        ajaxEvent(json,"/loginaction",function (data) {
            if (data.result==="success"){
                $(".warn-box").text("登陆成功！正在跳转页面。。。");
                $(".warn-box").slideDown();
                //本地存储中存入数据
                window.localStorage.setItem("username",json.username);
                window.localStorage.setItem("userid",data.userid);
                setTimeout(function () {
                    $(".warn-box").slideUp();
                    window.location.href="../bloglist.html";
                },2000);
            }else{
                if (data.desc=="0"){
                    $(".warn-box").text("用户名不存在，请重新输入！！！");
                    $(".warn-box").slideDown();
                    setTimeout(function () {
                        $(".warn-box").slideUp();
                    },2000);
                }else{
                    $(".warn-box").text("注意：用户名或密码错误！！！");
                    $(".warn-box").slideDown();
                    setTimeout(function () {
                        $(".warn-box").slideUp();
                    },3000);
                }
            }
        });
    });
});