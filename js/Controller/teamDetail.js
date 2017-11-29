var s_date,e_date;
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
if(Number(month) < 10) month = '0' + month 
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

mui('body').on('tap', '#customSearch', function(e) {
    var s_date = $('#s_date').val()
    var e_date = $('#e_date').val()
    if(s_date == '' || e_date == ''){
        toast('请输入时间')
    }else{
        getReport(s_date+' 00:00:00',e_date+' 23:59:59')
        $('.dateBar,.date-mask').hide()
    }
});

mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close()
	var page = plus.webview.getWebviewById('../User/user.html')
	mui.fire(page, 'reportDataInfo', {
	})
});

mui('#date-menu').on('tap', 'a', function(e) {
    var cur_date = $(this).attr('id');
    getList(cur_date)
//  mui('#refreshContainer').pullRefresh().refresh(true);
});

mui('.record-details').on('tap', '.transfer-btn', function(e) {
    var tmp = $(this).attr('href')
    var json = {
    	"username":$(this).attr('rel'),
    	"user_id": $(this).attr('id')
    }
    openWV(tmp,tmp,'right',json)
});


mui('.record-details').on('tap', '.p1', function(e) {
	var json_uu = {
		 "uid":  $(this).attr('uid'),
			 "uname":  $(this).attr('uname')
	}
//	openWV('teamDetail1.html', 'teamDetail1', 'right', json_uu)
	uid = json_uu.uid;
	 uname = json_uu.uname;
	 var date = $('#date-menu a.mui-active').attr('id');
	 getList(date)
});

function plusReady() {
	var wv = plus.webview.currentWebview()
	 json_uu = wv.value
	 uid = json_uu.uid;
	 uname = json_uu.uname;
	console.log(JSON.stringify(json_uu))
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
     getReport(s_date,e_date,uid,uname)
}

function getReport(s,e,a,b){
	plus.nativeUI.showWaiting()
	var json = {'user_id':a,'token':token,'sign':sign,'search_time_s':s,'search_time_e':e}
	console.log(JSON.stringify(json))//格式化打印日志，其中json是一个对象
	mui.ajax(uri+'Report/GetTeamRecord',{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign,'search_time_s':s,'search_time_e':e,'pve_id':a,'zero':'0'},
        type:'post',
        success:function(data){
//      	if(data.code == 202){
//          	plus.runtime.restart()
//          }
        	//console.log('000000' + data.info.username)
        	//console.log(data.info[0].username);
        	console.log(JSON.stringify(data))
        	$('.record-details').empty()
        	var html = ''
            if(data.code == 1){
            	$.each(data.info,function(i,v){
           
                    html += '<li uid = "'+uid+'">'
            	    html += '<div class="item long "><p >用户名</p><strong>'+v.username+'</strong></div>' 
            	    html += '<div class="item "><p >所属组</p><strong>'+v.rebate_number +'</strong></div>' 
            	    
            	        html += '<div class="item "><p >充值</p><strong>'+v.recharge +'</strong></div>'
            	       html += '<div class="item "><p >提款 </p><strong>'+v.withdrawals  +'</strong></div>'
            	        html += '<div class="item "><p >投注总额</p><strong>'+v.betting  +'</strong></div>'
            	         html += '<div class="item "><p >返点总额</p><strong>'+v.rebate  +'</strong></div>'
            	          html += '<div class="item "><p >中奖总额</p><strong>'+v.winning  +'</strong></div>'
            	           html += '<div class="item "><p >促销奖金</p><strong>'+v.activity  +'</strong></div>'
            	          html += '<div class="item "><p >盈亏</p><strong>'+v.loss  +'</strong></div>'
//          	    console.log(username);
            	   if(v.username != b) {
						html += '<div class="item long"><p class="p1" uid = "' + v.uid + '" uname = "' + v.username + '">查看下级</p><div>'
						//          	       <a id="'+data.info[i].uid+'" rel="'+data.info[i].username+'" href="transfer.html" class="transfer-btn">我要转账</a></div></div>'
					}
					
            	    html += '</li>'

            	//})
            })
            	}else{
            	toast("请求失败")
            }
            $('.record-details').append(html)
            plus.nativeUI.closeWaiting()
//          mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }
  })
}
