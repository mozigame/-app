/*
 * 彩票大厅
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
   
function plusReady(){
//    window.localStorage['customLot'] = ''
	
	//未定义
	getNotice()
	getUserInfo()
	console.log('111111')
//  console.log(JSON.stringify(customLot)+'111')
    if(customLot){
    	createLot(customLot)
    }else{
    	getLotList()
    }
   
};

window.addEventListener('refreshLotList',function(event){
	createLot(window.localStorage['customLot'])
});

window.addEventListener('refreshUserInfo',function(event){
	getUserInfo()
//	getLotResult()
});
mui('.dowebok').on('tap','.str_origin a',function(){
	var title=$(this).attr('data-title');
	var content=$(this).attr('data-content');
	var time=$(this).attr('data-time');
	var json={
		'title':title,
		'time':time
	}
	console.log(json)
	openWV('contne.html','contne','right',json)
})
//window.addEventListener('refreshOpenBall',function(event){
//	getLotResult()
//});


mui('#lot-enter').on('tap', '#add-lot', function(e) {
	var tem = []
	$.each($('#lot-enter li'), function(i,v) {
		var lotname = $(this).attr('data-name')
		var lottext = $(this).attr('data-text')
		var str = {"text":lottext,"name":lotname}
		tem.push(str)
	});
	openWV('add-lot.html','addLot','right',JSON.stringify(tem))
});

mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close()
});

mui('#lot-enter').on('tap', 'li', function(e) {
	var name = this.getAttribute('data-name')
	var text = this.getAttribute('data-text')
	var json = {"lotteryText":text,"lotteryName":name}
	openWV('../Bet/bet.html','bet','right',json)
});
//获取用户相关信息
function getUserInfo(){
	//plus.nativeUI.showWaiting()
	mui.ajax(uri+'Account/GetUserInfo',{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign},
        type:'post',
        success:function(data){
            if(data.code == 1){
            	window.localStorage['flevel_fd'] = data.flevel_fd
            	window.localStorage['balance'] = data.balance
            }else{
//          	toast('请求失败')
            }
        },
        error:function(xhr,type,errorThrown){
        	console.log(xhr+":"+errorThrown+"getUserInfo")
        	//plus.nativeUI.showWaiting()
            getUserInfo()
        }
    })       
}

function getLotList(){
	mui.ajax(uri+'Common/GetLotteryList?sign='+sign+'&user_id='+user_id+'&token='+token,{
        dataType:'json',
        type:'get',    
        success:function(data){
            if(data.code == 1){
            	var html = ''
            	var arr = []
            	$.each(data, function(i,v) {
            		if(v != 1){
            		  if(v.lottery == 'xycqssc'||v.lottery  == 'xyhgssc'||v.lottery  == 'xywh2fc'||v.lottery == 'xyxjpssc'||v.lottery == 'xymskssc'||v.lottery == 'xyjlpssc'){
            			return
            		  }else{
            		  	if(v.lottery == 'cqssc' || v.lottery == 'tjssc' || v.lottery == 'fc3d' || v.lottery == 'dbssc' ||v.lottery == 'hgssc' || v.lottery == 'jlpssc'){
            				html += '<li  data-text="'+v.lottery_name+'" data-name="'+v.lottery+'"><img src="../../images/type/'+v.lottery+'.png" width="50" /><span>'+v.lottery_name+'</span></li>'		            		        
            		    }else{
            		    	arr.push(v)	
            		    }	
            		  }
            		}
            	});
            	$('#lot-enter ul').append(html)
        		var brr=[];
            	for(var i=0;i<arr.length;i++){
            		if(arr[i].lottery!= 'flbssc'&&arr[i].lottery != 'szcqssc'&&arr[i].lottery != 'sztxffc'&&arr[i].lottery != 'bjlcqssc'&&arr[i].lottery  != 'bjltxffc'&&arr[i].lottery  != 'bjlhgssc'&&arr[i].lottery  != 'bjlflbssc'&&arr[i].lottery != 'szhgssc'&&arr[i].lottery  != 'jsk3'&&arr[i].lottery != 'sztw5fc'&&arr[i].lottery != 'szbjssc'&&arr[i].lottery != 'szflbssc'&&arr[i].lottery != 'bjltw5fc'&&arr[i].lottery != 'bjlbjssc'){
            			brr.push(arr[i]);
            		}
            	}
            	window.localStorage['lotArr'] = JSON.stringify(brr)
            }else{
//          	toast("请求失败")
            }
        },
        error:function(xhr,type,errorThrown){
        	console.log(xhr+":"+errorThrown+"getLotList")
            //plus.nativeUI.showWaiting()
            getLotList()
        }
    })
}

function createLot(para){
	$('#lot-enter ul').empty() 
	var obj;
	var html = ''
//	console.log(JSON.parse(para)['exsit'])
	$.each(JSON.parse(para)['exsit'], function(i,v) {
		if(v.name!="undefined"){
		html += '<li data-text="'+v.text+'" data-name="'+v.name+'"><img src="../../images/type/'+v.name+'.png" width="50" /><span>'+v.text+'</span></li>'
		}
	});
	$('#lot-enter ul').append(html)
    plus.nativeUI.closeWaiting()
}
function getNotice(){
	var json={
		'sign':sign,
		'token':token,
		'user_id':user_id,
	}
	$('.str_origin').empty();
	mui.ajax(uri+'Common/GetNotice',{
		dataType:'json',
		data:json,
		type:'get',
		success:function(data){
//			console.log(JSON.stringify(data.info))
			var html='';
			$.each(data.info, function(i,v) {
//				console.log(v.title)
				html+=' <a  href="javascropt:void(0);" data-title="'+v.title+'"  data-time="'+v.add_time+'">'+v.title+'</a>'
			});
			$('.str_origin').append(html);
//			for(var i=0;i<$('.str_origin a').length;i++){
//				var a= $('.str_origin a:eq('+i+')').width()+10
//				console.log(a)
////				t=t+a;
//			}
			scroll()
		}
		
	})
}
			function scroll(){
	var t=0;
for(var i=0;i<$('.str_origin a').length;i++){
	var a= $('.str_origin a:eq('+i+')').width()+80
//	console.log(a)
	t=t+a;
	
}
$('.str_origin').width(t+$('.str_origin a:eq(0)').width());

var left=0;
function aa(){
	left--;
	if(-left==t+10){
		left=$('.dowebok').width();
	}
	$('.str_origin').css('margin-left',left);
	
}
setInterval(aa,30)
}
