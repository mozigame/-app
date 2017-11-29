var s_date,e_date;
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
if(Number(day) < 10) day = '0' + day    

window.addEventListener('refresh', function(e){//执行刷新
//  location.reload();
plusReady() 

});

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
//        var cur_date = $('#date-menu a.mui-active').attr('id');
//        getList(cur_date)
$('.record-details').empty()
 mui('#refreshContainer').pullRefresh().refresh(false);
      }
    }
  }
});
   
//function getView(
//	getResearch(861);
//);
mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close()
});

mui('#selectDate').on('tap', '.search', function(e) {
    //var cur_date = $('#date-menu .active').attr('id');
    //getList(cur_date)
    //sousuo
    var member_id = $('.member_name').val()
    console.log(member_id)
    getResearchName(member_id)
//  mui('#refreshContainer').pullRefresh().refresh(true);
});

//mui('#date-menu').on('tap', 'a', function(e) {
//  var cur_date = $(this).attr('id');
//  getList(cur_date)
//  mui('#refreshContainer').pullRefresh().refresh(true);
//});



mui('#recent-list').on('tap','.xaj',function(e){
	//查看下级
	var json_xj = {
    	"p_id":$(this).attr('pid'),
    	"u_id":$(this).attr('uid'),
    	"u_name":$(this).attr('uname')
    }
 		console.log(JSON.stringify(json_xj))
	openWV('memberdetails.html','memberdetails','right',json_xj)
});


mui('#recent-list').on('tap','.bj',function(e){
	//编辑
	var json_bj = {
    	"username":$(this).attr('xid'),
    	"user_id": $(this).attr('xname'),
    	"fd":$(this).attr('fd'),
    	"ufd":$(this).attr('ufd'),
    	"szfd":window.localStorage['szfd']
    }
	console.log(JSON.stringify(json_bj))
	
	openWV('memberfd.html','memberfd','right',json_bj)
});

mui('#recent-list').on('tap','.zz',function(e){
	//转账
	var json_zz = {
    	"username":$(this).attr('xid'),
    	"user_id": $(this).attr('xname'),
    	
    }
	console.log(JSON.stringify(json_zz))
	openWV('memberzhuan.html','memberzhuan','right',json_zz)
});

//mui('body').on('tap', '#customSearch', function(e) {
//  var s_date = $('#s_date').val()
//  var e_date = $('#e_date').val()
//  if(s_date == '' || e_date == ''){
//      toast('请输入时间')
//  }else{
//      getReport(s_date+' 00:00:00',e_date+' 23:59:59')
//      $('.dateBar,.date-mask').hide()
//  }
//});

//mui('#recent-list').on('tap', '.check', function(e) {
//  var tmp = $(this).attr('href')
//  var json = {
//  	"username":$(this).attr('rel'),
//  	"user_id": $(this).attr('data-id')
//  }
//  openWV(tmp,tmp,'right',json)
//});


function plusReady() {
	var date = $('#date-menu a.mui-active').attr('id');
	$('.record-details').empty()
		getUserszfd();
	getResearch(user_id);
}
// mui('#refreshContainer').pullRefresh().refresh(true);
//	getList(date)
function getUserszfd(){
	var jsonsz = {'user_id':user_id,'token':token,'sign':sign};
	console.log(JSON.stringify(jsonsz));
	mui.ajax(uri+'Agentmanage/GetRebate',{
		dataType:'json',
		data:{'user_id':user_id,'token':token,'sign':sign},
		type:'post',
		success:function(data){
			if(data.info.code==1){
				window.localStorage['szfd'] = data.info.flevel_banker_fd;
				console.log(data.info.flevel_banker_fd);
			}
		}
	})
};



