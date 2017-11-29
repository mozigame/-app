/*
 *  银行卡
 */

if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

function plusReady() {
	getCardsList()
	if(plus.webview.getWebviewById('setCards')){
		plus.webview.getWebviewById('setCards').close()
	}
}

mui('#topBar').on('tap', '#back', function(e) {
    plus.webview.currentWebview().close()
});

mui('#banklist').on('tap', '#blindcard', function(e) {
    var count = $('#banklist li').size()
    if(count > 5){
    	toast("绑定的银行卡数量不能超过5张")
    }else{
    	openWV('setCards.html','setCards','right','')
    }
});

function getCardsList(){
	mui.ajax(uri+'Account/GetBindBankList',{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign},
        type:'post',
        success:function(data){
        	$('#banklist ul').empty()
        	console.log(JSON.stringify(data))
            plus.nativeUI.closeWaiting()
            if(data.code == 202){
            	plus.runtime.restart()
            }
            if(data.code == 1){
            	if(typeof(data.data) == 'undefined'){
            		toast("您未绑定银行卡，请先绑定")
            		openWV('setCards.html','setCards','right','')
            	}else{
            		var html = ''
            		$.each(data.data, function(i,v) {
            			html += '<li><span>开户行：<strong>'+v.bank+'</strong></span><span>持卡人：<strong>'+v.real_name+'</strong></span><span>卡号：<strong>****'+v.card_no.substr(v.card_no.length-3,3)+'</strong></span></li>'	
            		});
            		$('#banklist ul').append(html)
            	}
            }else{
            	toast("您未绑定银行卡，请先绑定")
            	openWV('setCards.html','setCards','right','')
            }
        },
        error:function(xhr,type,errorThrown){
        	plus.nativeUI.showWaiting()
            getCardsList()
        }
    })
}

