if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close()
});

function plusReady() {
	var wv = plus.webview.currentWebview()
	$('#u_username').val(wv.value.username)
	$('#u_username').attr('data-id',wv.value.user_id)
}


mui('#air').on('tap', '#submit', function(e) {
	var z_user_id = parseInt($('#u_username').attr('data-id'))
	var draw_money = parseFloat($('#money').val())
	var drawword = $('#pwd').val()
	var json = {
        "token":token,
        "sign":sign,
        "user_id":parseInt(user_id),
        "z_user_id":z_user_id,
        "price":draw_money,
        "drawword":drawword
	}
	
	if(draw_money == '' || drawword == ''){
		return toast("您填写的信息不完整")
	}
	
	if(draw_money > 50000 || draw_money < 100){
		return toast("转账金额的额度是100-50000")
	}
	plus.nativeUI.showWaiting()
	console.log(JSON.stringify(json))
	mui.ajax(uri+'Cash/TransFer',{
        dataType:'json',
        data:json,
        type:'post',
        
        success:function(data){
        	console.log(JSON.stringify(data))
        	if(data.code == 0){
        		toast("转账失败")
        	}else{
        		toast("转账成功")
        	}
            plus.nativeUI.closeWaiting()
        }
    })
	
});