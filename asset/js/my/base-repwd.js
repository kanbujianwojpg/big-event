$(function () {
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
