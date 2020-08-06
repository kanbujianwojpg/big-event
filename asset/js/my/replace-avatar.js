$(function () {
  //实现图片的裁切效果
  var $image = $('.cropper-box img');
  var options = {
    aspectRatio: 1, //纵横比
    preview: '.img-preview', //指定预览区域
  };
  $image.cropper(options);
  //点击按钮选择图片的控制
  $('#upload').click(function () {
    //触发file按钮的点击行为
    $('#avatar').click();
  });
  //监听选择图片的事件
  $('#avatar').change(function (e) {
    //获取更换的图片
    var file = e.target.files[0];
    //基于选中的图片,生成一个url地址
    var newImgURL = URL.createObjectURL(file);
    //替换裁剪区域图片
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  //点击确定,上传图片
  $('#submitImg').click(function () {
    //获取图片
    var imgURL = $image
      .cropper('getCroppedCanvas', {
        width: 100,
        height: 100,
      })
      // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      .toDataURL('image/png');
    //把生成的base46格式的图片传到服务器
    $.ajax({
      type: 'post',
      url: '/my/update/avatar',
      data: { avatar: imgURL },
      success: function (res) {
        if (res.status === 0) {
          layer.msg(res.message);
          //更新页面头像(调用父页面中的方法)
          parent.$.loadUserInfo();
        }
      },
    });
  });
});
