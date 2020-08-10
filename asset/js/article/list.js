$(function () {
  // 处理日期的格式化： 基于模板引擎的过滤器
  template.defaults.imports.formatDate = function (data) {
    // 实现日期的格式化：把参数data日期字符串转换为日期对象
    var d = new Date(data);
    var year = d.getFullYear();
    var month = addZero(d.getMonth() + 1);
    var day = addZero(d.getDate());
    var hour = addZero(d.getHours());
    var minutes = addZero(d.getMinutes());
    var seconds = addZero(d.getSeconds());
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    // return year + '-' + month + '-' + day;
  };

  // 补零函数
  function addZero(n) {
    return n < 10 ? '0' + n : n;
  }
  //文章列表模块
  //获取筛选文章分类列表数据
  var form = layui.form;
  function loadCateGoryList() {
    $.ajax({
      type: 'get',
      url: '/my/article/cates',
      success: function (res) {
        console.log(res);
        //把数据填充到select中
        var tags = template('category-tpl', res);
        $('#category').html(tags);
        //重新渲染select列表
        form.render('select');
      },
    });
  }
  loadCateGoryList();

  //获取文章列表数据
  var params = {
    pagenum: 1, //当前页码
    pagesize: 3, //每页显示几条数据
  };

  //处理删选条件查询
  $('#query_btn').click(function (e) {
    e.preventDefault();
    //获取筛选条件的值
    var conditions = $('#search-form').serializeArray();
    conditions.forEach(element => {
      if (!element.value) {
        if (params[element.name]) {
          delete params[element.name];
        }
      } else {
        params[element.name] = element.value;
      }
    });
    loadArticleList(params);
  });

  function loadArticleList(params) {
    $.ajax({
      type: 'get',
      url: '/my/article/list',
      data: params,
      success: function (res) {
        //把数据填充到select中
        var tags = template('list-tpl', res);
        $('.layui-table tbody').html(tags);
      },
    });
  }
  loadArticleList(params);

  //控制文章的删除操作
  $('.layui-table tbody').on('click', '.layui-btn-danger', function (e) {
    var id = $(e.target).data('id');
    layer.confirm('确定要删除吗?', { icon: 0, title: '提示' }, function (index) {
      $.ajax({
        type: 'get',
        url: '/my/article/delete/' + id,
        data: { id: id },
        success: function (res) {
          if (res.status === 0) {
            layer.msg(res.message);
            loadArticleList(params);
          }
        },
      });
      layer.close(index);
    });
  });

  //文章的编辑操作
  $('.layui-table tbody').on('click', '.edit', function (e) {
    var id = $(e.target).data('id');
    location.href = './editArticle.html' + '?id=' + id;
  });
});
