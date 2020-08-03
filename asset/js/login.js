//实现登录功能
$(function () {
  //基于layui自定义表单验证规则
  var form = layui.form;
  form.verify({
    uname: [/^[\S]{6,8}$/, '用户名必须是6-8位字符'],
    //密码必须是6位数字
    pwd: function (value, item) {
      // 形参value标书对应输入域的值
      // item表示DOM元素
      // 验证6位数字
      var reg = /^\d{6}$/;
      if (!reg.test(value)) {
        return '密码必须是6位数字';
      }
    },
    samePwd: function (value) {
      //验证两次输入的密码是否一样
      //获取原密码
      var prePwd = $('#reg-form input[type=password]').eq(0).val();
      if (prePwd !== value) {
        return '两次输入的密码不一致';
      }
    },
  });

  //监听登录提交事件
  $('#login-form').submit(function (e) {
    //禁用表单默认行为
    e.preventDefault();
    //获取表单数据
    var formData = $(this).serialize();
    //调用接口进行登录验证
    $.ajax({
      type: 'post',
      url: '/api/login',
      data: formData,
      success: function (res) {
        console.log(res);
        if (res.status === 0) {
          location.href = './index.html';
        } else {
          alert(res.message);
        }
      },
    });
  });

  //控制登录和注册表单切换
  $('.reg-link').click(function () {
    //点击去注册,登录隐藏,注册显示
    $('#login-form').hide();
    $('#reg-form').show();
  });
  $('.login-link').click(function () {
    //点击去登录,登录显示,注册隐藏
    $('#reg-form').hide();
    $('#login-form').show();
  });
  //监听注册提交事件
  $('#reg-form').submit(function (e) {
    //禁用表单默认行为
    e.preventDefault();
    var formData = $(this).serialize();
    console.log(formData);
    //调用接口进行登录验证
    $.ajax({
      type: 'post',
      url: '/api/reguser',
      data: formData,
      success: function (res) {
        if (res.status === 0) {
          console.log(1);
          $('.login-link').click();
        } else {
          alert(res.message);
        }
      },
    });
  });
});
