$(function(){
  //加载页面头部
  $(".header_box").load('header.html',function(){
    main();
    navText("产品中心");
  });

  //获取pid
  var str=location.href;
  var pid=str.substr(str.lastIndexOf("=")+1);

  $.ajax({
    type:"post",
    url:"data/product_detail.php",
    data:{pid:pid},
    success:function(d){
      //console.log(d);
      $(".pdinfo_img img").attr('src', d.pic);
      $(".pdinfo_text>h2").html(d.title1);
      var htmlText='';
      htmlText+='<li>型号：'+ d.model+'</li>';
      htmlText+='<li>功能：'+ d.func+'</li>';
      htmlText+='<li>噪音：'+ d.noise+'</li>';
      htmlText+='<li>风量：'+ d.wind+'</li>';
      htmlText+='<li>适用对象：'+ d.applyTo+'</li>';
      htmlText+='<li>适用面积：'+ d.size+'</li>';
      htmlText+='<li>空气净化能效等级：'+ d.level+'</li>';
      $(".pdinfo_text>ul").html(htmlText);
      $("#price").html(d.price);
      $(".pd_details").html(d.detail);
    }
  });

  //练习：加入购物车功能
  //1、判断用户是否登录，如果未登录，跳转到登录页面登录
  //2、如果已登录，添加购物车
  $("#addCart").click(function(e){
    e.preventDefault();
    if(!sessionStorage.uid){//如果未登录
      location.href="login.html";
    }else{
      var uid=sessionStorage.uid;
      $.ajax({
        type:"post",
        url:"data/cart_detail_add.php",
        data:{uid:uid,pid:pid},
        success:function(d){
          if(d.code==1){//添加购物车成功
            alert("添加成功！");
            h_cartList();//更新头部下拉菜单列表
          }
        }
      });
    }
  });

});



