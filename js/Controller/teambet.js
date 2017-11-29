var s_date,e_date;
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
if(Number(day) < 10) day = '0' + day    


if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

mui.init({
  pullRefresh : {
    container:"#refreshContainer",
    down : {
      height:50,
      auto: false,
      contentdown : "下拉可以刷新",
      contentover : "释放立即刷新",
      contentrefresh : "正在刷新...",
      callback : function(){
          var cur_date = $('#date-menu a.mui-active').attr('id');
//        getList(cur_date)
      }
    }
  }
});
   

mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close()
});

mui('#date-menu').on('tap', 'a', function(e) {
    var cur_date = $(this).attr('id');
    getList(cur_date)
//  mui('#refreshContainer').pullRefresh().refresh(true);
});
mui('#recent-list').on('tap','.icon-leftarrow',function(){
	var no = $(this).parents('li').attr('id')
	var day=$('#date-menu a.mui-active').attr('id');
	getList(day)
	var json={
		'search_time_s':s_date,
		'search_time_e':e_date,
		'chase_no':no
	}
	console.log(JSON.stringify(json))
	openWV('teambetDetail.html','teambetDetail','right',json)
})
mui('body').on('tap', '#customSearch', function(e) {
    var s_date = $('#s_date').val()
    var e_date = $('#e_date').val()
    if(s_date == '' || e_date == ''){
        toast('请输入时间')
    }else{
    	var json={'user_id':user_id,'token':token,'sign':sign,'page_no':'','page_size':'','search_time_s':s_date,'search_time_e':e_date}
        getReport(s_date+' 00:00:00',e_date+' 23:59:59',json)
        $('.dateBar,.date-mask').hide()
    }
});

function plusReady() {
	var date = $('#date-menu a.mui-active').attr('id');
	getList(date)
	$('.dateBar input').val(year + '-' + month + '-' + day)
}

function getList(cur_date){
	switch (cur_date){
    	case 't':
    	  s_date = year + '-' + month + '-' + day + ' 00:00:00'
    	  e_date = year + '-' + month + '-' + day + ' 23:59:59'
    	  break;
    	case 'w':
    	  var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
		  var year1 = date.getFullYear();
		  var month1 = date.getMonth() + 1;
		  var day1 = date.getDate();
		  if(Number(day1) < 10) day1 = '0' + day1
		  s_date = year1 + '-' + month1 + '-' + day1 + ' 00:00:00'
		  e_date = year + '-' + month + '-' + day + ' 23:59:59'
		  break;
    	case 'm':
    	  s_date = year + '-' + [month - 1] + '-' + day + ' 00:00:00'
		  e_date = year + '-' + month + '-' + day + ' 23:59:59'
    	  break;
   }
     getReport(s_date,e_date)
}

function getReport(s,e){
	plus.nativeUI.showWaiting()
	var json={'user_id':user_id,'token':token,'sign':sign,'page_no':'','page_size':'','search_time_s':s,'search_time_e':e}
	mui.ajax(uri+'Report/TeamBetRecord',{
        dataType:'json',
        data: json,
        type:'post',
        success:function(data){
        	plus.nativeUI.closeWaiting()
        	console.log(JSON.stringify(data))
        	$('.record-details').empty()
        	var str = data.data
        	var html = ''
        	if(data.data_total_nums == 0){
        		return toast("暂无数据")
        	}
            if(data.code == 1){
            		$.each(data.info, function(i,v) {
            		  html += '<li id='+v.issue+' "style="margin-left: 10px;""><span>'+v.dan+'</span><span>期号：<b>'+v.issue+'</b></span><span "style="margin-left: 10px;"">玩法：<b>'+v.mid+'</b></span>'
            		  html += '<span>总金额：<b>'+v.money+'</b></span>'
            		  if(v.status == 1){
            		  	 html += '<span>状态：<b style="color:#666">未开奖</b></span>'
            		  }
            		  else if(v.status == 2){
            		  	 html += '<span>状态：<b style="color:#666">未中奖</b></span>'
            		  }
            		  else if(v.status == 3){
            		  	 html += '<span>状态：<b style="color:#528eff">已中奖</b></span>'
            		  }
            		  else if(v.status == 4){
            		  	 html += '<span>状态：<b style="color:#666">已删除</b></span>'
            		  }
            		  else if(v.status == 5){
            		  	 html += '<span>状态：<b style="color:#666">撤单</b></span>'
            		  }
            		  else if(v.status == 6){
            		  	 html += '<span>状态：<b style="color:#666">停止</b></span>'
            		  }
            		  html += '<b class="iconfont icon-leftarrow"></b></li>'
            	 });
            }else{
            	toast('暂无数据')
            }
        	 $('.record-details').append(html)
            plus.nativeUI.closeWaiting()
//          mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }
    })
}
