$(function () {
  var form = layui.form;
  //修改文章
  //获取文章的分类列表
  var form = layui.form;
  var id = new URLSearchParams(location.search).get('id');
  function loadCateGoryList() {
    $.ajax({
      url: '/my/article/cates',
      success: function (res) {
        console.log(res);
        //把数据填充到select中
        var tags = template('category-tpl', res);
        $('#cate_id').html(tags);
        //重新渲染select列表
        form.render('select');
        loadArticleContent();
      },
    });
  }
  loadCateGoryList();

  //把写过的数据添加
  function loadArticleContent() {
    //获取到文章id
    $.ajax({
      url: '/my/article/' + id,
      data: {
        id: id,
      },
      success: function (response) {
        console.log(response);
        form.val('editArticleForm', {
          Id: response.data.Id,
          title: response.data.title,
          cate_id: response.data.cate_id,
          content: response.data.content,
        });

        //初始化裁剪区
        var $image = $('.cover-left img');
        var options = {
          // 纵横比
          aspectRatio: 400 / 280,
          autoCropArea: 1, // 定义剪裁区的大小
          preview: '.img-preview', //指定预览区域
        };
        // $image.cropper(options);
        // 这里处理图片
        $image.attr('src', 'http://ajax.frontend.itheima.net' + response.data.cover_img).cropper(options);
        // $image.attr('src', 'http://127.0.0.1:5500' + res.data.cover_img).cropper(options);
      },
    });
  }
  //初始化富文本
  initEditor();
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
    $('#image')
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
          url: '/my/article/edit',
          data: fd,
          processData: false, // 防止把请求参数转换为字符串
          contentType: false, // 禁止使用默认的提交参数类型
          success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
              location.href = './list.html';
            }
          },
        });
      });
  });
});
