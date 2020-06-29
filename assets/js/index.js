
$(function(){
getUserInfo()
//实现退出功能
var layer=layui.layer
$('#login-out').on('click',function(){
    layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token')
        layer.close(index);
        location.href='/login.html'
      });
})

})
// 获取用户信息
function getUserInfo(){
    $.ajax({
        type:'get',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!=0){
                return console.log('获取用户信息失败');
            }
            // console.log(res);
            renderAvatar(res.data)
        }
    })
}
//渲染头像
function renderAvatar(data){
    var name= data.nickname||data.username
    $('#welcome').html('欢迎&nbsp&nbsp'+name)
    if(data.user_pic!=null){
        $('.user-pic').prop('src',data.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.user-pic').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}
