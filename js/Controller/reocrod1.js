/*
 * 记录
 */
var init = 1;
var cur_url,s_date,e_date;
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
if(Number(day) < 10) day = '0' + day    
if(Number(month) < 10)month = '0' + month 

//if(window.plus) {
//	plusReady();
//} else {
//	document.addEventListener("plusready", plusReady, false);
//}

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
      		var lottery = $('#record-menu-top a.mui-active').attr('id');
      	  var cur_type = $('#record-menu a.mui-active').attr('id');
          var cur_date = $('#date-menu a.mui-active').attr('id');
          getInfo(lottery,cur_type,cur_date,true) 
      }
    }
  }
});

window.addEventListener('refreshRecord',function(event){
	$('#recent-list').empty()
	init = 1
	plusReady()
});

//一级导航
mui('#record-menu-top').on('tap','a',function(e){
	var lottery=$(this).attr('id');
    if(lottery=='cp'){
    	$('#record-menu').empty();
    	//判断容器
    	$('#record-menu').attr('data-id',1)
    	var html='';
    	html+='<a class="mui-control-item mui-active" id="tz">投注</a>'+
				'	<a class="mui-control-item" id="zh">追号</a>'+
				'	<a class="mui-control-item" id="cz">充值</a>'+
				'	<a class="mui-control-item" id="tx">提现</a>';
				//切换一级导航初始化数据
		
		$('#record-menu').html(html);
		var cur_type = $('#record-menu a.mui-active').attr('id');
		}		 
		else if(lottery=='zz'){
			$('#record-menu').empty();
			$('#record-menu').attr('data-id',2)			
			var html=''
			html+='<a class="mui-control-item mui-active" id="sz">上庄报表</a>'+
					'	<a class="mui-control-item" id="zj">资金明细</a>';
		//切换一级导航初始化数据
		
		$('#record-menu').html(html);
		var cur_type = $('#record-menu a.mui-active').attr('id');
		}
		else if(lottery=='zr'){
			$('#record-menu').empty();
    	var html='';
    	html+='<a class="mui-control-item mui-active" id="tz">投注</a>'+
				'	<a class="mui-control-item" id="zh">追号</a>'+
				'	<a class="mui-control-item" id="cz">充值</a>'+
				'	<a class="mui-control-item" id="tx">提现</a>';
		$('#record-menu').html(html);
		var cur_type = $('#record-menu a.mui-active').attr('id');
		}
		else if(lottery=='qp'){
			$('#record-menu').empty();
    	var html='';
    	html+='<a class="mui-control-item mui-active" id="tz">投注</a>'+
				'	<a class="mui-control-item" id="zh">追号</a>'+
				'	<a class="mui-control-item" id="cz">充值</a>'+
				'	<a class="mui-control-item" id="tx">提现</a>';
		$('#record-menu').html(html);
		var cur_type = $('#record-menu a.mui-active').attr('id');
   }
		var cur_date = $('#date-menu a.mui-active').attr('id');
		getInfo(lottery,cur_type,cur_date,'')
    mui('#refreshContainer').pullRefresh().refresh(true);
})
//二级
mui('#record-menu').on('tap', 'a', function(e) {
	var dataId=$(this).parent().attr('data-id');
	var lottery=$('#record-menu-top a.mui-active').attr('id');	
    var cur_type = $(this).attr('id');
    var cur_date = $('#date-menu a.mui-active').attr('id');
    getInfo(lottery,cur_type,cur_date,'') 
    mui('#refreshContainer').pullRefresh().refresh(true);
});
//三级
mui('#date-menu').on('tap', 'a', function(e) {
	var lottery=$('#record-menu-top a.mui-active').attr('id');
    var cur_type = $('#record-menu a.mui-active').attr('id');
    var cur_date = $(this).attr('id');
    getInfo(lottery,cur_type,cur_date,'') 
    mui('#refreshContainer').pullRefresh().refresh(true);
});

mui('#recent-list').on('tap','.icon-leftarrow',function(){
	var dan = $(this).parents('li').attr('id')
	openWV('details.html','recordDetails','right',dan)
})

mui('#recent-list').on('tap','.cancel',function(){
	var dan = $(this).parents('li').attr('id')
	var lottery = $(this).parents('li').attr('class')
	cancelOrder(dan,lottery,$(this))
})

