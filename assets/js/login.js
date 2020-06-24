// 登录注册切换====================================================================
$(function () {
    $('#login-link').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    $('#reg-link').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //自定义验证规则====================================================================
    var form = layui.form  //必须先拿到layui中的form对象
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwdvalue = $('.reg-box [name=password]').val()

            if (pwdvalue !== value) {
                return '两次密码不一致'
            }

        }
    })
    //注册请求发送======================================================================
    var layer = layui.layer
    $('#reg-form').submit(function (e) {
        e.preventDefault()
        var data = { username: $('.reg-box [name=username]').val(), password: $('.reg-box [name=repassword]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status == 0) {
                layer.msg(res.message)
                $('#login-link').click()
            } else {
                layer.msg(res.message)
            }
        })

    })
    //登录发送请求========================================================================
    $('#login-form').submit(function (e) {
        e.preventDefault()
        var data = $('#login-form').serialize()
        $.post('/api/login', data, function (res) {
            if (res.status == 0) {
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }else{
                layer.msg(res.message)
            }

        })
    })





































})