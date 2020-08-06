$(function () {
  //实现图片的裁切效果
  $('.cropper-box img').cropper({
    //纵横比
    aspectRatio: 1,
    //指定预览区域
    preview: '.img-preview',
  });
});
