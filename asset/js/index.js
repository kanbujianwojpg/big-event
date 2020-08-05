//控制主页
$(function () {
  //显示用户头像和名字
  function loadUserInfo() {
    $.ajax({
      type: 'get',
      url: '/my/userinfo',
      headers: {
        Authorization: sessionStorage.getItem('mytoken'),
      },
      success: function (res) {
        if (res.status === 0) {
          var data = res.data;
          var user = $('.welcome');
          var nuser = $('.nav-user');
          if (data.user_pic) {
            user.prepend(`<img src="${data.user_pic}" />`);
            nuser.prepend(`<img src="${data.user_pic}" />`);
          } else {
            user.prepend(`<div class='avatar'>U</div>`);
            nuser.prepend(`<div class='avatar'>U</div>`);
          }
          user.find('.userName').html('欢迎' + data.username);
          nuser.find('.userName').text(data.username);
        }
      },
    });
  }
  loadUserInfo();
  //退出功能
  $('#logout-btn').click(function () {
    //进行弹窗确认
    layer.confirm('确实要退出吗?', { icon: 3, title: '提示' }, function (index) {
      //index表示当前的弹窗
      //点击确定触发回调函数
      sessionStorage.removeItem('mytoken');
      layer.close(index);
      location.href = './login.html';
    });
  });
});
