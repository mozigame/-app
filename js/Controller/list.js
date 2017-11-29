/*
   * 开奖记录页面
   */

if(window.plus) {
	plus.nativeUI.showWaiting()
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

mui.init({
pullRefresh : {
    container:"#refreshContainer",
    down : {
      height:50,
      auto: true,
      contentdown : "下拉可以刷新",
      contentover : "释放立即刷新",
      contentrefresh : "正在刷新...",
      callback : refreshList
    }
}
});

window.addEventListener('refreshList',function(event){
	plusReady() 
});

mui('#recent-list').on('tap', 'li', function(e) {
	var lotname = $(this).attr('data-name')
	var lottext = $(this).find('.lotname').text()
	var json = {"lotName":lotname,"lotText":lottext}
	openWV('listDetails.html','listDetails','right',json)
});

function plusReady() {
}

function refreshList() {
    var lotAll = [
     {"lot":"cqssc","name":"重庆时时彩"},  
     {"lot":"tjssc","name":"天津时时彩"},  
     {"lot":"xjssc","name":"新疆时时彩"},  
     {"lot":"hljssc","name":"黑龙江时时彩"},  
     {"lot":"hgssc","name":"韩国1.5分彩"},  
     {"lot":"dbssc","name":"迪拜1.5分彩"},  
     {"lot":"xjpssc","name":"新加坡两分彩"},  
     {"lot":"gd115","name":"广东11选5"},  
     {"lot":"sh115","name":"上海11选5"},  
     {"lot":"sd115","name":"山东11选5"},  
     {"lot":"jx115","name":"江西11选5"},  
     {"lot":"fc3d","name":"福彩3D"},  
     {"lot":"pl3","name":"排列3"},  
     {"lot":"bjpk10","name":"北京PK10"},  
     {"lot":"mlxy3fc","name":"马来西亚3分彩"},  
     {"lot":"jlpffc","name":"吉隆坡分分彩"},  
     {"lot":"jlpssc","name":"吉隆坡1.5彩"},  
     {"lot":"wh1fc","name":"富博分分彩"},  
     {"lot":"wh2fc","name":"富博2分彩"},  
     {"lot":"wh5fc","name":"富博5分彩"}, 
     {"lot":"jlpsm","name":"吉隆坡赛马"},  
     {"lot":"mskssc","name":"莫斯科1.5分彩"} 
    ]
    $('#recent-list').empty()
	$.each(lotAll, function(i,v) {
		$.ajax({
		  url: uri+'Common/GetRecentLotteryInfo',
          dataType:'json',
          data: {'lottery':v.lot,'num':1,'sign':sign},
          type:'get',
          success:function(data){
          	if(data.code == 202){
            	plus.runtime.restart()
            }
          	if(data.code == 1){
             	if(data[0].number != ''){
             	     var html = ''
             	     html += '<li data-name="'+v.lot+'"><span class="lotname">'+v.name+'</span><span>第'+data[0].no+'期</span><div class="recent-balls">'
             	  	 var tem = data[0].number.split(',')
                     $.each(tem, function(i,k) {
                	   html += '<i>'+k+'</i>'
                     });
			         html += '</div><b class="iconfont icon-leftarrow"></b></li>'
			         $('#recent-list').append(html)
			         mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
			    }
            }else{
//           	toast('请求失败')
            }
          }
       })
	});
	plus.nativeUI.closeWaiting()
}