function plusReady(){
	var lottery=$('#record-menu-top a.mui-active').attr('id');	
	var cur_type = $('#record-menu a.mui-active').attr('id');
    var cur_date = $('#date-menu a.mui-active').attr('id');
    console.log(lottery)
    getInfo(lottery,cur_type,cur_date,'') 
}

function getInfo(lottery,cur_type,cur_date,sta) {
	$('#recent-list').empty()
	if(sta == true){
		init = init+1
	}
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
	console.log(cur_date)
	console.log(lottery)
	console.log(cur_type)
    switch (lottery){ 	
    	case 'cp':
    		switch (cur_type){
    			case 'tz' :
		    	  cur_url = 'Report/GetBetRecord'
		    	  getBetRecord(cur_url,s_date,e_date)
		    	  console.log(cur_url)
		    	  break;
		    	case 'zh':
			    	  cur_url = 'Report/GetChaseRecord'
			      	  getChaseRecord(cur_url,s_date,e_date)
			    	  break;
			    case 'cz':
		    	  cur_url = 'Report/GetRechargeRecord'
		    	  getTopupRecord(cur_url,s_date,e_date)
		    	  break;
		    	 case 'tx':
		    	  cur_url = 'Report/GetdrawRecord'
		    	  getDrawRecord(cur_url,s_date,e_date)
		    	  break;
    		}
    		break;
    	case 'zz':
    	console.log(cur_type)
	    	switch (cur_type){
	    		case 'sz' :
		    	  cur_url = 'RoomReport/BankerRecord'
		    	  bankerRecord(cur_url,s_date,e_date)
		    	  break;
		    	case 'zj':
		    	  cur_url = 'RoomReport/RoomFundDetails'
		      	  roomfundDetails(cur_url,s_date,e_date)
			    break;
	    		}
    		break;
		case 'zr':
			switch (cur_type){
				case 'tz' :
//		    	  cur_url = 'report/getbetrecord'
		    	   toast("稍后开放")
//		    	  getBetRecord(cur_url,s_date,e_date)
		    	  break;
		    	case 'zh':
//			    	  cur_url = 'report/getchaserecord'
			    	  toast("稍后开放")
//			      	  getChaseRecord(cur_url,s_date,e_date)
			    	  break;
			    case 'cz':
//		    	  cur_url = 'report/getrechargerecord'
		    	   toast("稍后开放")
//		    	  getTopupRecord(cur_url,s_date,e_date)
		    	  break;
		    	 case 'tx':
//		    	  cur_url = 'report/getdrawrecord'
		    	   toast("稍后开放")
//		    	  getDrawRecord(cur_url,s_date,e_date)
		    	  break;
	    		}
    		break;
		case 'qp':
			switch (cur_type){
				case 'tz' :
//		    	  cur_url = 'report/getbetrecord'
		    	   toast("稍后开放")
//		    	  getBetRecord(cur_url,s_date,e_date)
		    	  break;
		    	case 'zh':
//			    	  cur_url = 'report/getchaserecord'
			    	  toast("稍后开放")
//			      	  getChaseRecord(cur_url,s_date,e_date)
			    	  break;
			    case 'cz':
//		    	  cur_url = 'report/getrechargerecord'
		    	   toast("稍后开放")
//		    	  getTopupRecord(cur_url,s_date,e_date)
		    	  break;
		    	 case 'tx':
//			    	  cur_url = 'report/getdrawrecord'
			    	   toast("稍后开放")
//			    	  getDrawRecord(cur_url,s_date,e_date)
		    	  break;
	    		}
    		break;
    }
    
    
}

function getBetRecord(url,s,e){
	if($('#pullmore').size()>0){
		init = 1
	}
	plus.nativeUI.showWaiting()
	var json = {'user_id':user_id,'token':token,'sign':sign,'search_time_s':s,'search_time_e':e,'page_no':init,'page_size':10}
	console.log(JSON.stringify(json))
	mui.ajax(uri+url,{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign,'search_time_s':s,'search_time_e':e,'page_no':init,'page_size':10,},
        type:'post',
        success:function(data){
        	console.log(JSON.stringify(data))
        	if(data.code == 202){
            	plus.runtime.restart()
           }
        	var html = ''
            if(data.code == 1){
            	console.log(data.code)
            	  $('#recent-list').empty()
            	  $.each(data.info, function(i,v) {
            		  html += '<li id='+v.dan+' class='+v.lottery_type+'><span>'+v.dan+'</span><span>期号：<b>'+v.issue+'</b></span><span>玩法：<b>'+v.mid+'</b></span>' 
            		  html += '<span>投注金额：<b>'+v.money+'</b></span><span>中奖金额：<b>'+v.pirze+'</b></span>'
            		  if(v.status == 1){
            		  	 html += '<span>状态：<b class="cancel">撤单</b></span>'
            		  }if(v.status == 5){
            		  	 html += '<span>状态：<b class="cancel">已撤单</b></span>'
            		  	 }
            		  html += '<b class="iconfont icon-leftarrow"></b></li>'
            	  });
            	  $('#recent-list').prepend(html)
            	  
            }else if(data.code == 0){
            	toast("没有更多数据了")
            }
            plus.nativeUI.closeWaiting()
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }
    })       
}

