$(function(){
  //加载页面头部
  $(".header_box").load('header.html',function(){
    main();
    navText("公司动态");
  });

  var pageCur=1;//请求的页码，默认为1
  var pageC=0;//总页码数
  newList(pageCur);
  $(".pages").on('click','a',function(e){
    e.preventDefault();
    var index=$(this).index();
    if(index==0){//判断当用户点击的是“第一页”按钮
      if(pageCur==1) return;//如果已经是页码1，跳出
      pageCur--;
    }else if(index==pageC+1){//判断用户点击的是“下一页”按钮
      if(pageCur==pageC) return;//如果当前页已经是最后一页，跳出
      pageCur++;
    }else{
      pageCur=index;
    }
    newList(pageCur);
  });
function newList(pageCur){
  $.ajax({
    type:"post",
    url:"data/news.php",
    data:{pageNum:pageCur},
    success:function(d){
      pageC= d.pageCount;
      //动态添加新闻列表
      var data=d.data;
      var html='';
      for(var i=0;i<data.length;i++){
        html+='<li><span>'
        +dateFormat(parseInt(data[i].pubTime),"-")
        +'</span><a href="news_details.html?nid='
        +data[i].nid
        +'">'
        +data[i].title
        +'</a></li>'
      }
      $(".news ul").html(html);
      //动态显示页码
      var htmlPage='<a href="" class="">上一页</a>';
      for(var i=1;i< d.pageCount+1;i++){
        htmlPage+='<a href="">'+i+'</a>';
      }
      htmlPage+='<a href="">下一页</a>';
      $(".pages").html(htmlPage);
      $(".pages a").eq(d.pageNum).addClass('cur');
      if(d.pageNum==1){
        $(".pages a:first").addClass("default");
      }
      if(d.pageNum== d.pageCount){
        $(".pages a:last").addClass("default");
      }
    }
  });
}


//实现分页效果


});