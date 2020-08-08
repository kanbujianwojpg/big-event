$(function () {
  //发布文章
  //获取文章的分类列表
  var form = layui.form;
  function loadCateGoryList() {
    $.ajax({
      type: 'get',
      url: '/my/article/cates',
      success: function (res) {
        console.log(res);
        //把数据填充到select中
        var tags = template('category-tpl', res);
        $('#cate_id').html(tags);
        //重新渲染select列表
        form.render('select');
      },
    });
  }
  loadCateGoryList();

  //初始化富文本
  initEditor();

  //初始化裁剪区
  var $image = $('.cover-left img');
  var options = {
    // 纵横比
    aspectRatio: 400 / 280,
    preview: '.img-preview', //指定预览区域
  };
  $image.cropper(options);

  //选择图片
  $('#selectBtn').click(function () {
    $('#cover_img').click();
  });
  $('#cover_img').change(function (e) {
    //获取到新的图片
    var file = e.target.files[0];
    //基于选中的图片,生成一个url地址
    var newImg = URL.createObjectURL(file);
    //替换裁剪区域图片
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImg) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
    $image.cropper('get');
  });

  //处理点击提交的状态
  var state = '';
  $('.layui-btn').click(function () {
    var id = $(this).attr('id');
    if (id === 'btnPublish') {
      state = '已发布';
    } else if (id === 'btnSave') {
      state = '草稿';
    }
  });

  //绑定提交动作
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    var fd = new FormData(this);
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        //单独添加状态和图片
        fd.append('state', state);
        fd.append('cover_img', blob);
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
});
