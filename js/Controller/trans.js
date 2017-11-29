/*
 * 转账
 */
if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close();
	var mo=localStorage.getItem('banker_balance')
	openWV('index.html','index','right',mo)
});

function plusReady(){
	var bouns=localStorage.getItem('balance');
	var mo=localStorage.getItem('banker_balance');
	$('#mo').html(mo);
	$('#bouns').html(bouns);
}

mui('.input_item').on('change','#u_username',function(){
	var val=$(this).children('option:selected').attr('value');
	var txt=$(this).children('option:not(:selected)').html();
	if(val==1){
		$('#ru').val(txt)
		$('#ru').attr('val',val)
	}
	else if(val==2){
		$('#ru').val(txt)
		$('#ru').attr('val',val)
	}
})
mui('.input_item').on('tap','#submit',function(){
	transFer();
})
mui('#topBar').on('tap','#refresh',function(){
//	window.location.reload();
	getUserInfo();
})
function transFer(){
	plus.nativeUI.showWaiting()
	var type_id=$('#ru').attr('val');
	var drawword=$('#pwd').val();
	var price=$('#money').val();
	var json={
		'sign':sign,
		'token':token,
		'user_id':user_id,
		'type_id':type_id,
		'drawword':drawword,
		'price':price
	}
	if(price == '' || drawword == ''){
		toast("您填写的信息不完整")
		
	}else{
		mui.ajax(uri+'Room/TransFer',{
		data:json,
		dataType:'json',
		type:'post',
		success:function(data){
			console.log(JSON.stringify(data))
			console.log(JSON.stringify(json))
//			if(data.code == 202){
//          	plus.runtime.restart()
//          }
			if(data.code==1){
				toast('转账成功')
			}
			else if(data.code==2){
				toast('2秒内不能重覆提交')
			}
			else if(data.code==3){
				toast('转账不正确')
			}
			else if(data.code==4){
				toast('转账金额不在范围内')
			}
			else if(data.code==5){
				toast('资金密码有误')
			}
			else if(data.code==6){
				toast('余额不足')
			}
			
		}
		
	})
	}
		
		plus.nativeUI.closeWaiting()
	
}
function getUserInfo(){
	plus.nativeUI.showWaiting()
	mui.ajax(uri+'Account/GetUserInfo',{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign},
        type:'post',
        
        success:function(data){
        	console.log(JSON.stringify(data))
        	if(data.code == 202){
            	plus.runtime.restart()
           }
            if(data.code == 1){
            	console.log(JSON.stringify(data))
            	window.localStorage['flevel_fd'] = data.flevel_fd
            	window.localStorage['balance'] = data.balance;
            	window.localStorage['banker_balance'] = data.banker_balance;
            	document.getElementById("bouns").innerHTML = data.balance
            	document.getElementById("mo").innerHTML = data.banker_balance
            }else{
            	toast('请求失败')
            }
        }
    })  
    plus.nativeUI.closeWaiting()
}