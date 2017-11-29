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
      auto: true,
      contentdown : "下拉可以刷新",
      contentover : "释放立即刷新",
      contentrefresh : "正在刷新...",
      callback :plusReady
    }
}
});

function plusReady(){
	var lottery = plus.webview.currentWebview().value.lot
	var name = plus.webview.currentWebview().value.name
	plus.nativeUI.showWaiting()
    $('#recent-list').empty()
	mui.ajax(uri+'Common/GetRecentLotteryInfo',{
          dataType:'json',
          data: {'lottery':lottery,'num':10,'sign':sign,'token':token,'user_id':user_id},
          type:'post',
          
          success:function(data){
          	console.log(JSON.stringify(data))
          	if(data.code == 202){
            	plus.runtime.restart()
            }
             if(data.code == 1){
             	   var html = ''
             		$.each(data, function(i,v) {
             	        html += '<li><span class="lotname">'+name+'</span><span>第'+v.no+'期</span><div class="recent-balls">'
             	  	    if(typeof(v.number) == 'undefined'){
             	  	    	html += '<i>暂无数据</i>'
             	  	    }else{
             	  	    	var tem = v.number.split(',')
             	  	       $.each(tem, function(i,k) {
                	          html += '<i>'+k+'</i>'
                           });	
             	  	    }
             		});  
			         $('#recent-list').append(html)
			         mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
             	  
             }else{
//           	   toast('请求失败')
             }
          }
    });
	plus.nativeUI.closeWaiting()
}

mui('#topBar').on('tap', '#back', function(e) {	
	plus.webview.currentWebview().close()
});
