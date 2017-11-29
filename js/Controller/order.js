/*
 * 订单页面
 */

if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

function plusReady() {
	if(window.localStorage['orderInfo']){
	  var detail = JSON.parse(window.localStorage['orderInfo'])
	  $('#je').text(detail.order_je)
	  $('#zs').text(detail.order_zs)
	  var html = ''
	  html += '<div class="item"><span id="nums">'+detail.order_nums+'</span><span id="mode">'+detail.order_play_name+'</span><span id="data"><strong>'+detail.order_je+'</strong>元<strong>'+detail.order_zs+'</strong>注<strong>'+detail.order_bs+'</strong>倍</span><i class="iconfont icon-close"></i></div>'
      $('.order-list').empty()
      $('.order-list').append(html)
   }
}

mui('#topBar').on('tap', '#back', function(e) {
	var btnArray = ['取消', '确认'];
    mui.confirm('是否清空投注方案', '', btnArray, function(e) {
        if (e.index == 1) {
        	var page = plus.webview.getWebviewById('bet')
	        mui.fire(page,'refreshData',{
	        	data:true
	        })
	        window.localStorage['orderInfo'] = '' 
            setTimeout("plus.webview.currentWebview().close()",350)
        }
    })
});

mui('#topBar').on('tap', '#chase', function(e) {
	plus.nativeUI.showWaiting()
	var detail = JSON.parse(window.localStorage['orderInfo'])
	var json = {
        	"user_id":user_id,
        	"token":token,
        	"sign":sign,
        	"lottery":detail.order_lottery,
        	"data":[{
        	   "multiple":Number(detail.order_bs),
        	   "num":$('#nums').text(),
        	   "pattern":Number(detail.order_ms),
        	   "play":detail.order_play_id,
        	   "price":Number(detail.order_je),
        	   "rxw":detail.order_pos,
        	   "zhushu":Number(detail.order_zs),
        	   "peilv":detail.order_pl,
        	}],
        	"total_zhushu":Number(detail.order_zs),
        	"no":Number(detail.order_no),
        	"flevel_modes":detail.order_fdms,
        	"total_price":Number(detail.order_je)
    }
	openWV('chase.html','chase','right',json)
});

mui('#air').on('tap', '#sendBuy', function(e) {
});

mui('#order-main').on('tap', '.icon-close', function(e) {
	$(this).parents('.item').remove()
	window.localStorage['orderInfo'] = ''
	$('#je').text('0.000')
	$('#zs').text('0')
})

mui('#air').on('tap','#sendBuy',function(e){
	if(window.localStorage['orderInfo'] == ''){
		toast("暂无投注数据，请重新选择号码")
	}else{
		var btnArray = ['取消', '确认'];
        mui.confirm('确认投注吗？', '', btnArray, function(e) {
          if (e.index == 1) {
          	goBet()
          }
        })
	}
})

function goBet(){
	var detail = JSON.parse(window.localStorage['orderInfo'])
	plus.nativeUI.showWaiting()
	var ttt=$('#nums').text()
	var ar = new Array()
	ar=ttt.split(' ')
	var json = {
        	"user_id":user_id,
        	"token":token,
        	"sign":sign,
        	"lottery":detail.order_lottery,
        	"data":[{
        	   "multiple":Number(detail.order_bs),
        	   "num":ar,
        	   "pattern":Number(detail.order_ms),
        	   "play":detail.order_play_id,
        	   "price":Number(detail.order_je),
        	   "rxw":detail.order_pos,
        	   "zhushu":Number(detail.order_zs),
        	   "peilv":detail.order_pl,
        	}],
        	"total_zhushu":Number(detail.order_zs),
        	"no":Number(detail.order_no),
        	"flevel_modes":detail.order_fdms,
        	"total_price":Number(detail.order_je)
    }
	var str = JSON.stringify(json)
	console.log(str)
	mui.ajax(uri+'Play/BetIng',{
        dataType:'json',
        data: json,
        type:'post',
        
        success:function(data){
//      	if(data.code == 202){
//          	plus.runtime.restart()
//          }
        	console.log(JSON.stringify(data))
            plus.nativeUI.closeWaiting()
            switch (data.code){
            	case 1 :
            	  toast('投注成功')
            	  var page = plus.webview.getWebviewById('bet')
            	  mui.fire(page,'refreshData',{
	        	      data:true
	              })
	              window.localStorage['orderInfo'] = '' 
                  setTimeout("plus.webview.currentWebview().close()",350);
                  break;
                case 2 :
                  toast('提交数据不全')
                  break;
//              case 3 :
//                toast('失败')
//                break;
//              case 4 :
//                toast('失败')
//                break;
//                case 5 :
//                toast('失败')
//                break;
//                case 6 :
//                toast('失败')
//                break;
//                case 7 :
//                toast('失败')
//                break;
//                case 8 :
//                toast('失败')
//                break;
//                case 9 :
//                toast('失败')
//                break;
//                case 10 :
//                toast('失败')
//                break;
//                case 11 :
//                toast('失败')
//                break;
//                case 12 :
//                toast('失败')
//                break;
            }
        },
        error:function(xhr,type,errorThrown){
        	plus.nativeUI.showWaiting()
            goBet()
        }
    })  
}
