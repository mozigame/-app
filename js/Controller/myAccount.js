/*
 * 个人资料
 */
if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}
mui('#topBar').on('tap', '#back', function(e) {
    plus.webview.currentWebview().close()
});
mui('#air').on('tap', '#submit', function(e) {
	security();
});
function plusReady(){
	
}
mui('#air').on('tap', '#ques', function(e) {
	$(this).children('option:eq(0)').attr('disabled','disabled');
});
mui('#air').on('change','#ques',function(e){
		var op=$(this).val();
		$('#op').val(op)
	})
function security(){
	plus.nativeUI.showWaiting();
	var op=$('#op').val();
	console.log(op)
	var answer=$('#dA').val();
	var drawword=$('#pwd').val();
	var json={
		'sign':sign,
		'user_id':user_id,
		'token':token,
		'question':op,
		'answer':answer,
		'drawword':drawword,
	}
	console.log(JSON.stringify(json))
	mui.ajax(uri+'Account/Security',{
		dataType:'json',
		data:json,
		type:'post',
		success:function(data){
			console.log(JSON.stringify(data))
			if(data.code == 202){
            	plus.runtime.restart()
            }
			switch (data.code){
				case 0:
					toast('设置失败 ')
				break;
				case 1:
					toast('设置成功 ')
					break;
				case 2:
					toast('安全问题为空 ')
					break;
				case 3:
					toast('安全问题答案为空 ')
					break;
				case 4:
					toast('请提供资金密码 ')
					break;
				case 5:
					toast('资金密码不正确 ')
					break;
				case 6:
					toast('密保不可重复设置 ')
					break;
				
			}
			plus.nativeUI.closeWaiting();
			
		}
	})
}
