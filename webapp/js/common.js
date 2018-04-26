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
function  ajaxEvent(json,url,callback) {
    $.ajax({
        data:json,
        type:"post",
        url:url,
        async:false,
        success:function (data) {
            var json = strToJson(data);
            callback(json);
        },
        error:function () {}
    });
}