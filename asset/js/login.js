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
  });
  //监听登录提交事件
  $('.layui-form').submit(function (e) {
    //禁用表单默认行为
    e.preventDefault();
    //获取表单数据
    var formData = $(this).serialize();
    //调用接口进行登录验证
    $.ajax({
      type: 'post',
      url: 'http://ajax.frontend.itheima.net/api/login',
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
});
