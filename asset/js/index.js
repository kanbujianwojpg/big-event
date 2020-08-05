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
        user.find('.avatar').hide();
        if (data.user_pic) {
          user.html(`<img src="${data.user_pic}" />`);
        } else {
          user.html(`<div class='avatar'>U</div>`);
        }
        user.append(`<span>欢迎${data.username}</span>`);
        //更新右上角
        var user = $('.nav-user');
        user.find('.avatar').hide();
        if (data.user_pic) {
          user.html(`<img src="${data.user_pic}" />`);
        } else {
          user.html(`<div class='avatar'>U</div>`);
        }
        user.append(`<span>${data.username}</span>`);
      }
    },
  });
});
