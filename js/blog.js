var baseurl="http://112.74.60.134:81/",
nickname;
layui.use(['element','jquery'], function(){
    var $ = layui.jquery
  ,element = layui.element;
});
$(function(){
    findArcitle();
    $("#carticleName").change(function(){
        if($("#carticleName").val() === ""){
            $("#marticleName").html('文章标题不能为空')
            $("#marticleName").css('color','red')
            $("#btnPublish").attr('disabled', true)
        }else{
            $("#marticleName").html('')
            $("#btnPublish").attr('disabled', false)
        }
    })
    $("#carticleContent").change(function(){
        if($("#carticleContent").val() === ""){
            $("#marticleContent").html('文章标题不能为空')
            $("#marticleContent").css('color','red')
            $("#btnPublish").attr('disabled', true)
        }else{
            $("#marticleContent").html('')
            $("#btnPublish").attr('disabled', false)
        }
    })
})
$('#modal-publish').on('show.bs.modal', function () {
    findType();
});
$('#modal-publish').on('hidden.bs.modal', function (){
    $(".modal-body input").val('');
    $(".modal-body textarea").val('');
    $(".modal-body span").html('');
});
function findArcitle(){
    $.ajax({
        type:"get",
        url:baseurl+'api/Article/GetArticle?',
        data:{
            "articleType":"新鲜趣事"
        },
        dataType: "json",
        success:function(data){
            if(data != ""){
              var dataObj = data, 
              con = "";
              $.each(dataObj,function(index,item){
                  con += "<li class='layui-timeline-item'><i class='layui-icon layui-timeline-axis'>&#xe63f;</i><div class='layui-timeline-content layui-text'><h2>"+ item.articleDate +"</h2><h3 style='color:black;'>这是一条来自&nbsp;<b>"+ item.articleUser +"</b>&nbsp;的：<b>" + item.articleName + "</b></h3><p>"+ item.articleContent +"</p></div></li>"
              })
              $("#new").html(con)
            }else{
              $("#new").html('暂时没东西呢，快去发布内容吧')
            }
        }
    })
};
$("#news").click(function(){
    $.ajax({
        type:"get",
        url:baseurl+'api/Article/GetArticle?',
        data:{
            "articleType":"新鲜趣事"
        },
        dataType: "json",
        success:function(data){
            if(data != ""){
              var dataObj = data, 
              con = "";
              $.each(dataObj,function(index,item){
                  con += "<li class='layui-timeline-item'><i class='layui-icon layui-timeline-axis'>&#xe63f;</i><div class='layui-timeline-content layui-text'><h2>"+ item.articleDate +"</h2><h3 style='color:black;'>这是一条来自&nbsp;<b>"+ item.articleUser +"</b>&nbsp;的：<b>" + item.articleName + "</b></h3><p>"+ item.articleContent +"</p></div></li>"
              })
              $("#new").html(con)
            }else{
              $("#new").html('暂时没东西呢，快去发布内容吧')
            }
        }
    })
})
function findType(){
    $.ajax({
        type:"get",
        url:baseurl+"api/Type/GetType",
        dataType:"json",
        success:function(data){
            var dataObj = data, 
            con = "";
            $.each(dataObj,function(index,item){
                con += "<option>"+ item.type +"</option>"
            })
            $("#carticleType").html(con)
        }
    })
}
$("#spits").click(function(){
    $.ajax({
        type:"get",
        url:baseurl+'api/Article/GetArticle?',
        data:{
            "articleType":"小小吐槽"
        },
        dataType: "json",
        success:function(data){
            if(data != ""){
              var dataObj = data, 
              con = "";
              $.each(dataObj,function(index,item){
                  con += "<li class='layui-timeline-item'><i class='layui-icon layui-timeline-axis'>&#xe63f;</i><div class='layui-timeline-content layui-text'><h2>"+ item.articleDate +"</h2><h3 style='color:black;'>这是一条来自&nbsp;<b>"+ item.articleUser +"</b>&nbsp;的：<b>" + item.articleName + "</b></h3><p>"+ item.articleContent +"</p></div></li>"
              })
              $("#spit").html(con)
            }else{
              $("#spit").html('暂时没东西呢，快去发布内容吧')
            }
        }
    })
});
$("#digitals").click(function(){
    $.ajax({
        type:"get",
        url:baseurl+'api/Article/GetArticle?',
        data:{
            "articleType":"数码科技"
        },
        dataType: "json",
        success:function(data){
            if(data != ""){
              var dataObj = data, 
              con = "";
              $.each(dataObj,function(index,item){
                  con += "<li class='layui-timeline-item'><i class='layui-icon layui-timeline-axis'>&#xe63f;</i><div class='layui-timeline-content layui-text'><h2>"+ item.articleDate +"</h2><h3 style='color:black;'>这是一条来自&nbsp;<b>"+ item.articleUser +"</b>&nbsp;的：<b>" + item.articleName + "</b></h3><p>"+ item.articleContent +"</p></div></li>"
              })
              $("#digital").html(con)
            }else{
              $("#digital").html('暂时没东西呢，快去发布内容吧')
            }
        }
    })
})
$("#hobbys").click(function(){
    $.ajax({
        type:"get",
        url:baseurl+'api/Article/GetArticle?',
        data:{
            "articleType":"兴趣爱好"
        },
        dataType: "json",
        success:function(data){
            if(data != ""){
              var dataObj = data, 
              con = "";
              $.each(dataObj,function(index,item){
                  con += "<li class='layui-timeline-item'><i class='layui-icon layui-timeline-axis'>&#xe63f;</i><div class='layui-timeline-content layui-text'><h2>"+ item.articleDate +"</h2><h3 style='color:black;'>这是一条来自&nbsp;<b>"+ item.articleUser +"</b>&nbsp;的：<b>" + item.articleName + "</b></h3><p>"+ item.articleContent +"</p></div></li>"
              })
              $("#hobby").html(con)
            }else{
              $("#hobby").html('暂时没东西呢，快去发布内容吧')
            }
        }
    })
});
$("#Grievings").click(function(){
    $.ajax({
        type:"get",
        url:baseurl+'api/Article/GetArticle?',
        data:{
            "articleType":"灌水牢骚"
        },
        dataType: "json",
        success:function(data){
            if(data != ""){
              var dataObj = data, 
              con = "";
              $.each(dataObj,function(index,item){
                  con += "<li class='layui-timeline-item'><i class='layui-icon layui-timeline-axis'>&#xe63f;</i><div class='layui-timeline-content layui-text'><h2>"+ item.articleDate +"</h2><h3 style='color:black;'>这是一条来自&nbsp;<b>"+ item.articleUser +"</b>&nbsp;的：<b>" + item.articleName + "</b></h3><p>"+ item.articleContent +"</p></div></li>"
              })
              $("#Grieving").html(con)
            }else{
              $("#Grieving").html('暂时没东西呢，快去发布内容吧')
            }
        }
    })
});
$("#secrets").click(function(){
    $.ajax({
        type:"get",
        url:baseurl+'api/Article/GetArticle?',
        data:{
            "articleType":"个人秘密"
        },
        dataType: "json",
        success:function(data){
            if(data != ""){
              var dataObj = data, 
              con = "";
              $.each(dataObj,function(index,item){
                  con += "<li class='layui-timeline-item'><i class='layui-icon layui-timeline-axis'>&#xe63f;</i><div class='layui-timeline-content layui-text'><h2>"+ item.articleDate +"</h2><h3 style='color:black;'>这是一条来自&nbsp;<b>不愿意透露姓名的朋友</b>&nbsp;的：<b>" + item.articleName + "</b></h3><p>"+ item.articleContent +"</p></div></li>"
              })
              $("#secret").html(con)
            }else{
              $("#secret").html('暂时没东西呢，快去发布内容吧')
            }
        }
    })
});