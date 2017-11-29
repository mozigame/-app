/*
 * 登录页面处理
 */

//var new_uri;
if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}
function plusReady() {
	plus.navigator.setStatusBarStyle("UIStatusBarStyleDefault");
	plus.navigator.setStatusBarBackground("#f7f7f7");
	toast('您还没有登录，请先登录')
	if(plus.webview.getWebviewById('index')){
	   plus.webview.getWebviewById('index').close()	
	}
	
	if(username){
		document.getElementById("username").value = username
	}
	
	if(window.localStorage['password']){
		document.getElementById("password").value = window.localStorage['password']
	}
	
	var index = $('.box span.active').attr('rel')
	showLine(index)
}

mui('#login').on('tap', '.box span', function(e) {
	$('.box span').removeClass('active')
	$(this).addClass('active')
	var index = $(this).attr('rel')
	showLine(index)
})

mui('#login').on('tap', '#login-btn', function(e) {
	var username = document.getElementById("username").value
	var password = document.getElementById("password").value
	/*console.log(username)
	console.log(password)*/
	/*var new_uri = $('.testnet-work').children('option:selected').attr('data-url');
	localStorage.setItem("uri", new_uri);*/
	
	if($('.box span.active').attr('rel') == '1'){
	     localStorage.setItem("serverUri", "https://f88.live800.com/live800/chatClient/chatbox.jsp?companyID=870889&configID=147812&jid=9040814606&s=1");	
	}else{
		 localStorage.setItem("serverUri", "https://f88.live800.com/live800/chatClient/chatbox.jsp?companyID=870889&configID=147812&jid=9040814606&s=1");
	}
	
	if(username=='' || password==''){
		toast('账号名称和密码不能为空，请重试')
	}else{
		console.log(username)
		console.log(password)
		console.log(sign)
		/*
		 *等待 
		  */
        plus.nativeUI.showWaiting()
	    mui.ajax(uri+'User/Login',{
            dataType:'json',
            data: {'user_name':username,'password':password,'sign':sign},
            type:'post',
            success:function(data){
            	console.log(JSON.stringify(data))
                plus.nativeUI.closeWaiting()
                switch (data.code){
                	case 0 :
                	  toast('用户名或者密码为空 ')
                	  break;
                	case 2 :
                	  toast('用户名不存在')
                	  break;
                	case 3 :
                	  toast('系统已锁定改账号')
                	  break;
                	case 4 :
                	  toast('密码错误次数超过了最大的重试次数')
                	  break;
                	case 5 :
                	  toast('ip被限制登录')
                	  break;
                	case 6 :
                	  toast('密码错误')
                	  break;
                	case 101 : case 201 :
                	  toast('权限错误')
                	  break;
                	default :
                	  window.localStorage['token'] = data.info.token
                      window.localStorage['username'] = data.info.user_name
                      window.localStorage['password'] = password
                      window.localStorage['user_id'] = data.info.user_id
                  	  openWV('../Index/index.html','index','right',JSON.stringify(data.info))
                	  break;
                }
            }
        });
   }
});


function showLine(index){
	var html
	if(index == '1'){
		//html = '<div class="tn1"><select class="testnet-work"><option data-url="https://www.fubo688.com/api/">线路一</option><option data-url="https://www.fubo99.com/api/">线路二</option><option data-url="http://www.fubo088.com/api/">线路三</option><option data-url="http://www.fubo288.com/api/">线路四</option><option data-url="http://www.fubo89.com/api/">线路五</option><option data-url="http://www.7893275.cn/api/">线路六</option></select></div>'
	    html = '<div class="tn1"><select class="testnet-work"><option data-url="https://www.fubo99.com/api/">线路一</option><option data-url="http://www.fubo088.com/api/">线路二</option><option data-url="http://www.fubo288.com/api/">线路三</option><option data-url="http://www.fubo89.com/api/">线路四</option><option data-url="http://www.7893275.cn/api/">线路五</option></select></div>'
	}else{
		html = '<div class="tn2"><select class="testnet-work"><option data-url="http://www.3328895.cn/api/">线路一</option><option data-url="http://www.3328896.cn/api/">线路二</option></select></div>'
	}
	$('.network').html(html)
}

//<option data-url="http://www.fubo088.com/api/">线路一</option><option data-url="http://www.fubo98.com/api/">线路二</option><option data-url="https://www.fubo99.com/api/">线路三</option>