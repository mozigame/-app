if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

function plusReady() {
	var wv = plus.webview.currentWebview()
	var id = wv.value
	console.log(typeof id,user_id,token,sign);
	id.user_id = user_id;
	id.token = token;
	id.sign = sign;
	console.log(JSON.stringify(id))
	getList(id)
}

mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close()
});

function getList(id){
	
	plus.nativeUI.showWaiting()
	mui.ajax(uri+'Report/TeamBetRecord',{
        dataType:'json',
        data: id, 
        type:'post',
        
        success:function(data){
        	if(data.code == 202){
            	plus.runtime.restart()
           }
        	console.log(JSON.stringify(data))
        	var html = ''
        	var info=data.info;
            if(data.code == 1){
            	html += '<li>'
            	html += '<div class="item long"><p>订单号</p><strong>'+info[0].dan+'</strong></div>' 
            	html += '<div class="item"><p>用户名</p><strong>'+info[0].username+'</strong></div>' 
            	html += '<div class="item"><p>订单时间</p><strong>'+info[0].adddate+'</strong></div>' 
            	html += '<div class="item"><p>彩种</p><strong>'+info[0].lottery_name+'</strong></div>' 
            	html += '<div class="item"><p>玩法</p><strong>'+info[0].mid+'</strong></div>' 
            	html += '<div class="item"><p>期数</p><strong>'+info[0].issue+'</strong></div>' 
            	html += '<div class="item"><p>倍数</p><strong>'+info[0].times+'</strong></div>'
            	if(info[0].mode == '1'){
            	   html += '<div class="item"><p>模式</p><strong>元模式</strong></div>' 	
            	}else if(info[0].mode == '0.1'){
            	   html += '<div class="item"><p>模式</p><strong>角模式</strong></div>' 	
            	}else if(info[0].mode == '0.01'){
            	   html += '<div class="item"><p>模式</p><strong>分模式</strong></div>' 	
            	}else{
            	   html += '<div class="item"><p>模式</p><strong>厘模式</strong></div>' 		
            	}
//          	html += '<div class="item"><p>奖金模式</p><strong>'+info[0].flevel_modes+'</strong></div>'
            	html += '<div class="item"><p>中奖金额</p><strong>'+info[0].pirze+'</strong></div>'
            	if(info[0].kjcode == ''){
            		html += '<div class="item"><p>开奖号码</p><strong>暂无</strong></div>' 
            	}else{
            		html += '<div class="item"><p>开奖号码</p><strong>'+info[0].kjcode+'</strong></div>' 
            	}
            	if(info[0].status == '1'){
            		html += '<div class="item"><p>状态</p><strong>未开奖</strong></div>' 
            	}else if(info[0].status == '2'){
            		html += '<div class="item"><p>状态</p><strong>未中奖</strong></div>' 
            	}else if(info[0].status == '3'){
            		html += '<div class="item"><p>状态</p><strong>已中奖</strong></div>' 
            	}else if(info[0].status == '4'){
            		html += '<div class="item"><p>状态</p><strong>已删除</strong></div>' 
            	}else if(info[0].status == '5'){
            		html += '<div class="item"><p>状态</p><strong>撤单</strong></div>' 
            	}else if(info[0].status == '6'){
            		html += '<div class="item"><p>状态</p><strong>停止</strong></div>' 
            	}
            	html += '<div class=""><p>投注号码</p><textarea rows="5" disabled>'+info[0].codes+'</textarea></div>' 
            	html += '</li>'
            }else{
            	toast("请求失败")
            }
            $('.record-details').append(html)
            plus.nativeUI.closeWaiting()
        }
    })       
}
