/*
 * 首页处理
 */

if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

//首页banner图处理
var bodH=$('body').width();
var hh=(1/3)*bodH;
var imgHight=$('#bannerImg1').height(hh);
 mui('body').on('tap','#banner1',function(){
    	getLotList()
    })
var width=$('body').width();
var marqueeWi=width-$('.scro span').width();
$('.scro').width(width)
$(".dowebok").width(marqueeWi-100)
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});
//轮播图
var bannerImg = new Swiper ('#bannerImg', {
      direction: 'horizontal',
      slidesPerView : 2.5,
      spaceBetween : 20,
    });
mui.init();
var subpages = ['../Home/home.html', '../Game/gameList.html', '../Record/record.html', '../User/user.html'];
var subpage_style = {
				top: '45px',
				bottom: '51px'
		};
			var aniShow = {};			
function plusReady() {
	console.log(uri)
	//cusTimer = setInterval("getOnlineTime()",600000)
	plus.nativeUI.showWaiting("正在为您加载数据中...");
	getPage() 
	plus.navigator.setStatusBarStyle("UIStatusBarStyleDefault");
	plus.navigator.setStatusBarBackground("#fff");
	if(plus.webview.getWebviewById('login')){
	   plus.webview.getWebviewById('login').close()	
	}
}

/**获取主页面**/
function getPage() {
	var Index = 0;
    var subpages = ['../Home/home.html', '../Game/gameList.html', '../Record/record.html', '../User/user.html'];
	var activeTab = subpages[Index],
		title = document.querySelector(".mui-title");
//		setTimeout(plus.webview.currentWebview().append(plus.webview.create(
//			subpages[0],
//			subpages[0],{
//				top: '45px',
//				bottom: '50px'
//			}
//			
//		)),1000);
//		plus.nativeUI.closeWaiting();

	setTimeout(function() {
		var self = plus.webview.currentWebview();
		
		for(var i = 0; i < 4; i++) {
			var temp = {};
			var sub = plus.webview.create(subpages[i],subpages[i], subpage_style);
			if(i > 0) {
				sub.hide();
			}else{
				temp[subpages[i]] = "true";
				mui.extend(aniShow,temp);
			}
			self.append(sub);


			plus.nativeUI.closeWaiting();
		}
	},3000);
	var activeTab = subpages[Index],
		title = document.querySelector(".mui-title");
//	setTimeout(function(){
//		var allview = plus.webview.all();
//		if(allview){
//			for(var i=0,len=allview.length;i<len;i++){
//			    	console.log(allview[i].getURL());
//		        }
//		}
//	},3000),

	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');
		if(targetTab == activeTab) {
			return;
		}
		title.innerHTML = this.getAttribute('title');
		plus.webview.show(targetTab);
		plus.webview.hide(activeTab);
		activeTab = targetTab;
		if(targetTab == '../Record/record.html'){
			var page = plus.webview.getWebviewById(targetTab)
		    mui.fire(page, 'refreshRecord', {
		    })
		}
		if(targetTab == '../User/user.html'){
			var page = plus.webview.getWebviewById(targetTab)
		    mui.fire(page, 'accountDataInfo', {
		    })
		}
	});
}
mui('#topBar').on('tap', '#service-icon', function(e) {
    openWV('../Service/service.html','service','right','')
});