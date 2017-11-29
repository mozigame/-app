var game, room_id;
if(window.plus) {
	plusReady();

} else {
	document.addEventListener("plusready", plusReady, false);
}
var json = {
	'sign': sign,
	'token': token,
	'user_id': user_id,
}
var json1 = {
	'sign': sign,
	'token': token,
	'user_id': user_id,
	'room_id': room_id,
}

mui.init({
	pullRefresh: {

		container: "#refreshContainer",
		down: {
			height: 50,
			auto: false,
			contentdown: "下拉可以刷新",
			contentover: "释放立即刷新",
			contentrefresh: "正在刷新...",
			callback: function() {
				var game = $('#record-menu-top1 a.mui-active').attr('id');
				gameRoom(game, json);
			}
		}
	}
});

mui('button').on('tap', function() {
	var room_id = $('.se').val();
	gameRoom(game, json1);
})
mui('#record-menu-top1').on('tap', 'a', function(e) {
	var game = $(this).attr('id');
	gameRoom(game, json);
})

function plusReady() {
	plus.screen.unlockOrientation()
	plus.screen.lockOrientation("portrait-primary");
	plus.navigator.setFullscreen(false)
	var game = $('#record-menu-top1 a.mui-active').attr('id');
	gameRoom(game, json);
}
mui('#recent-list').on('tap', '#recent-list .add2', function() {
	var cls = $(this).attr("cls");
	var class_name = $(this).attr("class_name");
	mui.openWindow({
			url: 'xybet.html',
			id: 'xybet',
			extras: {
				cls: cls,//扩展参数
				class_name: class_name
			},
			createNew: true,
			show: {
				autoShow: true, //页面loaded事件发生后自动显示，默认为true
			},
		});
});
mui('#recent-list').on('tap', '#recent-list .add', function() {
	var room_id = $(this).attr('data-id')
	var szlot = $(this).attr('szlot')
	var ispass = $(this).attr("rel");
	var lot = $(this).attr("lot");
	var lot_name = $(this).attr("lot_name");
	var gtype = $(this).attr("gtype");
	var cls = $(this).attr("cls");
	var classs_name = $(this).attr("class_name");
	console.log(lot);
	console.log(lot_name);
	

	if(gtype==2){
		window.localStorage['lot_id'] = lot
		window.localStorage['lot_name'] = lot_name
		mui.openWindow({
			url: 'Baccarat.html',
			id: 'Baccarat',
			extras: {
				lot_id: lot,//扩展参数
				lot_name: lot_name
			},
			createNew: true,
			show: {
				autoShow: true, //页面loaded事件发生后自动显示，默认为true
			},
		});
	}else{
	if(ispass == "1") {
		mui.prompt('请输入密码', '', '', ['取消', '确认'], function(e, pass, index) {
			var pass = e.value;
			console.log(pass)
			if(e.index == 1) {
				window.localStorage['sz_lot_id'] = szlot
				checck_room_details(room_id, pass);
			}
		}, 'div');
	} else {
		window.localStorage['room_id'] = room_id
		window.localStorage['sz_lot_id'] = szlot
		mui.openWindow({
			url: 'game.html',
			id: 'game',
			extras: {
				room_id: room_id //扩展参数
			},
			createNew: true,
			show: {
				autoShow: true, //页面loaded事件发生后自动显示，默认为true
			},
		});
	}
  }

})

function gameRoom(game, json) {
	switch(game) {
		case 'zuoz':
		    $('#cjfj').show();
		    
			cur_url = 'Room/Roomlist'
			roomlist(cur_url, json)
			break;
		case 'bj':
		   	$('#cjfj').hide();
			cur_url = 'Common/GetLotteryList'
			json.types = 'bjl';
			getLotteryList(cur_url,json)
			break;
		case 'wf':
			$('#cjfj').hide();
			cur_url='Play/getXyLottery'
//			getxy(cur_url,json)
			getxyList(cur_url, json)
//			toast("稍后开放")
//$('#recent-list').empty();
//mui.openWindow({
//  url:"../Bet/bet.html",
//  id:"bet",
//  styles:{
//    top:"100px",//新页面顶部位置
//    bottom:"50px",//新页面底部位置
//    
//  },
//  extras:{
//    //自定义扩展参数，可以用来处理页面间传值
//  },
//  createNew:true,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
//  show:{
//    autoShow:true,//页面loaded事件发生后自动显示，默认为true
//    aniShow:"none",//页面显示动画，默认为”slide-in-right“；
//  },
//  waiting:{
//    autoShow:true,//自动显示等待框，默认为true
//    title:'正在加载...',//等待对话框上显示的提示内容
//    options:{      
//    }
//  }
//})
//
			break;
		case 'qp':
			$('#recent-list').empty();
			//			cur_url=''
			toast("稍后开放")
			break;
		case 'zr':
			$('#recent-list').empty();
			//			cur_url=''
			toast("稍后开放")
			break;
	}
}

