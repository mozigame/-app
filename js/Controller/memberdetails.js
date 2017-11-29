if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

function plusReady() {
	var wv = plus.webview.currentWebview()
	 json_xj = wv.value
	console.log(json_xj.u_id)
	//$('#old-pwd').val(json_xj.user_id)
//	getList(json_bj)
	getResearch(json_xj)
}
window.addEventListener('refresh', function(e){//执行刷新
    location.reload();
});

mui('#recent-list').on('tap','.xaj',function(e){
	//查看下级
	var json_xj = {
    	"p_id":$(this).attr('pid'),
    	"u_id":$(this).attr('uid'),
    	"u_name":$(this).attr('uname')
    }
 		console.log(JSON.stringify(json_xj))
	//openWV('memberdetails.html','memberdetails','right',json_xj)
	getResearch(json_xj);
});


mui('#recent-list').on('tap','.bj',function(e){
	//编辑
	var json_bj = {
    	"username":$(this).attr('xid'),
    	"user_id": $(this).attr('xname'),
    	"fd":$(this).attr('fd')
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


function getResearch(jsonx){
	//plus.nativeUI.showWaiting()
	//var json = {'user_id':user_id,'token':token,'pve_id':n,'sign':sign,'page_no':1,'page_size':10}
	var jsonxj = {'user_id':jsonx.u_id,'pve_id':jsonx.p_id,'token':token,'sign':sign};
	console.log(JSON.stringify(jsonxj));
	mui.ajax(uri+'Report/GetUserOnline',{
        dataType:'json',
        data: jsonxj,
        type:'post',
        success:function(data){
        	if(data.code==0){
        		$('.record-details').empty()
        		mui.toast('此账号下级无成员');}
        	if(data.code==1){
        		console.log(JSON.stringify(data.info));
        		$('.record-details').empty()
        	$('.member_name').val('')
        	var str = data.data
        	var html = ''
            	$.each(data.info,function(i,v){
            	     
            		html+='<li>'+
			'				<div class="mui-clearfix ck">'+
			'					<p class="fl" id=“name”><span>用户名：</span>'+v.username+'</p>'+
			'					<p class="fr xaj pveid="'+v.user_id+'" pid="'+v.user_id+'" uid="'+user_id+'">查看下级</p>'+
			'				</div>'+
			'				<ul class="mui-clearfix xuan">'+
			'					<li>最后登录：<span>'+v.lastdate+'</span></li>'+
			'					<li class="fl">可用余额：<span>'+v.money+'</span></li>'+
			'					<li class="fl">在线状态：<span class="status">'+v.online+'</span></li>'+
			'					<li class="fl">上庄返点：<span>'+v.banker_rebate+'</span></li>'+
			'					<li  class="fl"><span class="zz"  xid="'+v.user_id+'" xname="'+v.username+'">转账</span></li>'+
	
			'				</ul>'+
			'			</li>';

						if(v.online==0){
            			$('.status').html('离线')
            		}
            		else{
            			$('.status').html('在线')
            		}
              })
            $('.record-details').append(html)
            plus.nativeUI.closeWaiting()
            }
        }
      })
}