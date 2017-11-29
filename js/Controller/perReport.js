var s_date,e_date;
var int = 0;
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
	getList(date)
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
	var json = {'user_id':user_id,'token':token,'sign':sign,'search_time_s':s,'search_time_e':e,'page_no':1,'page_size':10}
	console.log(JSON.stringify(json))
	mui.ajax(uri+'Report/Getreportrecord',{
        dataType:'json',
        data: json,
        type:'post',
        success:function(data){
        	if(data.code == 202){
            	plus.runtime.restart()
            }
        	console.log(JSON.stringify(data))
        	$('.record-details').empty()
        	var html = ''
            if(data.code == 1){
            	$.each(data.info,function(i,v){
                    html += '<li>'
            	    html += '<div class="item long"><p>日期</p><strong>'+v.date+'</strong></div>' 
            	    html += '<div class="item"><p>充值</p><strong>'+v.totalrecharge+'</strong></div>' 
            	    html += '<div class="item"><p>提款</p><strong>'+v.totalwithdrawals+'</strong></div>'
            	    html += '<div class="item"><p>投注总额</p><strong>'+v.totalbetting+'</strong></div>' 
            	    html += '<div class="item"><p>返点总额</p><strong>'+v.totalrebate+'</strong></div>' 
            	    html += '<div class="item"><p>中奖总额</p><strong>'+v.totalwinning+'</strong></div>'
            	    html += '<div class="item"><p>活动奖金</p><strong>'+v.totalactivity+'</strong></div>' 
            	    html += '<div class="item"><p>其他活动</p><strong>'+v.totalwage+'</strong></div>' 
            	    html += '<div class="item"><p>转出</p><strong>'+v.totaltransfer+'</strong></div>' 
            	    html += '<div class="item"><p>转入</p><strong>'+v.totaltransaction +'</strong></div>' 
            	    html += '<div class="item"><p>系统分红</p><strong>'+v.totalbonus+'</strong></div>' 
            	    html += '<div class="item"><p>其他</p><strong>'+v.totalother+'</strong></div>' 
            	    html += '<div class="item"><p>盈亏</p><strong>'+v.alltotal+'</strong></div>'
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
