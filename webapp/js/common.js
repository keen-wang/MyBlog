function strToJson(str){
    var json = (new Function("return " + str))();
    return json;
}
function paramToJson(str){
    let newstr = str;
    while(newstr.indexOf("=")>0){
        newstr = newstr.replace("=",":\"");
    }
    while(newstr.indexOf("&")>0){
        newstr = newstr.replace("&","\",")
    }
    var stringObj= "{" +newstr + "\"}";
    return stringObj;
}
//处理ajax
function  ajaxEvent(data,url,callback) {
    $.ajax({
        data:data,
        type:"post",
        url:url,
        async:false,
        success:function (data) {
            //将后台传来的字符串转化为json对象

            console.log(data);
            var json = strToJson(data);
            console.log(json);
            callback(json);
        },
        error:function () {}
    });
}