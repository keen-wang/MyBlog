$(function () {
    $("#submit").on("click",function () {
        console.log("点击提交")
        //获取表单数据
        var data=$("#login-form").serialize();
        console.log(data);
        //将表单数据转化为json
        var jsonstr = paramToJson(data);
        var json=strToJson(jsonstr);
        ajaxEvent(json,"/loginaction",function (data) {
            console.log(data);
            if (data.result==="success"){
                $(".warn-box").text("登陆成功！正在跳转页面。。。");
                $(".warn-box").slideDown();
                setTimeout(function () {
                    $(".warn-box").slideUp();
                    window.location.href("../bloglist");
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
                    },2000);
                }
            }
        });
    });
});