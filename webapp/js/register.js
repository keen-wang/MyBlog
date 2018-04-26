$(function () {
    $('[data-toggle="popover"]').popover();
    //校验输入正确性
    $("#inputName").on("blur",function () {
        checkname();
    });
    $("#inputEmail").on("blur",function () {
        checkemail();
    });
    $("#inputTell").on("blur",function () {
        checktell();
    });
    $("#inputAge");
    $("#inputAddress");
    $("#inputPassword").on("blur",function () {
        checkpassword1();
    });
    $("#inputPassword1").on("blur",function () {

        checkpassword2();
    });
    //注册按钮点击
    $("#register").on("click",function () {
        if(checkname()&&checkemail()&&checktell()&&checkpassword1()&&checkpassword2()){
            console.log("信息无误");
            //ajax提交数据到后台，实现注册
            var data = {
                username:$("#inputName").val(),
                pwd:$("#inputPassword").val(),
                email:$("#inputEmail").val(),
                tell:$("#inputTell").val()==""?null:$("#inputTell").val(),
                age:$("#inputAge").val()==""?null:$("#inputAge").val(),
                address:$("#inputAddress").val()==""?null:$("#inputAddress").val()
            }
            ajaxEvent(data,"/registaction",function (data) {
                console.log(data.result);
                if (data.result=="success"){
                    $(".warn-box").text("注册成功，正在自动跳转到登陆页面。");
                    $(".warn-box").slideDown();
                    setTimeout(function () {
                        $(".warn-box").slideUp();
                        window.location.href="../.html";
                    },2000);
                }
            });
            return;
        }
        console.log("信息有误");
    });
});


function checkname() {
    var value = $("#inputName").val();
    //是否为空校验
    if(value==null||value==undefined||value=="") {
        $(".warn-name").show().text("用户名不能为空！");
        return false;
    }
    // 校验长度
    if (value.length<3||value.length>9){
        $(".warn-name").show().text("用户名长度不符合要求！");
        return false;
    }
    // 用户名查重
    var flag= true;
    ajaxEvent({username:value},"/usernameaction",function (data) {
        if (data.desc!="0"){
            $(".warn-name").show().text("用户名已存在！");
            flag=false;
        }else{
            $(".warn-name").hide();
        }
    });
    return flag;
}
function  checkemail() {
    var value = $("#inputEmail").val();
    //是否为空校验
    if(value==null||value==undefined||value=="") {
        $(".warn-email").show().text("邮箱地址不能为空！");
        return false;
    }
    // 校验邮箱格式是否正确
    if(value.match("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")){
        $(".warn-email").hide();
    }else{
        $(".warn-email").show().text("输入邮箱格式错误！");
        return false;
    }
    return true;
}
function checktell() {
    var value = $("#inputTell").val();
    //是否为空校验
    if(value==null||value==undefined||value=="") {
        $(".warn-tell").hide();
        return false;
    }
    //校验号码格式
    if(value.match("^((/(/d{3}/))|(/d{3}/-))?13[0-9]/d{8}|15[89]/d{8}")||value.match("^(0[0-9]{2,3}/-)?([2-9][0-9]{6,7})+(/-[0-9]{1,4})?$")){
        $(".warn-tell").hide();
        return true;
    }else{
        $(".warn-tell").show().text("电话号码格式有误！");
        return false;
    }
}
function checkpassword1() {
    var value1= $("#inputPassword").val();
    //是否为空校验
    if(value1==null||value1==undefined||value1=="") {
        $(".warn-password1").show().text("密码不能为空！");
        return false;
    }
    $(".warn-password1").hide();
    return true;
}
function  checkpassword2() {

    var value1= $("#inputPassword").val();
    var value2= $("#inputPassword1").val();
    if(value2==null||value2==undefined||value2=="") {
        $(".warn-password2").show().text("密码不能为空！");
        return false;
    }
    if (value1==value2){
        $(".warn-password1").hide();
        $(".warn-password2").hide();
        return true;
    }else{
        $(".warn-password2").show().text("两次输入密码不一致！");
        return false;
    }

}