//搜索
function getResearch(n){
	plus.nativeUI.showWaiting()
	var json = {'user_id':user_id,'token':token,'pve_id':n,'sign':sign,'page_no':1,'page_size':10}
	console.log(JSON.stringify(json))
	mui.ajax(uri+'Report/GetUserOnline',{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'pve_id':n,'sign':sign,},
        type:'post',
        success:function(data){
        	console.log(JSON.stringify(data))
        	$('.record-details').empty()
        	$('.member_name').val('')
        	var str = data.data
        	var html = ''
            if(data.code == 1){
            	console.log(JSON.stringify(data.info))
            	$.each(data.info,function(i,v){
            	     
            		html+='<li  >'+
			'				<div class="mui-clearfix ck">'+
			'					<p class="fl" id=“name”><span>用户名：</span>'+v.username+'</p>'+
			'					<p class="fr xaj pveid="'+v.user_id+'" pid="'+v.user_id+'" uid="'+user_id+'" uname="'+n+'">查看下级</p>'+
			'				</div>'+
			'				<ul class="mui-clearfix xuan">'+
			'					<li>最后登录：<span>'+v.lastdate+'</span></li>'+
			'					<li class="fl">可用余额：<span>'+v.money+'</span></li>'+
			'					<li class="fl">在线状态：<span class="status">'+v.online+'</span></li>'+
			'					<li class="fl">上庄返点：<span>'+v.banker_rebate+'</span></li>'+
			'					<li  class="fl"><span class="bj"  fd ="'+v.banker_rebate+'" ufd="'+v.user_fd+'" xid="'+v.user_id+'" xname="'+v.username+'">编辑</span><span class="zz"  xid="'+v.user_id+'" xname="'+v.username+'">转账</span></li>'+
			'					'+
			'				</ul>'+
			'			</li>';
//                   html += '<li><div class="item"><div class="label"><strong>'+v.username+'</strong>'
//                   html += '<p><img src="../../images/table/teammember.png" width="15" />团队成员</p></div></div>'
//                   html += '<div class="item"><div class="label"><strong>'+v.balance+'</strong>'
//                   html += '<p><img src="../../images/table/totalmoney.png" width="15" />余额</p></div></div>'
//                   html += '<div class="item"><div class="label"><strong>'+v.vip_level+'</strong>'
//                   html += '<p><img src="../../images/table/under.png" width="15" />类型</p></div></div>'
//                   html += '<div class="item"><div class="label"><strong><a href="memberdetails.html" class="check" data-id="'+v.user_id+'">查看</a></strong>'
//                   html += '<p><img src="../../images/table/newmember.png" width="15" />操作</p></div></div>'
//                   html += '</li>'
					if(v.online==0){
            			$('.status').html('离线')
            		}
            		else{
            			$('.status').html('在线')
            		}
              })
            }else{
            	toast("没有数据")
            }
        	$('.record-details').append(html)
            plus.nativeUI.closeWaiting()
     //mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }
    })
}
//chaxun

function getResearchName(member_id){
	plus.nativeUI.showWaiting()
	var json = {'user_id':user_id,'token':token,'pve_id':user_id,'sign':sign,'page_no':1,'page_size':10,'username':member_id}
	console.log(JSON.stringify(json))
	mui.ajax(uri+'Report/GetUserOnline',{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'pve_id':user_id,'sign':sign,'username':member_id},
        type:'post',
        success:function(data){
        	console.log(JSON.stringify(data))
        	$('.record-details').empty()
        	$('.member_name').val('')
        	var str = data.data
        	var html = ''
            if(data.code == 1){
            	$.each(data.info,function(i,v){            		
            			html+='<li  >'+
			'				<div class="mui-clearfix ck">'+
			'					<p class="fl" id=“name”><span>用户名：</span>'+v.username+'</p>'+
			'					<p class="fr xaj" pveid="'+v.user_id+'" pid="'+v.user_id+'" uid="'+user_id+'" uname="'+v.username+'">查看下级</p>'+
			'				</div>'+
			'				<ul class="mui-clearfix xuan">'+
			'					<li>最后登录：<span>'+v.lastdate+'</span></li>'+
			'					<li class="fl">可用余额：<span>'+v.money+'</span></li>'+
			'					<li class="fl">在线状态：<span class="status">'+v.online+'</span></li>'+
			'					<li class="fl">上庄返点：<span>'+v.banker_rebate+'</span></li>'+
			'					<li  class="fl"><span class="bj" xid="'+v.user_id+'" ufd="'+v.user_fd+'" xname="'+v.username+'">编辑</span> <span class="zz"  xid="'+v.user_id+'" xname="'+v.username+'">转账</span></li>'+
			'					'+
			'				</ul>'+
			'			</li>';
					if(v.online==0){
            			$('.status').html('离线')
            		}
            		else{
            			$('.status').html('在线')
            		}            	    
              })
            }else{
            	toast("没有数据")
            }
        	$('.record-details').append(html)
            plus.nativeUI.closeWaiting()
     //mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }
    })
}