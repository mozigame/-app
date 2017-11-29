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
	 json_zz = wv.value
	console.log(JSON.stringify(json_zz))
		$('#old-pwd').val(json_zz.user_id)
}

mui('#topBar').on('tap', '#back', function(e) {
	var list = plus.webview.currentWebview().opener();
	mui.fire(list, 'refresh');
        console.log(JSON.stringify(list));
	plus.webview.currentWebview().close()
});

mui('#air').on('tap', '#submit', function(e) {
	plus.nativeUI.showWaiting()
	var pmon = document.getElementById("the-pwd").value
	var ppwd = document.getElementById("con-pwd").value
	var z_type = document.getElementById("zz_type").value
	if(pmon=='' || ppwd==''){
		toast('金额和密码不能为空，请重试')
	}else{
		 plus.nativeUI.showWaiting()
		 console.log(z_type);
		mui.ajax(uri+'Cash/TransFer',{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign,'z_user_id':json_zz.username,'drawword':ppwd,'price':pmon,ztype:z_type},
        type:'post',
        
        success:function(data){
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
                	  toast('2秒内不能重覆提交')
                	  break;
                	case 3 :
                	  toast('转账金额必须大于100小于50000.且为整数')
                	  break;
                	case 4 :
                	  toast('资金密码有误')
                	  break;
                	  case 5 :
                	  toast('余额不足')
                	  break;
                	   case 6 :
                	  toast('只允许转账给自己团队的人')
                	  break;
                	  
                }
}      
   });
  }
});