function roomlist(url, json) {
	plus.nativeUI.showWaiting();
	mui.ajax(uri + url, {
		data: json,
		dataType: 'json',
		type: 'post',
		success: function(data) {
			$('#recent-list').empty();
//			console.log(JSON.stringify(data))
			if(data.code == 1) {
				mui.each(data, function(i, v) {
					if(v != 1) {
						html = '';
						html += '<li class="fj" data-id="' + v.room_id + '">' +
							'				<ul class="mui-clearfix">' +
							'					<li class="fl lorry">' + v.lottery_name + '</li>' +
							'					<li class="fr add" data-id="' + v.room_id + '" rel="' + v.ispass + '"  szlot="' + v.lottery + '">加入房间</li>' +
							'				</ul>' +
							'				<ul class="mui-clearfix ul" >' +
							'					<li class="fl zz">当前坐庄：<span>' + v.zjname + '</span></li>' +
							'					<li class="fl num">房间号：<span>' + v.room_id + '</span></li>' +
							'					<li class="fl ye">房间余额：<span>' + v.balance + '</span></li>' +
							'				</ul>' +
							'			</li>';
						$('#recent-list').append(html)
					}

				})
			} else {
				console.log("没有更多数据了")
			}
			plus.nativeUI.closeWaiting()
			$('#recent-list').show()
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
		}
	})

}
//检查房间信息
function checck_room_details(room_id, pass) {
	var jsons = {
		'sign': sign,
		'room_id': room_id,
		'user_id': user_id,
		'token': token,
		'password': pass
	}
	mui.ajax(uri + 'Room/Roominfo', {
		data: jsons,
		dataType: 'json',
		type: 'post',
		success: function(data) {
			if(data.code == 1) {
				console.log(pass)
				window.localStorage['sz_lot_id'] = data[0].lottery;
				window.localStorage['room_id'] = room_id
				window.localStorage['room_pass'] = pass;

				mui.openWindow({
					url: 'game.html',
					id: 'game',
					extras: {
						room_id: room_id //扩展参数
					},
					createNew: true,
					show: {
						autoShow: true, //页面loaded事件发生后自动显示，默认为true

					},
				});
			} else if(data.code == 6) {
				toast('房间密码错误,无法进入')
			}
		}
	})
}
mui('.hengfang ').on('tap', '.hengfang .ti span', function() {
	$('.mask').hide();
	$('.hengfang').hide()
})
mui('.hengfang1 ').on('tap', '.hengfang1 .ti span', function() {
	$('.hengfang1 ').hide();
})
mui('.rech').on('tap', '.creatR', function() {
	$('.mask').toggle();
	$('.hengfang').toggle();
	$('#sz_leftmoney').text(window.localStorage['banker_balance'])
	get_room_game_list();

})
mui('.hengfang').on('tap', '.tijiao', function() {
	var lottery = $('#game_list').children('option:selected').attr('data-id')
	var drawword = $('#password').val()
	var price = $('#price').val()
	console.log(lottery)
	console.log(drawword)
	console.log(price)
	if(Number($('#sz_leftmoney')) < 0)
		return toast('上庄余额不足，请从彩票余额转账到上庄余额')

	if(lottery == '' || price == '')
		return toast('填写的内容不能为空')
	create_room(lottery, drawword, price)

})

function create_room(lottery, drawword, price) {
	var json = {
		'sign': sign,
		'token': token,
		'user_id': user_id,
		'lottery': lottery,
		'password': drawword,
		'price': price
	}
	mui.ajax(uri + 'Room/RegRoom', {
		data: json,
		dataType: 'json',
		type: 'post',
		success: function(data) {
			switch(data.code) {
				case 0:
					toast('创建失败')
					break;
				case 1:
					toast('创建成功')
					setTimeout('location.reload()', 1000);
					break;
				case 2:
					toast('该彩种不能上庄')
					break;
				case 3:
					toast('检查上庄金额必须大于50000')
					break;
				case 4:
					toast('房间个数不足')
					break;
				case 5:
					toast('检查庄家余额')
					break;
				case 6:
					toast('资金密码有误')
					break;
			}
		}
	})
}
//获取彩种
function get_room_game_list() {
	var $this = this;
	var json = {
		'sign': sign,
		'types': 'szc',
		'user_id': user_id,
		'token': token
	}
	mui.ajax(uri + 'Common/GetLotteryList', {
		data: json,
		dataType: 'json',
		type: 'post',
		success: function(data) {
			if(data.code == 1) {
				var html = '';
				$.each(data, function(i, v) {
					if(v != 1) {
						html += '<option data-id="' + v.lottery + '">' + v.lottery_name + '</option>'
					}
				})
				$('#game_list').html(html)
			} else {
				toast('请求失败')
			}
		}
	})
}