function getChaseRecord(url,s,e){
	var json = {'user_id':user_id,'token':token,'sign':sign,'search_time_s':s,'search_time_e':e,}
	console.log(JSON.stringify(json))
	plus.nativeUI.showWaiting()
	mui.ajax(uri+url,{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign,'search_time_s':s,'search_time_e':e},
        type:'post',
        
        success:function(data){
        	console.log(JSON.stringify(data))
            if(data.code == 1){
            	  var html = ''
            	  $.each(data.info, function(i,v) {
            		  html += '<li><span>'+v.record_no+'</span><span>开始期数：<b>'+v.issue+'</b></span><span>玩法：<b>'+v.mid+'</b></span>' 
            		  html += '<span>开始期数：<b>'+v.issue+'</b></span><span>玩法：<b>'+v.mid+'</b></span>' 
            		  html += '<span>投注金额：<b>'+v.money+'</b></span><span>奖金：<b>'+v.pirze+'</b></span>'
            		  html += '<span>投注号码：<b>'+v.code+'</b></span><span>倍数：<b>'+v.times+'</b></span>'
            		  html += '<span>模式：<b>'+v.mode+'</b></span><span>追号期数：<b>'+v.chase_num+'</b></span>'
            		  html += '<span>完成期数：<b>'+v.yes_chase_num+'</b></span><span>完成金额：<b>'+v.yes_chase_pirze+'</b></span>'
            		  html += '</li>'
            	  });
            	  $('#recent-list').prepend(html)
            	  
            }else{
            	toast("没有更多数据了")
            }
            plus.nativeUI.closeWaiting()
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }
    })       
}

function getTopupRecord(url,s,e){
	var json = {'user_id':user_id,'token':token,'sign':sign,'search_time_s':s,'search_time_e':e}
	console.log(JSON.stringify(json))
	plus.nativeUI.showWaiting()
	mui.ajax(uri+url,{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign,'search_time_s':s,'search_time_e':e},
        type:'post',
        
        success:function(data){
        	console.log(JSON.stringify(data))
            if(data.code == 1){
            	  var html = ''
            	  $.each(data.info, function(i,v) {
            	  	  html += '<li>'
            		  html += '<span>订单编号：<b>'+v.dan+'</b></span><span>订单时间：<b>'+v.adddate+'</b></span>' 
            		  html += '<span>充值银行：<b>'+v.bank_name+'</b></span><span>充值方式：<b>'+v.pay_type+'</b></span>'
            		  html += '<span>充值金额：<b>'+v.money+'</b></span>'
            		  if(v.status == 1){
            		  	'<span>状态：<b>成功</b></span>'
            		  }else if(v.status == 2){
            		  	'<span>状态：<b>失败</b></span>'
            		  }else if(v.status == 3){
            		  	'<span>状态：<b>审核中</b></span>'
            		  }else if(v.status == 4){
            		  	'<span>状态：<b>审核失败</b></span>'
            		  }
            		  html += '</li>'
            	  });
            	  $('#recent-list').prepend(html)
            	  
            }else{
            	toast("没有更多数据了")
            }
            plus.nativeUI.closeWaiting()
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }
    })       
}

