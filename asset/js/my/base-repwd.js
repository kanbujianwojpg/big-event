$(function () {
  var form = layui.form;
  form.verify({
    //原始密码和新密码不一样
    diff: function (value) {
      //获取原密码的值
      var oldPwd = $('.layui-form input[name=oldPwd]').val();
      if (oldPwd === value) {
        return '新密码不能与原密码相同!';
      }
    },
    newPwd: function (value) {
      var reg = /^\d{6}$/;
      if (!reg.test(value)) {
        return '密码必须是6位数字!';
      }
    },
    //确认密码和新密码必须相同
    same: function (value) {
      var newPwd = $('.layui-form input[name=newPwd]').val();
      if (newPwd !== value) {
        return '两次密码输入不一致!';
      }
    },
  });
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    //获取表单数据
    var fd = $(this).serialize();
    console.log(fd);
    //调用接口进行密码更新
    $.ajax({
      type: 'post',
      url: '/my/updatepwd',
      data: fd,
      success: function (res) {
        layer.msg(res.message);
      },
    });
  });
});
