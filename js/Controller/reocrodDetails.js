if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}
function plusReady() {
	var wv = plus.webview.currentWebview()
	var xid = wv.value
	console.log(xid)
	getList(xid)
}
mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close()
});
function getList(id){
	plus.nativeUI.showWaiting()
	mui.ajax(uri+'Play/GetBetRecordDetail',{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign,'dan':id},
        type:'post', 
        success:function(data){
        	if(data.code == 202){
            	plus.runtime.restart()
            }
        	console.log(JSON.stringify(data))
        	var html = ''
            if(data.code == 1){
            	html += '<li>'
            	html += '<div class="item long"><p>订单号</p><strong>'+data.dan+'</strong></div>' 
            	html += '<div class="item"><p>用户名</p><strong>'+data.username+'</strong></div>' 
            	html += '<div class="item"><p>订单时间</p><strong>'+data.adddate+'</strong></div>' 
            	html += '<div class="item"><p>彩种</p><strong>'+data.lottery+'</strong></div>' 
            	html += '<div class="item"><p>玩法</p><strong>'+data.mid+'</strong></div>' 
            	html += '<div class="item"><p>期数</p><strong>'+data.issue+'</strong></div>' 
            	html += '<div class="item"><p>注数</p><strong>'+data.zhushu+'</strong></div>' 
            	html += '<div class="item"><p>中奖注数</p><strong>'+data.winning_zhushu+'</strong></div>' 
            	html += '<div class="item"><p>倍数</p><strong>'+data.times+'</strong></div>'
            	
            	if(data.rxw != ''){
            		html += '<div class="item"><p>位置</p><strong>'+data.rxw+'</strong></div>'
            		}else{
            	   html += '<div class="item"><p>位置</p><strong>无</strong></div>' 		
            	}
            	html += '<div class="item"><p>返点</p><strong>'+data.flevel_fd+'</strong></div>'
            	if(data.mode == '1'){
            	   html += '<div class="item"><p>模式</p><strong>元模式</strong></div>' 	
            	}else if(data.mode == '0.1'){
            	   html += '<div class="item"><p>模式</p><strong>角模式</strong></div>' 	
            	}else if(data.mode == '0.01'){
            	   html += '<div class="item"><p>模式</p><strong>分模式</strong></div>' 	
            	}else{
            	   html += '<div class="item"><p>模式</p><strong>厘模式</strong></div>' 		
            	}
            	html += '<div class="item"><p>投注金额</p><strong>'+data.money+'</strong></div>'
            	html += '<div class="item"><p>奖金</p><strong>'+data.pirze+'</strong></div>'
            	if(data.kjcode == ''){
            		html += '<div class="item"><p>开奖号码</p><strong>暂无</strong></div>' 
            	}else{
            		html += '<div class="item"><p>开奖号码</p><strong>'+data.kjcode+'</strong></div>' 
            	}
            	html += '<div class="item"><p>奖金组</p><strong>'+data.flevel_modes+'</strong></div>'
            	if(data.status == '1'){
            		html += '<div class="item "><p>状态</p><strong>未开奖</strong></div>' 
            	}else if(data.status == '2'){
            		html += '<div class="item "><p>状态</p><strong>未中奖</strong></div>' 
            	}else if(data.status == '3'){
            		html += '<div class="item "><p>状态</p><strong>已中奖</strong></div>' 
            	}else if(data.status == '4'){
            		html += '<div class="item "><p>状态</p><strong>已删除</strong></div>' 
            	}else if(data.status == '5'){
            		html += '<div class="item "><p>状态</p><strong>撤单</strong></div>' 
            	}else if(data.status == '6'){
            		html += '<div class="item "><p>状态</p><strong>停止</strong></div>' 
            	}
           	html += '<div class="" style = "padding:0 10px;"><p>投注号码</p><textarea rows="5" disabled>'+data.codes+'</textarea></div>' 
           	html += '<li>'
            }else{
//          	toast("请求失败")
            }
            $('.record-details').append(html)
            plus.nativeUI.closeWaiting()
        }
    })       
}
