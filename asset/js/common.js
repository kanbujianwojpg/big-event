//这里进行通用配置
$(function () {
  //发送请求统一设置
  var baseURL = 'http://ajax.frontend.itheima.net';
  $.ajaxPrefilter(function (option) {
    //统一处理请求头
    if (option.url.indexOf('/my/') !== -1) {
      option.headers = { Authorization: sessionStorage.getItem('mytoken') };
    }
    //option 表示请求配置选项
    option.url = baseURL + option.url;

    //统一处理token失效问题
    //请求结束自动触发complete
    option.complete = function (res) {
      console.log(res);
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //token是有有效期的
        sessionStorage.removeItem('mytoken');
        location.href = './login.html';
      }
    };
  });
});
