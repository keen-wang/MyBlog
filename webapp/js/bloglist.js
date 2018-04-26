$(function () {
   // 加载用户名到导航栏上
    $("#nav-username").html("<span class='glyphicon glyphicon-user'></span> " +
        window.localStorage.getItem("username")+" <b class='caret'></b>");
    // 加载页面博客数据
    var userid = window.localStorage.getItem("userid");
    ajaxEvent({userid},"/initlistaction",function (data) {
        console.log(data);
        data.cates.forEach(function (data) {
            $("#category-nav").append("<li><a href=\'#\'>"+data.name+"</a></li>");
        });
        data.blogs.forEach(function (data) {
            $("#blog-list").append('<div class="thumbnail " ><div class="caption" id="blog'+data.blogid+'"> <h3><a href="#">'+data.title+'</a></h3> <p class="summary">'+data.summary+'</p> <p> <a href="#" class="btn btn-primary" role="button"> 编辑 </a> <a href="#" class="btn btn-warning" role="button"> 删除 </a> <a href="#" class="favorite_add"> <img src="./image/favorites_add.png" alt="点击添加到星标博客" title="点击添加到星标博客"> </a> </p> </div> </div>');
        });
        //初始化页码栏
        var html='<ul class="pagination" id="page-ul"><li><a href="#">&laquo;</a></li>';
        for (var i=0;i<data.pageNum;i++){
            html+='<li><a href="#">'+(i+1)+'</a></li>';
        }
        $("#pagebox").append(html+'<li><a href="#">&raquo;</a></li></ul>');
    });
});