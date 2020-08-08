$(function () {
  function loadArticle() {
    $.ajax({
      type: 'get',
      url: '/my/article/cates',
      success: function (res) {
        //获取列表数据
        var tagHTMl = template('tpl-article', res);
        $('.layui-table tbody').html(tagHTMl);
      },
    });
  }
  loadArticle();
  //添加分类
  var addIndex = null;
  $('#add-category').click(function () {
    //基于弹出层方式进行添加
    addIndex = layer.open({
      //弹出层类型
      type: 1,
      //弹出层标题
      title: '添加文章分类',
      //弹出层内容
      content: $('#tpl-add').html(),
      //弹出层区域大小
      area: ['500px', '250px'],
    });
  });
});
