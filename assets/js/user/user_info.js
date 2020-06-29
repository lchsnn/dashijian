$(function(){
    // 表单验证规则
    var form=layui.form
    var layer=layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度不能多于6个字符'
            }
        }
    })
    //获取用户信息
    function getUserIniInfo(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                console.log(res);
                if(res.status!=0){                    
                    return layer.msg('获取用户信息失败')
                }
                form.val('userInfoForm',res.data)

            }
        })
    }
    getUserIniInfo()
    //实现表单重置功能
    $('#resetForm').on('click',function(e){
        e.preventDefault();
        getUserIniInfo()
    })
    //提交修改用户信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                // if(res.status!=0){                    
                //     return layer.msg('更新用户信息失败')
                // }
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo()
                

                
            }
        })
    })










































})