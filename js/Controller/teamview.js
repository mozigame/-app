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
          getList(cur_date)
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
	var json = {'user_id':user_id,'token':token,'sign':sign,'startdate':s,'enddate':e}
	console.log(JSON.stringify(json))
	mui.ajax(uri+'Report/TeamView',{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign,'startdate':s,'enddate':e},
        type:'post',
        success:function(data){
        	console.log(JSON.stringify(data))
        	$('.record-details').empty()
        	var str = data
        	var html = ''
            if(data.code == 1){
            	html+='<li>'+'<p ><img src="../../images/team/rs.png"/></p>'+'<p>'+'<span>团队总人数</span>'+'<span>'+str.team_number+'</span>'+'</p>'+'</li>'
				html+='<li>'+'<p ><img src="../../images/team/jq.png"/></p>'+'<p>'+'<span>团队资金</span>'+'<span>'+str.team_balance+'</span>'+'</p>'+'</li>';
				html+='<li>'+'<p ><img src="../../images/team/zc.png"/></p>'+'<p>'+'<span>在线人数</span>'+'<span>'+str.team_online+'</span>'+'</p>'+'</li>';
				html+='<li>'+'<p ><img src="../../images/team/td.png"/></p>'+'<p>'+'<span>团队玩家人数</span>'+'<span>'+str.team_player+'</span>'+'</p>'+'</li>';
				html+='<li>'+'<p ><img src="../../images/team/fx.png"/></p>'+'<p>'+'<span>团队代理人数</span>'+'<span>'+str.team_agent+'</span>'+'</p>'+'</li>';
				html+='<li>'+'<p ><img src="../../images/team/qp.png"/></p>'+'<p>'+'<span>当日有效玩家</span>'+'<span>'+str.todayActive+'</span>'+'</p>'+'</li>';
				html+='<li>'+'<p ><img src="../../images/team/yx.png"/></p>'+'<p>'+'<span>周期内有效玩家</span>'+'<span>'+str.totalActive+'</span>'+'</p>'+'</li>';
            html+='<li>'+'<p ><img src="../../images/team/t1.png"/></p>'+'<p>'+'<span>注册总人数</span>'+'<span>'+str.totalReg+'</span>'+'</p>'+'</li>';
            html+='<li>'+'<p ><img src="../../images/team/t2.png"/></p>'+'<p>'+'<span>登录总人数</span>'+'<span>'+str.totalLogin+'</span>'+'</p>'+'</li>';
            html+='<li>'+'<p ><img src="../../images/team/t3.png"/></p>'+'<p>'+'<span>投注总人数</span>'+'<span>'+str.totalBet+'</span>'+'</p>'+'</li>';
            html+='<li>'+'<p ><img src="../../images/team/t4.png"/></p>'+'<p>'+'<span>充值总额</span>'+'<span>'+str.totalRecharge+'</span>'+'</p>'+'</li>';
            html+='<li>'+'<p ><img src="../../images/team/t5.png"/></p>'+'<p>'+'<span>提现总额</span>'+'<span>'+str.totalWithdrawals+'</span>'+'</p>'+'</li>';
            html+='<li>'+'<p ><img src="../../images/team/t6.png"/></p>'+'<p>'+'<span>投注总额</span>'+'<span>'+str.totalBetting+'</span>'+'</p>'+'</li>';
            html+='<li>'+'<p ><img src="../../images/team/t7.png"/></p>'+'<p>'+'<span>派奖总额</span>'+'<span>'+str.totalWinning+'</span>'+'</p>'+'</li>';
            html+='<li>'+'<p ><img src="../../images/team/t8.png"/></p>'+'<p>'+'<span>返点总额</span>'+'<span>'+str.totalRebate+'</span>'+'</p>'+'</li>';
            html+='<li>'+'<p ><img src="../../images/team/t9.png"/></p>'+'<p>'+'<span>活动总额</span>'+'<span>'+str.totalActivity+'</span>'+'</p>'+'</li>';
            html+='<li>'+'<p ><img src="../../images/team/t10.png"/></p>'+'<p>'+'<span>工资总额</span>'+'<span>'+str.totalWage+'</span>'+'</p>'+'</li>';
            html+='<li>'+'<p ><img src="../../images/team/t11.png"/></p>'+'<p>'+'<span>盈亏总额</span>'+'<span>'+str.totalLoss+'</span>'+'</p>'+'</li>';
            }else{
            	toast("网络请求失败")
            }
        	$('.record-details').append(html)
            plus.nativeUI.closeWaiting()
            //mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }
    })
}
