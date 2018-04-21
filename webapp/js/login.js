$(function () {
    $("#submit").on("click",function () {
        console.log("点击提交")
    //    获取表单数据
        var data=$("#login-form").serialize();
        console.log(data);
        //将表单数据转化为
        var jsonstr = paramToJson(data);
        var json=strToJson(jsonstr);
        console.log(json);
    });
});