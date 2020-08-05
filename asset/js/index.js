//控制主页
$(function () {
  $.ajax({
    type: 'get',
    url: '/my/userinfo',
    headers: {
      Authorization: sessionStorage.getItem('mytoken'),
    },
    success: function (res) {
      if (res.status === 0) {
        var data = res.data;
        console.log(data);
        var user = $('.welcome');
        var nuser = $('.nav-user');
        user.find('.avatar').hide();
        nuser.find('.avatar').hide();
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
});
