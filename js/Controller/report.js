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
	swipeBack: false
});

(function($){
    $(".mui-scroll-wrapper").scroll({
        bounce: false,//滚动条是否有弹力默认是true
        indicators: false, //是否显示滚动条,默认是true
    }); 
})(mui);
   

mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close()
});

mui('#date-menu').on('tap', 'a', function(e) {
    var cur_date = $(this).attr('id');
    getList(cur_date)
    //mui('#refreshContainer').pullRefresh().refresh(true);
});

function plusReady() {
	var date = $('#date-menu a.mui-active').attr('id');
	getList(date)}

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
	var json = {'user_id':user_id,'token':token,'sign':sign,'search_time_s':s,'search_time_e':e}
	console.log(JSON.stringify(json))
	mui.ajax(uri+'Report/GetAccountRecord',{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign,'search_time_s':s,'search_time_e':e},
        type:'get',
        success:function(data){
        	console.log(data)
        	if(data.code == 202){
            	plus.runtime.restart()
            }
        	console.log(JSON.stringify(data))
        	$('.record-details').empty()
        	var html = ''
            if(data.code == 1){
            	$.each(data.info,function(i,v){
            	    html += '<li>'
            	    html += '<div class="item long"><p>交易编号</p><strong>'+v.dan +'</strong></div>' 
            	    html += '<div class="item"><p>交易时间</p><strong>'+v.adddate +'</strong></div>' 
            	    html += '<div class="item"><p>交易类型</p><strong>'+v.types +'</strong></div>'  
            	    html += '<div class="item long"><p>说明</p><strong>'+v.remark  +'</strong></div>' 
            	    html += '<div class="item"><p>交易金额</p><strong>'+v.money  +'</strong></div>' 
            	    html += '<div class="item"><p>余额</p><strong>'+v.leftmoney +'</strong></div>'
            	    html += '</li>'
            	})
            }else{
            	toast("请求失败")
            }
            $('.record-details').append(html)
            plus.nativeUI.closeWaiting()
            //mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }
  })
}
