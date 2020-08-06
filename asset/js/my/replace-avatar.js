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
});
