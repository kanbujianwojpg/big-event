//这里进行通用配置
$(function () {
  //发送请求统一设置
  var baseURL = 'http://ajax.frontend.itheima.net';
  $.ajaxPrefilter(function (option) {
    //option 表示请求配置选项
    option.url = baseURL + option.url;
  });
});
