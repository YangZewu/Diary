var baseurl="http://112.74.60.134:81/";
var username;
var uploadurl;
var nickname;
var userimg;
//layui模块
layui.use(['layer', 'laypage', 'laydate','upload','form','element'], function(){
    var layer = layui.layer //获得layer模块
    ,laypage = layui.laypage //获得laypage模块
    ,laydate = layui.laydate,
    element = layui.element,
    form=layui.form,
    upload=layui.upload; //获得laydate模块
    var uploadInst = upload.render({
        elem: '#faceImg'
        ,url: baseurl+'api/Users/upload',
        before: function(obj){
          //预读本地文件示例，不支持ie8
          obj.preview(function(index, file, result){
            $('#faceImg').attr('src', result); //图片链接（base64）
          });
        }
        ,done: function(res){
          //如果上传失败
          if(res.code > 0){
            return layer.msg('上传失败');
          }
         $("#img").val(res.url)
          //上传成功
        }
      });
  }); 
$(function(){
    //注册字段验证
    $("#cuserName").change(function(){
        var res = /^(?!\d+$)[a-zA-Z0-9]{1,8}$/;
        var con = $(this).val();
        var result = res.test(con);
        findUserName();
        if (!result) {
            $("#cusernamemsg").css("color", "red");
            $("#cusernamemsg").html("不能是纯数字，大|小写英文|英文+数字组合 1-8个字符");
            $("#btnCreate").attr("disabled", true);
        }else{
            $("#cusernamemsg").html("");
            $("#btnCreate").attr("disabled", false);
        }  
    });
    $("#cnickName").change(function(){
        var res = /^[\u4e00-\u9fa5_a-zA-Z0-9_]+$/;
        var con = $(this).val();
        var result = res.test(con);
        if (!result) {
            $("#cnicknamemsg").css("color", "red");
            $("#cnicknamemsg").html("大小写英文数字中文组合");
            $("#btnCreate").attr("disabled", true);
        }else{
            $("#cnicknamemsg").html("");
            $("#btnCreate").attr("disabled", false);
        }
    });
    $("#cpassWord").change(function(){
        var res = 
                    /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,16})$/;
        var con = $(this).val();
        var result = res.test(con);
        if (!result) {
            $("#cpwdmsg").css("color", "red");
            $("#cpwdmsg").html("密码格式不正确(大小写英文、数字、符号组合，至少三种)6-16位");
            $("#btnCreate").attr("disabled", true);
        }else{
            $("#cpwdmsg").html("");
            $("#btnCreate").attr("disabled", false);
        }
    });
});
//发布文章
$("#btnPublish").click(function(){
    if($("#carticleName").val() === ""){
        $("#marticleName").html('文章标题不能为空')
        $("#marticleName").css('color','red')
    }else if($("#carticleContent").val() === ""){
        $("#marticleContent").html('文章内容不能为空')
        $("#marticleContent").css('color','red')
    }else{
        $.ajax({
            type:"post",
            url:baseurl+"api/Article/CreateArticle",
            data:{
                "articleName":$("#carticleName").val(),
                "articleUser":nickname,
                "articleType":$("#carticleType").val(),
                "articleContent":$("#carticleContent").val()
            },
            success:function(data){
                if(data.Success){
                    alert("发布成功");
                    $("#modal-publish").modal('hide')
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
                            }
                        }
                    })
                }
            }
        })
    }
});
$("#cnickName").change(function(){
    var res = /^[\u4e00-\u9fa5_a-zA-Z0-9_]+$/;
    var con = $(this).val();
    var result = res.test(con);
    if (!result) {
        $("#cnicknamemsg").css("color", "red");
        $("#cnicknamemsg").html("大小写英文数字中文组合");
        $("#btnCreate").attr("disabled", true);
    }else{
        $("#cnicknamemsg").html("");
        $("#btnCreate").attr("disabled", false);
    }
});
//清空模态框
$('#modal-create').on('hidden.bs.modal', function (){
    $(".modal-body input").val('');
    $(".modal-body span").html('');
});
$('#modal-log').on('hidden.bs.modal', function (){
    $(".modal-body input").val('');
    $(".modal-body span").html('');
});
$('#modal-myself').on('show.bs.modal', function () {
    findUser();
})
//登录按钮事件
$("#btnLogin").click(function(){
    loginEmptyVerify();
});
//注册按钮事件
$("#btnCreate").click(function(){
    createEmptyVerify();
});
//注册非空验证
function createEmptyVerify(){
    if($("#cuserName").val() === ""){
        $("#cusernamemsg").css('color','red');
        $("#cusernamemsg").html('用户名不能为空');
        $("#cuserName").focus();
        $("#cuserName").change(function(){
            if($("#cuserName").val() != ""){
                $("#cusernamemsg").html('');
            }
        })
    }else if($("#cnickName").val() === ""){
        $("#cnicknamemsg").css('color','red');
        $("#cnicknamemsg").html('昵称不能为空');
        $("#cnickName").focus();
        $("#cnickName").change(function(){
            if($("#cnickName").val() != ""){
                $("#cnicknamemsg").html('');
            }
        })
    }else if($("#cpassWord").val() === ""){
        $("#cpwdmsg").css('color','red');
        $("#cpwdmsg").html('密码不能为空');
        $("#cpassWord").focus();
        $("#cpassWord").change(function(){
            if($("#cpassWord").val() != ""){
                $("#cpwdmsg").html('');
            }
        })
    }else{
        $.ajax({
            url:baseurl+"api/Users/CreateUser",
            type:"post",
            data:{
                "userName":$("#cuserName").val(),
                "passWord":$("#cpassWord").val(),
                "userPhoto":$("#img").val(),
                "nickName":$("#cnickName").val()
            },
            dataType:"json",
            success:function(data){
                if(data.Success){
                    alert("注册成功");
                    $("#modal-create").modal('hide');
                    $("#modal-log").modal();
                }
            }
        })
    }
};
//登录非空验证
function loginEmptyVerify(){
    if($("#luserName").val() === ""){
        $("#lnamemsg").css("color","red");
        $("#lnamemsg").html("用户名不能为空");
        $("#luserName").focus();
        $("#luserName").change(function(){
            if($("#luserName").val() != ""){
                $("#lnamemsg").html('');
            }
        })
    }
    else if($("#lpassWord").val() === ""){
        $("#lpwdmsg").css("color","red");
        $("#lpwdmsg").html("密码不能为空");
        $("#lpassWord").change(function(){
            if($("#lpassWord").val() != ""){
                $("#lpwdmsg").html('');
            }
        })
    }else{
        $.ajax({
            url:baseurl+"api/Users/Login",
            type:"post",
            data:{
                "userName":$("#luserName").val(),
                "passWord":$("#lpassWord").val()
            },
            dataType: "json",
            success:data => {
                if(data.Success){
                    username=$("#luserName").val();
                    alert('登录成功');
                    findNicknName();
                    findUserPhoto();
                }else{
                    alert("用户名不存在或密码错误");
                    $("#luserName").val('');
                    $("#lpassWord").val('');
                }
            }
        })
    }
};
//查找用户头像
function findUserPhoto(){
    $.ajax({
        url:baseurl+"api/Users/FindPhoto?",
        type:"get",
        data:{
            "userName":username
        },
        contentType: "application/json",
        success:function(data){
            if(data != null) {
                $("#modal-log").modal('hide');
                $(".create").hide();
                $(".login").hide();
                $("#face").attr("src",baseurl+data);
                $(".myself").css('visibility', 'visible');
                $(".publish").css('visibility', 'visible');
            }  
        }
    });
};
//查找用户昵称
function findNicknName(){
    $.ajax({
        url:baseurl+"api/Users/FindNickName?",
        type:"get",
        data:{
            "userName":username
        },
        contentType: "application/json",
        success:function(data){
            $(".layui-nav-child dd:first>a").css('color','#red')
            $(".layui-nav-child dd:first>a").html('昵称：'+data)
            nickname=data;
        }
    });
};
//查找重复用户名
function findUserName(){
    $.ajax({
        url: baseurl+"api/Users/CheckName?",
        type: "get",
        data:{
            "userName":$("#cuserName").val()
        },
        contentType: "application/json",
        success: data => {
            if (!data.Success) {
                $("#cusernamemsg").css("color", "red");
                $("#cusernamemsg").html("用户名已被使用");
                $("#btnCreate").attr("disabled", true);
            }
        }
    });
};
//查找用户信息
function findUser(){
    $.ajax({
        url:baseurl+'api/Users/FindName?',
        type:'get',
        data:{
            "userName":username
        },
        contentType: "application/json",
        success:function(data){
            userimg=data.userPhoto;
            $("#faceImg").attr("src",baseurl+data.userPhoto);
           document.getElementById('muserName').value=data.userName;
           document.getElementById('mnickName').value=data.nickName;
           if(data.sex === '男')
           {
               $("#msex option[value='男']").prop("selected",true);
           }else if(data.sex === '女'){
               $("#msex option[value='女']").prop("selected",true);
           }else{
               $("#msex option[value='保密']").prop("selected",true);
           }
           if(data.userEmail != "")
           {
               document.getElementById('muserEmail').value=data.userEmail;
           }
           if(data.userSig != ""){
               document.getElementById('muserSig').value=data.userSig;
           }
           if(data.userDate != ""){
               document.getElementById('muserDate').value=data.userDate;
           }
           if(data.userAddr != ""){
            document.getElementById('muserAddr').value=data.userAddr;
           }
           document.getElementById('mcreateDate').value=data.createDate;
        }
    })
};
//更改用户信息
function editUser(){
    if($("#img").val() === "")
    {
        $("#img").val(userimg)
    }
        $.ajax({
            url:baseurl+"api/Users/EditUser",
            type:"put",
            data:{
                "userName":$("#muserName").val(),
                "userPhoto":$("#img").val(),
                "sex":$("#msex").val(),
                "nickName":$("#mnickName").val(),
                "userDate":$("#muserDate").val(),
                "userEmail":$("#muserEmail").val(),
                "userSig":$("#muserSig").val(),
                "userAddr":$("#muserAddr").val()
            },
            dataType:"json",
            success:function(data){
                if(data.Success){
                    alert("提交成功");
                    findNicknName();
                    findUserPhoto();
                    $("#modal-myself").modal('hide');
                }
            }
        })
};
$("#btnMyself").click(function(){
    editUser()
})