function getDrawRecord(url,s,e){
	var json = {'user_id':user_id,'token':token,'sign':sign,'search_time_s':s,'search_time_e':e}
	console.log(JSON.stringify(json))
	plus.nativeUI.showWaiting()
	mui.ajax(uri+url,{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign,'search_time_s':s,'search_time_e':e},
        type:'post',
        
        success:function(data){
        	console.log(JSON.stringify(data))
            if(data.code == 1){
            	  var html = ''
            	  $.each(data.info, function(i,v) {
            	  	  html += '<li>'
            		  html += '<span>提现编号：<b>'+v.dan+'</b></span><span>发起时间：<b>'+v.adddate+'</b></span>' 
            		  html += '<span>持卡人姓名：<b>'+v.real_name+'</b></span><span>尾号：<b>'+v.bank_no_tail+'</b></span>'
            		  html += '<span>提现金额：<b>'+v.money+'</b></span><span>到账金额：<b>'+v.rmoney+'</b></span>'
            		  html += '<span>状态：<b>'+v.status_desc+'</b></span>'
            		  if(v.status_desc == 1){
            		  	'<span>状态：<b>未支付</b></span>'
            		  }else if(v.status == 2){
            		  	'<span>状态：<b>已支付</b></span>'
            		  }else if(v.status == 3){
            		  	'<span>状态：<b>拒绝支付</b></span>'
            		  }
            		  html += '</li>'
            	  });
            	  $('#recent-list').prepend(html)
            	  
            }else{
            	toast("没有更多数据了")
            }
            plus.nativeUI.closeWaiting()
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }
    })       
}


function cancelOrder(dan,lottery,obj){
	plus.nativeUI.showWaiting()
	mui.ajax(uri+'Room.Retreat',{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign,'dan':dan,'lottery':lottery},
        type:'post',
        
        success:function(data){
            plus.nativeUI.closeWaiting()
           if(data.code == 0){
            	toast("撤单失败")
            }else if(data.code == 2){
            	toast("未投注")
            }else if(data.code == 3){
            	toast("该期已开奖")
            }else if(data.code == 4){
            	toast("该期已封单")
            }else{
            	console.log(data.code)
            	toast("撤单成功")
            	obj.text("已撤单")
            	obj.css("background-color","#C0C0C0")
            }

        }
    })       
}

function bankerRecord(url,s,e){
	plus.nativeUI.showWaiting();
	var json={
		'sign':sign,
		'user_id':user_id,
		'token':token,
		'search_time_s':s,
		'search_time_e':e,
		'page_no':init,
		'page_size':10,
	};
	mui.ajax(uri+url,{
		dataType:'json',
		data:json,
		type:'post',
		success:function(data){
			console.log(JSON.stringify(data))
			if(data.code == 1){
            	  var html = ''
            	  $.each(data.info, function(i,v) {
            	  	html+='<li><span>期号：<b>'+v.issue+'</b></span>'
            		  html += '<span>投注时间：<b>'+v.adddate+'</b></span><span>房间号：<b>'+v.room_id+'</b></span>' 
            		  html += '<span>彩种：<b>'+v.lottery+'</b></span>' 
            		  html += '<span>玩法：<b>'+v.play+'</b></span>'
            		  html += '<span>投注总额：<b>'+v.betting+'</b></span><span>派奖总额：<b>'+v.winning+'</b></span>'
            		   html += '<span>撤单：<b>'+v.cancel+'</b></span><span>系统抽水：<b>'+v.pumps+'</b></span>'
            		  html += '</li>'
            	  });
            	  $('#recent-list').prepend(html)
            	  
            }else{
            	toast("没有更多数据了")
            }
			plus.nativeUI.closeWaiting()
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
		}
	})
}
function roomfundDetails(url,s,e){
	plus.nativeUI.showWaiting();
	var json={
		'sign':sign,
		'user_id':user_id,
		'token':token,
		'search_time_s':s,
		'search_time_e':e,
	};
	mui.ajax(uri+url,{
		dataType:'json',
		data:json,
		type:'post',
		success:function(data){
			console.log(JSON.stringify(data))
            if(data.code == 1){
            	  var html = ''
            	  $.each(data.info, function(i,v) {
            		  html += '<li><span>'+v.trade_number+'</span><span>交易时间：<b>'+v.trade_time+'</b></span>' 
            		  html += '<span>交易类型：<b>'+v.trade_type+'</b></span>' 
            		  html += '<span>交易金额：<b>'+v.trade_amount+'</b></span>'
            		  html += '<span>即时金额：<b>'+v.account_balance+'</b></span>'
            		  html += '</li>'
            	  });
            	  $('#recent-list').prepend(html)
            	  
            }else{
            	toast("没有更多数据了")
            }
            plus.nativeUI.closeWaiting()
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
		}
	})
}