function sz_transfer(price, type_id) {
	var $this = this;
	var json = {
		'sign': sign,
		'token': token,
		'user_id': user_id,
		'type_id': type_id,
		'price': price
	}
	mui.ajax(uri + 'Room/TransFer', {
		data: json,
		dataType: 'json',
		type: 'post',
		success: function(data) {
			switch(data.code) {
				case 0:
					toast('转账失败')
					break;
				case 1:
					price = parseFloat(window.localStorage['banker_balance']) + parseFloat(price);
					$('#sz_leftmoney').text(price)
					window.localStorage['banker_balance'] = price
					toast('转账成功')
					$('.hengfang1').hide();
					$('.hengfang').hide()
					$('.mask').hide()
					$('#price2').val('')
					break;
				case 2:
					return toast('2秒内不能重覆提交')
					break;
				case 3:
					return toast('转账类型不正确')
					break;
				case 4:
					return toast('转账金额不在范围内')
					break;
				case 5:
					return toast('资金密码有误')
					break;
				case 6:
					return toast('余额不足')
					break;
			}
		}

	})
}
mui('.hengfang').on('tap', '#sz_transfer', function() {
	$('.hengfang1').show();
})
mui('.hengfang1').on('tap', '.tijiao1', function() {
	var price2 = $('#price2').val();
	if(price2 == '')
		return toast('填写的内容不能为空')
	sz_transfer(price2, 1)
})
function getxy(cur_url,json){
	plus.nativeUI.showWaiting();
	$('#recent-list').empty();
	mui.ajax(uri + cur_url, {
		data: json,
		dataType: 'json',
		type: 'post',
		success: function(data) {
			console.log(data)
			
			console.log(JSON.stringify(data))
			if(data.code == 1) {
				//class 彩种代码,class_name 彩种名称
				html ='';
				html +='<header class="mui-bar mui-bar-nav" id="topBar">'
    +'<h1 class="mui-title" id="title">'+data.info[0].class_name+'</h1>'
   +' <a class="mui-icon-right-nav mui-pull-right" id="history">历史</a>'
    +'   </header>'
     +'   <div class="betMain" id="betMain">'
	 +' <div class="bet-topbar">'
	  +' <div class="titlebar"><i></i><span id="issue">距<b id="issue_name">'+0+'</b>期还有</b><b id="h">'+00+'</b>:<b id="i">'+00+'</b>:<b id="s">'+00+'</b>开奖</span></div>'
      +' <div class="bet-menu">'
	  +'      <span id="bet-play" data-id="">'+"暂无"+'</span>'
	  +'  	<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">'
	   +'       <div class="mui-scroll" id="bet-play-list">'
	   +'       </div>'
	   +'     </div>'
      +'  </div>'
	+'</div>'
	+'<div id="wrapper" class="bet-wrapper">'
	+'	<div class="betbar">'
	+'	</div>'
     +'   <div class="bet-details">'
      +'    <div class="bet-mode">'
      +'  	 <div class="mui-numbox" data-numbox-min="1" >'
		+'		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>'
		+'		<input id="test" class="mui-input-numbox" type="number" value="1">'
		+'		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>'
		+'	 </div>'
        +'  </div>'
        +'  <div class="bet-select" id="bet-select">'
         +' 	 <span class="active" data-val="1">元</span>'
         +' 	 <span data-val="0.1">角</span>'
         +' 	 <span data-val="0.01">分</span>'
         +' 	 <span data-val="0.001">厘</span>'
         +' </div>'
        +'  <select class="bet-rebate">'
        +'  </select>'
        +'</div>'
	+'</div>'
    +'</div>'
    +'<input type="hidden" id="hidden" />';
    $('#recent-list').append(html)
			}else {
				console.log("没有更多数据了")
			}
			$('#recent-list').show()
			plus.nativeUI.closeWaiting()
		}
	})
}
function getLotteryList(url, json) {
	plus.nativeUI.showWaiting();
	mui.ajax(uri + url, {
		data: json,
		dataType: 'json',
		type: 'post',
		success: function(data) {
			console.log(data)
			$('#recent-list').empty();
			console.log(JSON.stringify(data))
			if(data.code == 1) {
				mui.each(data, function(i, v) {
					if(v != 1) {
						html = '';
						html += '<li class="fj">' +
							'				<ul class="mui-clearfix">' +
							'					<li class="fl lorry">' + v.lottery_name + '</li>' +
							'					<li class="fr add"  lot="' + v.lottery + '" gtype="2" lot_name="' + v.lottery_name + '">开始游戏</li>' +
							'				</ul>' +
							'			</li>';
						$('#recent-list').append(html)
					}

				})
			} else {
				console.log("没有数据更多数据了")
			}
			plus.nativeUI.closeWaiting()
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
		}
	})

}
function getxyList(url, json) {
	plus.nativeUI.showWaiting();
	mui.ajax(uri + url, {
		data: json,
		dataType: 'json',
		type: 'post',
		success: function(data) {
			console.log(data)
			$('#recent-list').empty();
			console.log(JSON.stringify(data))
			if(data.code == 1) {
				mui.each(data.info, function(i, v) {
					
						html = '';
						html += '<li class="fj">' +
							'				<ul class="mui-clearfix">' +
							'					<li class="fl lorry">' + v.class_name + '</li>' +
							'					<li class="fr add2"  cls="' + v.class + '" gtype="111" class_name="' + v.class_name + '">开始游戏</li>' +
							'				</ul>' +
							'			</li>';
						$('#recent-list').append(html)
					

				})
			} else {
				console.log("没有更多数据了")
			}
			plus.nativeUI.closeWaiting()
			$('#recent-list').show()
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
		}
	})

}