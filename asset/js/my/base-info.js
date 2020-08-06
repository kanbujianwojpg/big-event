$(function () {
  var form = layui.form;
  //调用接口获取用户信息
  function loadUserInfo() {
    $.ajax({
      type: 'get',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status === 0) {
          var data = res.data;
          //把获取到的数据填充到表单JQ方式
          // $('.layui-form input[name=username]').val(data.username);
          // $('.layui-form input[name=nickname]').val(data.nickname);
          // $('.layui-form input[name=email]').val(data.email);
          //-----------------------------
          //基于layui的方式填充表单
          //val('lay-filter的值',要填的值)
          form.val('basicForm', data);
        } else {
          return layer.msg(res.message);
        }
      },
    });
  }
  loadUserInfo();
});
