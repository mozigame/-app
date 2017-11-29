

if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}
mui.init({
    beforeback: function() {
        var list = plus.webview.currentWebview().opener();
        console.log(list);
        mui.fire(list, 'refresh');
        return true;
    }
});
function plusReady() {
	var wv = plus.webview.currentWebview()
	 json_bj = wv.value
	console.log(json_bj.user_id)
	 plus.nativeUI.showWaiting()
	$('#old-pwd').val(json_bj.user_id)
	$('#new-pwd').val(json_bj.ufd)
	$('#con-pwd').val(json_bj.fd)
	$('#a2').val(json_bj.fd)
	$('#aaa').empty()
        	var str = json_bj.fd
        	var html = '<p>提示：彩票返点范围（'
        	+
        	json_bj.ufd +'-'+ flevel_fd +'）&nbsp;&nbsp;上庄返点范围（'+json_bj.fd+'-'+ json_bj.szfd +'）</p>'
        	$('#aaa').append(html)
        	 plus.nativeUI.closeWaiting()
}

mui('#topBar').on('tap', '#back', function(e) {
	var list = plus.webview.currentWebview().opener();
	mui.fire(list, 'refresh');
        console.log(JSON.stringify(list));
	plus.webview.currentWebview().close()
});

//function getList(json_bj){
//	plus.nativeUI.showWaiting()
//	$('#old-pwd').html(json_bj.xname)
mui('#air').on('tap', '#submit', function(e) {
	plus.nativeUI.showWaiting()
	var fd = document.getElementById("new-pwd").value
	var szfd = document.getElementById("con-pwd").value
	if(fd=='' || szfd==''){
		toast('返点值不能为空，请重试')
	}else{
		//修改下级返点
		 plus.nativeUI.showWaiting()
		 var kda = {'old_cf':json_bj.ufd,'old_sf':json_bj.fd}
		 console.log(JSON.stringify(kda));
		 if(fd>=json_bj.ufd||szfd>=json_bj.fd){
		 	var jsonu =  {'user_id':user_id,'token':token,'sign':sign,'xid':json_bj.username,'flevel_fd':fd,'flevel_banker_fd':szfd}
		mui.ajax(uri+'AgentManage/UpdateRebate',{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign,'xid':json_bj.username,'flevel_fd':fd,'flevel_banker_fd':szfd},
        type:'post',
        
        success:function(data){
        	console.log(json_bj.username)
        	console.log(JSON.stringify(data))
                plus.nativeUI.closeWaiting()
                switch (data.code){
                	case 0 :
                	  toast('失败 ')
                	  break;
                	case 1 :
                	  toast('成功')
                	  break;
                	case 2 :
                	  toast('下级返点不能高于代理返点')
                	  break;
                	case 3 :
                	  toast('下级棋牌返点不能高于代理棋牌返点')
                	  break;
                	case 4 :
                	  toast('下级庄家返点不能高于代理庄家返点')
                	  break;
                }
}      
   		});}else{
   		toast('给下级改返点值，需要比原来的返点值高!');
		 	window.location.reload();
		 
   	}
  }
});

	