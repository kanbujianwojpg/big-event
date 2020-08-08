$(function () {
  $('#add-form').submit(function (e) {
    e.preventDefault();
    var fd = new FormData(this);
    $.ajax({
      type: 'POST',
      url: '/my/article/add',
      data: fd,
      processData: false, // 防止把请求参数转换为字符串
      contentType: false, // 禁止使用默认的提交参数类型
      success: function (res) {
        if (res.status === 0) {
          layer.msg(res.message);
        }
      },
    });
  });
});
