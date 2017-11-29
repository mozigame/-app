if(window.plus) {
	plusReady();
} else {
	document.addEventListener('plusready', plusReady, false);
}
var LotteryGame = [];

var setBind = function() {
	return	$("#sz_bet_main .bar").click(function() {
			var num = $('.sz_chip_main .chip.active').attr('rel');
			var total = 0;
			var flag = false;
			if(typeof(num) != 'undefined') {
				flag = true
				$(this).find('.bars').append('<div class="chip chip_' + num + '" rel="' + num + '"></div>')
			}
			$.each($(this).find('.chip'), function() {
				var nums = Number($(this).attr('rel'))
				total += nums
			})
			if(flag = true) {
				$(this).find('.tips').html('<p>￥:' + total + '</p>').css("opacity", "1");
			}
		});
	}
function setBin(){
	$("#sz_bet_main .bar").click(function() {
			var num = $('.sz_chip_main .chip.active').attr('rel');
			var total = 0;
			var flag = false;
			if(typeof(num) != 'undefined') {
				flag = true
				$(this).find('.bars').append('<div class="chip chip_' + num + '" rel="' + num + '"></div>')
			}
			$.each($(this).find('.chip'), function() {
				var nums = Number($(this).attr('rel'))
				total += nums
			})
			if(flag = true) {
				$(this).find('.tips').html('<p>￥:' + total + '</p>').css("opacity", "1");
			}
		});
}

mui('body').on('tap', '.sz_huan', function() {
	mui.plusReady(function(){
		plus.nativeUI.showWaiting();
		plus.webview.currentWebview().close();
		plus.screen.unlockOrientation()
		plus.screen.lockOrientation("portrait-primary");
		plus.navigator.setFullscreen(false)
		plus.nativeUI.closeWaiting();
	})
})

function plusReady() {
	// 全屏显示
	plus.nativeUI.showWaiting();
	plus.screen.unlockOrientation();
	plus.navigator.setFullscreen(true);
	plus.screen.lockOrientation("landscape-primary");
	var wv = plus.webview.currentWebview()
	console.log(wv)
	var room_id = wv.room_id;
	console.log(room_id)
	plus.nativeUI.closeWaiting();
	get_room_details(room_id)
	get_inner_room_list()
	get_line_up_list(room_id)
	getLotteryAll()
	window.localStorage["sz_palytype"] = 'lhh';
	$('#sz_bet_main').html(createSZHtml(window.localStorage["sz_palytype"]))
	fullPlayTable()
	get_open_list(window.localStorage['sz_lot_id']);
	setBin();

}

//返回
mui('.sz_table').on('tap', '.touzhu', function() {
	if($('.sz_player').css('display') == 'none') {
		$(".sz_player").animate({
			opacity: 'show',
			marginTop: '0.3rem'
		}, "slow", function() {});
	} else {
		$(".sz_player").animate({
			opacity: 'hide',
			marginTop: '0'
		}, "slow", function() {});
	}

})
mui('.sz_table').on('tap', '.paidui', function() {
	if($('.sz_line_up_list').css('display') == 'none') {
		$(".sz_line_up_list").animate({
			opacity: 'show',
			marginTop: '0.3rem'
		}, "slow", function() {});
	} else {
		$(".sz_line_up_list").animate({
			opacity: 'hide',
			marginTop: '0'
		}, "slow", function() {});
	}

})
mui('.sz_table').on('tap', '.kaijiang_btn', function() {
	$('.mod-table-bottom').toggleClass('active')
	$('.mask').show();
	$('.mask').css('z-index', '10')

})
mui('.sz_table').on('tap', '.check_btn', function() {
	$('.sz_scroll').html('');
	if($('.sz_look').css('display') == 'none') {
		$(".sz_look").animate({
			opacity: 'show',
			marginTop: '12'
		}, "slow", function() {});
		get_room_record(getNowFormatDate() + ' 00:00:00', getNowFormatDate() + ' 23:59:59', '', '', window.localStorage['sz_lot_id'], 1);
		$('.mask').show();
		$('.mask').css('z-index', '10');
	} else {
		$(".sz_look").animate({
			opacity: 'hide',
			marginTop: '0'
		}, "slow", function() {});
		$('.mask').hide();
		$('.mask').css('z-index', '1000000');
	}

})


$('#sz_play_method').on('change', function() {
	var type = $(this).find('option:selected').attr('rel')
	window.localStorage["sz_palytype"] = type;
	$('#sz_bet_main').html(createSZHtml(type))
	fullPlayTable();
	$(".tips").css("opacity", "0");
	$('#sz_bet_main').removeClass().addClass(type)
	setBind();
})
mui('.sz_chip_main').on('tap', '.sz_chip_main .chip', function() {
	$('.sz_chip_main .chip').removeClass('active');
	$(this).addClass('active')
})
$(".szmenu a").click(function() {
	var type = $(this).attr("data-id");
	$(this).addClass("active");
	$(this).parent("li").siblings("li").find("a").removeClass("active")
	fullsztable(type)
});

function fullsztable(types) {
	$("#openleft .mod-sprite,#openright .mod-sprite").remove();
	var index = 0;
	var prve = '';
	var znum = 0;
	var xnum = 0;
	var hnum = 0;
	var sumnum = 0;
	if(types == "lhh") {

		for(var i = OpenListnewArray.length - 1; i >= 0; i--) {
			var v = OpenListnewArray[i];
			if(v != 1 && v.lhh != '') {
				var htmlleft = '';
				var htmlright = '';
				if(v.lhh == '龙') {
					htmlleft += '<i class="mod-sprite i-iconb-zl"></i>';
					htmlright = '<i class="mod-sprite i-iconb-e"></i>';
					znum++;
				} else if(v.lhh == '虎') {
					htmlleft += '<i class="mod-sprite i-iconb-zh"></i>';
					htmlright = '<i class="mod-sprite i-iconb-d"></i>';
					xnum++;
				} else {
					htmlleft += '<i class="mod-sprite i-iconb-c"></i>';
					htmlright = '<i class="mod-sprite i-iconb-f"></i>';
					hnum++;
				}
				$("#openleft li").eq(index).html(htmlleft);
				index++;
				var ulindex = $("#openright").find(".mod-sprite:last").parent("li").parent("ul").index();
				ulindex = ulindex == -1 ? 0 : ulindex;
				var liindex = $("#openright").find(".mod-sprite:last").parent("li").index();
				liindex = liindex == -1 ? 0 : liindex + 1;
				if(v.lhh != prve && prve != '' || liindex == 8) {
					ulindex += 1;
					liindex = 0;
				}
				if(ulindex == 28 && liindex == 0) {
					$("#openright ul").eq(0).find("li").html('');
					$("#openright").append($("#openright ul").eq(0));
					ulindex--;
				}
				$("#openright ul").eq(ulindex).find("li").eq(liindex).html(htmlright);
				prve = v.lhh;
				//                      console.log(prve)
			}
			$("#sztext1").text("龙");
			$("#numtext1").text(znum);
			$("#sztext2").text("虎");
			$("#numtext2").text(xnum);
			$("#sztext3").text("和");
			$("#numtext3").text(hnum);
			$("#sztext4").text("总数");
			$("#numtext4").text(znum + xnum + hnum);
		}
	} else if(types == "zhdx") {
		for(var i = OpenListnewArray.length - 1; i >= 0; i--) {
			var v = OpenListnewArray[i];
			if(v != 1 && v.dx != '') {
				var htmlleft = '';
				var htmlright = '';
				if(v.dx == '大') {
					htmlleft += '<i class="mod-sprite i-iconb-zd"></i>';
					htmlright = '<i class="mod-sprite i-iconb-e"></i>';
					znum++;
				} else if(v.dx == '小') {
					htmlleft += '<i class="mod-sprite i-iconb-zx"></i>';
					htmlright = '<i class="mod-sprite i-iconb-d"></i>';
					xnum++;
				} else {
					htmlleft += '<i class="mod-sprite i-iconb-c"></i>';
					htmlright = '<i class="mod-sprite i-iconb-f"></i>';
				}
				$("#openleft li").eq(index).html(htmlleft);
				index++;
				var ulindex = $("#openright").find(".mod-sprite:last").parent("li").parent("ul").index();
				console.log(ulindex)
				ulindex = ulindex == -1 ? 0 : ulindex;
				var liindex = $("#openright").find(".mod-sprite:last").parent("li").index();
				liindex = liindex == -1 ? 0 : liindex + 1;
				if(v.dx != prve && prve != '' || liindex == 8) {
					ulindex += 1;
					liindex = 0;
				}
				if(ulindex == 28 && liindex == 0) {
					$("#openright ul").eq(0).find("li").html('');
					$("#openright").append($("#openright ul").eq(0));
					ulindex--;
				}
				$("#openright ul").eq(ulindex).find("li").eq(liindex).html(htmlright);;
				prve = v.dx;
			}
			$(".tableB li").eq(3).html("");
			$("#sztext1").text("大");
			$("#numtext1").text(znum);
			$("#sztext2").text("小");
			$("#numtext2").text(xnum);
			$("#sztext3").text("总数");
			$("#numtext3").text(znum + xnum + hnum);

		}
	} else if(types == "zhds") {
		for(var i = OpenListnewArray.length - 1; i >= 0; i--) {
			var v = OpenListnewArray[i];
			if(v != 1 && v.ds != '') {
				var htmlleft = '';
				var htmlright = '';
				if(v.ds == '单') {
					htmlleft += '<i class="mod-sprite i-iconb-zdan"></i>';
					htmlright = '<i class="mod-sprite i-iconb-e"></i>';
					znum++;
				} else if(v.ds == '双') {
					htmlleft += '<i class="mod-sprite i-iconb-zs"></i>';
					htmlright = '<i class="mod-sprite i-iconb-d"></i>';
					xnum++;
				} else {
					htmlleft += '<i class="mod-sprite i-iconb-c"></i>';
					htmlright = '<i class="mod-sprite i-iconb-f"></i>';
				}
				$("#openleft li").eq(index).html(htmlleft);
				index++;
				var ulindex = $("#openright").find(".mod-sprite:last").parent("li").parent("ul").index();
				ulindex = ulindex == -1 ? 0 : ulindex;
				var liindex = $("#openright").find(".mod-sprite:last").parent("li").index();
				liindex = liindex == -1 ? 0 : liindex + 1;
				if(v.ds != prve && prve != '' || liindex == 8) {
					ulindex += 1;
					liindex = 0;
				}
				if(ulindex == 28 && liindex == 0) {
					$("#openright ul").eq(0).find("li").html('');
					$("#openright").append($("#openright ul").eq(0));
					ulindex--;
				}
				$("#openright ul").eq(ulindex).find("li").eq(liindex).html(htmlright);;
				prve = v.ds;
			}
		}
		$(".tableB li").eq(3).html("");
		$("#sztext1").text("单");
		$("#numtext1").text(znum);
		$("#sztext2").text("双");
		$("#numtext2").text(xnum);
		$("#sztext3").text("总数");
		$("#numtext3").text(znum + xnum + hnum);
	}
}

mui('.sz_table').on('tap', '#submit_banker', function() {
	console.log(window.localStorage['banker_balance'])
	var type = $(this).attr("type");
	console.log(type);
	if(type == 1) {
		mui.prompt('是否确定下庄', '', '', ['取消', '确定'], function(e) {
			if(e.index == 1) {
				deRoom(room_id);
			}
		}, 'div');
	} else {

		$('#sz_leftmoney').text(window.localStorage['banker_balance'])
		$('.hengfang').show();
		$('.mask').show();
	}
})

mui('.hengfang').on('tap', '.tijiao', function() {
	var price = $('#price').val();
	var room_id = window.localStorage['room_id']
	console.log(room_id)
	if(Number($('#sz_leftmoney')) < 0)
		return toast('上庄余额不足，请从彩票余额转账到上庄余额')

	if(price == '')
		return toast('填写的内容不能为空')
	shenqing_room(room_id, '', price)

})
mui('.hengfang1').on('tap', '.tijiao1', function() {
	var price2 = $('#price2').val();
	if(price2 == '')
		return toast('填写的内容不能为空')
	sz_transfer(price2, 1)
})
mui('.hengfang ').on('tap', '.hengfang .ti span', function() {
	$('.mask').hide();
	$('.hengfang').hide()
})
mui('.hengfang1 ').on('tap', '.hengfang1 .ti span', function() {
	$('.hengfang1 ').hide();
})
mui('.hengfang').on('tap', '#sz_transfer', function() {
	$('.hengfang1').show();
})
mui('.mod-table-bottom').on('tap', '.x', function() {
	$('.mod-table-bottom').removeClass('active');
	$('.mask').hide();
	$('.mask').css('z-index', '1000000')

})
//          mui(".sz_look").on('tap','.sz_news li:last-child',function(){
//          	$('.sz_particulars').fadeIn(500)
//          })
mui('.sz_particulars').on('tap', '.x', function() {
	$(this).parents('.sz_particulars,.sz_look').fadeOut(500)
	$('.mask').hide();
	$('.mask').css('z-index', '1000000')
})
mui('.sz_look').on('tap', '.x', function() {
	$(this).parents('.sz_look').animate({
		opacity: 'hide',
		marginTop: '0'
	}, 'slow', function() {})
	$('.mask').hide();
	$('.mask').css('z-index', '1000000')
})

function deRoom(room_id) {
	var json = {
		'token': token,
		'user_id': user_id,
		'sign': sign,
		'room_id': room_id,
	}
	mui.ajax(uri + 'Room/deroom', {
		dataType: 'json',
		data: json,
		type: 'get',
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == 1) {
				toast('您已成功申请下庄,当期派奖完成自动下庄')
			}
			if(data.code == 0) {
				toast('您还没有达到下庄条件,下庄条件为您上庄金额的一倍流水,方可下庄')
			}
		}
	})
}

function createSZHtml(type) {
	var gameW = 'w';
	//type == "d2q" || type == "d3q" || type == "d4q" || type == "d5q"
	switch(type) {
		case "d1q":
			gameW = "w";
			break;
		case "d2q":
			gameW = "q";
			break;
		case "d3q":
			gameW = "b";
			break;
		case "d4q":
			gameW = "s";
			break;
		case "d5q":
			gameW = "g";
			break;
	}
	switch(type) {
		case 'lhh':
			return '<div class="sz_bar"><div class="long bar "><div class="tips"></div><div class="bars" play="l" rel="龙" peilv="2.1"><strong>龙</strong><p>1:2.1</p></div></div><div class="hu bar "><div class="tips"></div><div class="bars" play="he"   rel="和" peilv="1.8"><strong>和</strong><p>1:8</p></div></div><div class="he bar "><div class="tips"></div><div class="bars"  play="h" rel="虎" peilv="2.1"><strong>虎</strong><p>1:2.1</p></div></div></div>'
			break;
		case 'dxds':
			return '<div class="sz_bar"><div class="xiao bar "><div class="tips"></div><div class="bars"  play="zx" rel="总小" peilv="1.97"><strong>小</strong><p>1:1.97</p></div></div><div class="da bar "><div class="tips"></div><div class="bars" play="zda" rel="总大" peilv="1.97"><strong>大</strong><p>1:1.97</p></div></div><div class="dan bar "><div class="tips"></div><div class="bars" play="zd"  rel="总单" peilv="1.97"><strong>单</strong><p>1:1.97</p></div></div><div class="shuang bar "><div class="tips"></div><div class="bars" play="zs" rel="总双" peilv="1.97"><strong>双</strong><p>1:1.97</p></div></div>'
			break;
		case 'dn':
			return '<div class="sz_bar"><div class="dn_top"><div class="n1 bar "><div class="tips"></div><div class="bars" play="n1"  rel="牛一" peilv="13"><strong>牛1</strong><p>1:13</p></div></div><div class="n2 bar "><div class="tips"></div><div class="bars" play="n2"  rel="牛二" peilv="13"><strong>牛2</strong><p>1:13</p></div></div><div class="n3 bar "><div class="tips"></div><div class="bars" play="n3"  rel="牛三" peilv="13"><strong>牛3</strong><p>1:13</p></div></div><div class="n4 bar "><div class="tips"></div><div class="bars"  rel="牛四" play="n4"  peilv="13"><strong>牛4</strong><p>1:13</p></div></div><div class="n5 bar "><div class="tips"></div><div class="bars" play="n5"  rel="牛五" peilv="13"><strong>牛5</strong><p>1:13</p></div></div><div class="n6 bar "><div class="tips"></div><div class="bars" play="n6"  rel="牛六" peilv="13"><strong>牛6</strong><p>1:13</p></div></div><div class="n7 bar "><div class="tips"></div><div class="bars" play="n7"  rel="牛七" peilv="13"><strong>牛7</strong><p>1:13</p></div></div><div class="n8 bar "><div class="tips"></div><div class="bars" play="n8"  rel="牛八" peilv="13"><strong>牛8</strong><p>1:13</p></div></div><div class="n9 bar "><div class="tips"></div><div class="bars" play="n9"  rel="牛九" peilv="13"><strong>牛9</strong><p>1:13</p></div></div><div class="nn bar "><div class="tips"></div><div class="bars" play="nn"  rel="牛牛" peilv="13"><strong>牛牛</strong><p>1:13</p></div></div></div><div class="dn_bottom"><div class="wn bar "><div class="tips"></div><div class="bars"  play="mn" rel="没牛" peilv="2.3"><strong>没牛</strong><p>1:2.3</p></div></div><div class="nda bar "><div class="tips"></div><div class="bars" play="nda"  rel="牛大" peilv="2.5"><strong>牛大</strong><p>1:2.5</p></div></div><div class="nx bar "><div class="tips"></div><div class="bars" play="nx" rel="牛小" peilv="2.5"><strong>牛小</strong><p>1:2.5</p></div></div><div class="nd bar "><div class="tips"></div><div class="bars" play="nd"  rel="牛单" peilv="2.5"><strong>牛单</strong><p>1:2.5</p></div></div><div class="ns bar "><div class="tips"></div><div class="bars" play="ns"  rel="牛双" peilv="2.5"><strong>牛双</strong><p>1:2.5</p></div></div></div>'
			break;
		case 'zh':
			return '<div class="sz_bar"><div class="sz_top"><div class="q3dz bar "><div class="tips"></div><div class="bars" play="qsdz"  rel="对子" peilv="3.6"><strong>前三对子</strong><p>1:3.6</p></div></div><div class="z3dz bar "><div class="tips"></div><div class="bars"  play="zsdz"  rel="对子" peilv="3.6"><strong>中三对子</strong><p>1:3.6</p></div></div><div class="h3dz bar "><div class="tips"></div><div class="bars"   play="hsdz" rel="对子" peilv="3.6"><strong>后三对子</strong><p>1:3.6</p></div></div><div class="q3sz bar "><div class="tips"></div><div class="bars"  play="qssz"  rel="顺子" peilv="16"><strong>前三顺子</strong><p>1:16</p></div></div><div class="z3sz bar "><div class="tips"></div><div class="bars"  play="zssz"  rel="顺子" peilv="16"><strong>中三顺子</strong><p>1:16</p></div></div><div class="h3sz bar "><div class="tips"></div><div class="bars"  play="hssz"  rel="顺子" peilv="16"><strong>后三顺子</strong><p>1:16</p></div></div></div><div class="sz_bottom"><div class="q3bs bar "><div class="tips"></div><div class="bars"  play="qsbs"  rel="半顺" peilv="2.7"><strong>前三半顺</strong><p>1:2.7</p></div></div><div class="z3bs bar "><div class="tips"></div><div class="bars"   play="zsbs" rel="半顺" peilv="2.7"><strong>中三半顺</strong><p>1:2.7</p></div></div><div class="h3bs bar "><div class="tips"></div><div class="bars"  play="hsbs"  rel="半顺" peilv="2.7"><strong>后三半顺</strong><p>1:2.7</p></div></div><div class="q3z6 bar "><div class="tips"></div><div class="bars"  play="qszl"  rel="杂六" peilv="3.3"><strong>前三杂六</strong><p>1:3.3</p></div></div><div class="z3z6 bar "><div class="tips"></div><div class="bars" play="zszl"   rel="杂六" peilv="2.7"><strong>中三杂六</strong><p>1:3.3</p></div></div><div class="h3z6 bar "><div class="tips"></div><div class="bars"   play="hszl" rel="杂六" peilv="2.7"><strong>后三杂六</strong><p>1:3.3</p></div></div></div></div>'
			break;
		default:
			return '<div class="sz_bar"><div class="dn_top"><div class="z0 bar "><div class="tips"></div><div class="bars" play="' + gameW + '0"  rel="0" peilv="9.7"><strong>0</strong><p>1:9.7</p></div></div><div class="z1 bar "><div class="tips"></div><div class="bars"  play="' + gameW + '1"  rel="1" peilv="9.7"><strong>1</strong><p>1:9.7</p></div></div><div class="z2 bar "><div class="tips"></div><div class="bars"  play="' + gameW + '2"  rel="2" peilv="9.7"><strong>2</strong><p>1:9.7</p></div></div><div class="z3 bar "><div class="tips"></div><div class="bars"  play="' + gameW + '3"  rel="3" peilv="9.7"><strong>3</strong><p>1:9.7</p></div></div><div class="z4 bar "><div class="tips"></div><div class="bars"  play="' + gameW + '4"  rel="4" peilv="9.7"><strong>4</strong><p>1:9.7</p></div></div><div class="z5 bar "><div class="tips"></div><div class="bars"  play="' + gameW + '5"  rel="5" peilv="9.7"><strong>5</strong><p>1:9.7</p></div></div><div class="z6 bar "><div class="tips"></div><div class="bars"   play="' + gameW + '6" rel="6" peilv="9.7"><strong>6</strong><p>1:9.7</p></div></div><div class="z7 bar "><div class="tips"></div><div class="bars"  play="' + gameW + '7"  rel="7" peilv="9.7"><strong>7</strong><p>1:9.7</p></div></div><div class="z8 bar "><div class="tips"></div><div class="bars"  play="' + gameW + '8"  rel="8" peilv="9.7"><strong>8</strong><p>1:9.7</p></div></div><div class="z9 bar "><div class="tips"></div><div class="bars"  play="' + gameW + '9"  rel="9" peilv="9.7"><strong>9</strong><p>1:9.7</p></div></div></div><div class="dn_bottom"><div class="zda bar "><div class="tips"></div><div class="bars"  play="' + gameW + 'da"  rel="大" peilv="1.97"><strong>大</strong><p>1:1.97</p></div></div><div class="zxiao bar "><div class="tips"></div><div class="bars"  play="' + gameW + 'x"  rel="小" peilv="1.97"><strong>小</strong><p>1:1.97</p></div></div><div class="zdan bar "><div class="tips"></div><div class="bars"  play="' + gameW + 'd"  rel="单" peilv="1.97"><strong>单</strong><p>1:1.97</p></div></div><div class="zshuang bar "><div class="tips"></div><div class="bars"  play="' + gameW + 's"  rel="双" peilv="1.97"><strong>双</strong><p>1:1.97</p></div></div></div></div>'
	}
}

function fullPlayTable() {
	if(typeof LotteryGame != 'undefined') {
		$.each(LotteryGame, function(index, value, array) {
			$("div[play='" + value.game + "'] p").text(value["odds"]);
		});
	}
	$(".bar").hover(function() {
		$(this).addClass("on");
	}, function() {
		$(this).removeClass("on");
	})

}

function getLotteryGame(games) {
	var peilv = 0;
	/*if (games == "wda" || games == "wx" || games == "wd" || games == "ws" ||
	games == "qda" || games == "qx" || games == "qd" || games == "qs" ||
	games == "bda" || games == "bx" || games == "bd" || games == "bs" ||
	games == "sda" || games == "sx" || games == "sd" || games == "ss" ||
	games == "gda" || games == "gx" || games == "gd" || games == "gs" ||
	games == "zda" || games == "zx" || games == "zd" || games == "zs") {
	return parseFloat(window.localStorage['rabate_min']) / 1000;
	}*/
	$.each(LotteryGame, function(index, value, array) {
//		console.log(value["game"])
		if(value["game"] == games) {
			peilv = value["odds"];
			return false;
		}
	});
	return peilv;
}

function get_room_details(room_id) {
	var $this = this;
	var json = {
		'sign': sign,
		'room_id': room_id,
		'user_id': user_id,
		'token': token
	}
	if(typeof window.localStorage['room_pass'] != "undefined") {
		json.password = window.localStorage['room_pass'];
	}
//	console.log(JSON.stringify(json))
	mui.ajax(uri + 'Room/Roominfo', {
		dataType: 'json',
		data: json,
		type: 'post',
		success: function(data) {
			if(data.code == 0) {
				//get_room_details(window.localStorage['room_id'])
				//                   window.location.href="#!banker";
				toast('获取房间信息失败')
			} else if(data.code == 1) {
				$('#is_leftmoney').text(data[0].balance)
				$('#user_member').text(data[0].zjname)
				window.localStorage['sz_lot_id'] = data[0].lottery
				window.localStorage['sz_flevel_modes'] = data[0].flevel_modes
				$('.sz_logo').html(data[0].lottery_name)
				if(user_id == data[0].banker_id) {
					$("#submit_banker").attr({
						'type': 1
					})
				}
				$("#lot_id").val(data[0].lottery)
				get_room_lot_info(data[0].lottery, room_id)

				get_lot_info(data[0].lottery);
			} else if(data.code == 6) {
				toast('房间密码错误')
			}
		}
	})
}

function get_room_lot_info(id, room_id) {
	var $this = this;
	var json = {
		'sign': sign,
		'lottery': id,
		'user_id': user_id,
		'token': token
	}
	mui.ajax(uri + 'Play/Bet', {
		dataType: 'json',
		data: json,
		type: 'get',
		success: function(data) {
			//  		console.log(JSON.stringify(data))
			var cur_issue = data.no;
			var cur_time = Date.parse(new Date(data.serverdate));
			var next_time = Date.parse(new Date(data.buyenddate));
			var intDiff = (next_time - cur_time) / 1000

			var cur_timef = Date.parse(new Date(data.serverdate));
			var next_timef = Date.parse(new Date(data.sealdate));
			var intDifff = (next_timef - cur_timef) / 1000

			$('#cur_issue').text(cur_issue)
			$('#pre_issue').text(Number(cur_issue) - 1)
			if(typeof(countDownTimer) != "undefined") clearInterval(countDownTimer)
			if(typeof(openballTimer) != "undefined") clearInterval(openballTimer)
			console.log(id)
			console.log(Number(cur_issue) - 1)
			get_banker_details(id, Number(cur_issue) - 1)

			if(intDiff < 0) {
				if(intDifff > 0) {
					isszFengdan = true;
					mui.alert('<span id="fengdantime">00</span>秒', '结束投注,等待开奖', '', null, 'div')
					$(".sz_cur_info p").html("<span style='color:red;'>封单中</span>");
					sz_timer(intDifff, id)
				} else {
					toast('本期已经封单，请投注下一期')
					get_room_lot_info(id)
				}
			} else {
				mui.closePopups();
				isszFengdan = false;
				$(".sz_cur_info p").text("正在销售");
				sz_timer(intDiff, id)
			}
			get_noreport_list(room_id, cur_issue)
		}
	})
}

function get_lot_info(id, callback) {
	var $this = this;
	var json = {
		'sign': sign,
		'lottery': id,
		'user_id': user_id,
		'token': token
	}
	mui.ajax(uri + 'Common/GetLotteryInfo', {
		dataType: 'json',
		data: json,
		type: 'post',
		success: function(data) {
			var min = data.rebate_mode_min;
			var max = flevel_modes = parseFloat(window.localStorage['cp_fd']) * 20 + parseFloat(data.rebate_mode_min.replace('"', ''));
			cur_flevel_modes = min;
			isMinFan = false;
			$('#flevel_modes').html('<option value="' + max + '" data-id="' + max + '">' + max + ' - 0.00%</option><option value="' + min + '" data-id="' + min + '">' + min + ' - ' + parseFloat(window.localStorage['cp_fd']) + '%</option>')
			$("#flevel_modes").change(function() {
				var jjhtml = '';
				if(curBetMonery.indexOf(',') > -1) {
					var jjarr = curBetMonery.split(',');
					for(var i = 0; i < jjarr.length; i++) {
						if(cur_flevel_modes == $(this).val()) {
							isMinFan = true;
							jjhtml += jjarr[i] + '/';
						} else {
							isMinFan = false;
							jjhtml += (parseFloat(jjarr[i]) + parseFloat(jjarr[i]) / parseFloat(cur_flevel_modes) * parseFloat(window.localStorage['cp_fd']) * 20).toFixed(3) + '/';
						}
					}
					jjhtml = jjhtml.substr(0, jjhtml.length - 1);
				} else {
					if(cur_flevel_modes == $(this).val()) {
						isMinFan = true;
						jjhtml = curBetMonery;
					} else {
						isMinFan = false;
						jjhtml = (parseFloat(curBetMonery) + parseFloat(curBetMonery) / parseFloat(cur_flevel_modes) * parseFloat(window.localStorage['cp_fd']) * 20).toFixed(3);
					}
				}
				$("#jj").text(jjhtml).attr("rel", jjhtml);
			});
			window.localStorage['price'] = data.price;
			window.localStorage['rabate_min'] = data.rebate_mode_min;
			window.localStorage['rabate_max'] = data.rebate_mode_max;

			if(typeof callback === "function") {
				callback();
			}
			//              $("#zst").attr("href",siteUrl+"/zs/index.php?type="+id);
		}
	})
}

function get_noreport_list(id, issue) {
	var json = {
		'sign': sign,
		'room_id': id,
		'no': issue,
		'user_id': user_id,
		'token': token
	}
	//	 console.log(JSON.stringify(json))
	mui.ajax(uri + 'Room/noreport', {
		dataType: 'json',
		data: json,
		type: 'get',
		success: function(data) {
			//	 	console.log(JSON.stringify(data))
			if(data.code == 1) {
				var html = ''
				$.each(data, function(i, v) {
					if(v != 1) {
						html += '<tr>'
						html += '<td>' + v.play_name + '</td>'
						html += '<td>' + v.price + '</td>'
						html += '</tr>'
					}

				})
				$('#sz_noreport_list').html(html)
			} else if(data.code == 0) {
				var html = ''
				html += '<tr>'
				html += '<td>暂无更多数据</td>'
				html += '</tr>'
				$('#sz_noreport_list').html(html)
			}
		}
	})
}
$(".cancel_btn").click(function() {
	$(".tips").html("");
	$("#sz_bet_main .chip").remove();
});

var html = '';
$("#confirm_btn").click(function() {
	if(isszFengdan) {
		toast("本期已封单,请稍后投注");
		return false;
	}

	var data = [];
	var issue = $('#cur_issue').text();
	var lot_id = $("#lot_id").val();
	var szbar = $(".sz_bar").find(".bars");
	var total_price = 0;
	for(var i = 0; i < szbar.length; i++) {
		var bars = $(szbar[i]);
		if(bars.find("div").length != 0) {
			var priceTmp = 0;
			var barsDiv = bars.find("div");
			for(var j = 0; j < barsDiv.length; j++) {
				var nums = Number($(barsDiv[j]).attr('rel'))
				priceTmp += nums
			}
			total_price += priceTmp;
			var str = {
				'play': bars.attr("play"),
				'num': bars.attr("rel"),
				'peilv': getLotteryGame(bars.attr("play")),
				'price': priceTmp,
				'pattern': 1,
				'zhushu': 1,
				'multiple': 1
			}
			data.push(str)
		}
	}
	if(total_price == 0) {
		toast("请先投注");
		return;
	}

	mui.confirm('您当期总投注' + total_price + '元？', '确认信息', ['取消', '确定'], function() {
		var json = {
			'user_id': user_id,
			'token': token,
			'sign': sign,
			'total_zhushu': data.length,
			'lottery': lot_id,
			'no': issue,
			'flevel_modes': window.localStorage['rabate_min'],
			'total_price': Number(total_price),
			'data': data,
			'room_id': window.localStorage['room_id']
		}
		console.log(JSON.stringify(json))
		go_szOrder(json)
	});
});

function go_szOrder(json) {
	mui.ajax(uri + 'Room/BetIng', {
		dataType: 'json',
		data: json,
		type: 'get',
		success: function(data) {
			console.log(JSON.stringify(data))
			switch(data.code) {
				case 0:
					toast('投注失败')
					break;
				case 1:
					toast('投注成功')
					get_room_details(json.room_id);
					get_user_info();
					break;
				case 2:
					toast('提交数据不全')
					break;
				case 3:
					toast('检查彩种是否可投注')
					break;
				case 4:
					toast('查询该期号是否开奖')
					break;
				case 5:
					toast('返点模式有误')
					break;
				case 6:
					toast('玩法 用户返点 系统最低返点 BA彩种')
					break;
				case 7:
					toast('单注投注数单不正确')
					break;
				case 8:
					toast('单注投注金额不正确')
					break;
				case 9:
					toast('金额 注数对比')
					break;
				case 10:
					toast('检查玩法是否开放')
					break;
				case 11:
				case 12:
					toast('上庄余额不足,请点击上方--->申请上庄--进行转账')
					break;
				case 20:
					toast('房间不存在')
					break;
				case 21:
					toast('房间余额不足')
					break;
			}
		}
	})
}

function get_user_info() {
	var json = {
		'user_id': user_id,
		'token': token,
		'sign': sign
	};
	mui.ajax(uri + 'Account/GetPayBankCode', {
		dataType: 'json',
		data: json,
		type: 'get',
		success: function(data) {
			usermoney = data.balance;
			window.localStorage['usermoney'] = usermoney;
			$(leftmoney).text(usermoney);
			$(szmoney).text(data.banker_balance);
			window.localStorage['banker_balance'] = data.banker_balance;
			window.localStorage['flevel_fd'] = data.flevel_fd;

			var show_day = new Array('星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日');
			var time = new Date();
			var day = time.getDay();
			var now_time = getNowFormatDate() + '  ' + show_day[day - 1];
			$("#dayqi").text(now_time);
		}
	})
}

function timer(intDiff, id, cur_issue) {
	$this = this;
	toast = window.setInterval(function() {
		var day = 0,
			hour = 0,
			minute = 0,
			second = 0;
		if(intDiff > 0) {
			hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
			minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
			second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
		}
		if(hour <= 9) hour = '0' + hour;
		if(minute <= 9) minute = '0' + minute;
		if(second <= 9) second = '0' + second;
		$('.hours').html(hour);
		$('.minutes').html(minute);
		$('.seconds').html(second);
		intDiff--;
		if(intDiff < 0) {
			// clearInterval(countDownTimer)
			toast('本期已经封单，请投注下一期')
			get_bet_info(id)
			get_open_list(id)
		}
	}, 1000);
}

function get_bet_info(id) {
	$('.hours,.minutes,.seconds').text('00');
	var $this = this;
	var json = {
		'sign': sign,
		'lottery': id,
		'user_id': user_id,
		'token': token
	}
	mui.ajax(uri + 'Play/Bet', {
		dataType: 'json',
		data: json,
		type: 'get',
		success: function(data) {
			if(data.code == 0) {
				toast('本期已暂停销售')
				return false;
			}
			var cur_issue = data.no;
			var cur_time = Date.parse(new Date(data.serverdate));
			var next_time = Date.parse(new Date(data.buyenddate));
			var intDiff = (next_time - cur_time) / 1000
			$('#cur_issue').text(cur_issue)
			$('#pre_issue').text(data.last_no)
			if(typeof(countDownTimer) != "undefined") clearInterval(countDownTimer)
			if(typeof(openballTimer) != "undefined") clearInterval(openballTimer)
			get_bet_details(id, data.last_no)
			if(intDiff < 0) {
				toast('本期已经封单，请投注下一期')
				get_bet_info(id)
			} else {
				timer(intDiff, id)
			}
		}
	})
}

function get_open_list(id) {
	var $this = this;
	var num = 20;
	if(id.indexOf('bjl') > -1) {
		num = 41;
	} else if(id.indexOf('sz') > -1) {
		num = 62;
	}
	var json = {
		'lottery': id,
		'sign': sign,
		'num': num,
		'user_id': user_id,
		'token': token
	};
	mui.ajax(uri + 'Common/GetRecentLotteryInfo', {
		dataType: 'json',
		data: json,
		type: 'get',
		success: function(data) {
			OpenListnewArray = [];
			$.each(data, function(i, v) {
				if(v != 1) {
					OpenListnewArray.push(v);
				}
			});

			if(id.indexOf('bjl') > -1) {
				fullbjltable(OpenListnewArray);
			} else if(id.indexOf('sz') > -1) {
				var type = $('.szmenu a[class=active]').attr('data-id');
				fullsztable(type);
			} else {
				var html = '';
				$.each(data, function(i, v) {
					if(v != 1 && v.number != '') {
						html += '<tr>'
						var arr = v.number.split(',')
						html += '<td>' + v.no + '</td>'
						html += '<td>'
						$.each(arr, function(k, n) {
							html += '<i>' + n + '</i>'
						})
						html += '</td>'
						html += '</tr>'
					}
				})
				$('#bet_top_tbody').html(html)
			}
		}
	})
}

function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	return currentdate;
}

function fullbjltable(result) {
	$("#openleft .mod-sprite,#openright .mod-sprite").remove();
	var index = 0;
	var prve = '';
	var znum = 0;
	var xnum = 0;
	var hnum = 0;
	var sumnum = 0;
	for(var i = result.length - 1; i >= 0; i--) {
		var v = result[i];
		if(v != 1 && v.zx != '') {
			var htmlleft = '';
			var htmlright = '';
			if(v.zx == '庄') {
				htmlleft += '<i class="mod-sprite i-iconb-b"></i>';
				htmlright = '<i class="mod-sprite i-iconb-e"></i>';
				znum++;
			} else if(v.zx == '闲') {
				htmlleft += '<i class="mod-sprite i-iconb-a"></i>';
				htmlright = '<i class="mod-sprite i-iconb-d"></i>';
				xnum++;
			} else {
				htmlleft += '<i class="mod-sprite i-iconb-c"></i>';
				htmlright = '<i class="mod-sprite i-iconb-f"></i>';
				hnum++;
			}
			$("#openleft li").eq(index).html(htmlleft);
			index++;
			var ulindex = $("#openright").find(".mod-sprite:last").parent("li").parent("ul").index();
			ulindex = ulindex == -1 ? 0 : ulindex;
			var liindex = $("#openright").find(".mod-sprite:last").parent("li").index();
			liindex = liindex == -1 ? 0 : liindex + 1;
			if(v.zx != prve && prve != '' || liindex == 8) {
				ulindex += 1;
				liindex = 0;
			}
			if(ulindex == 28 && liindex == 0) {
				$("#openright ul").eq(0).find("li").html('');
				$("#openright").append($("#openright ul").eq(0));
				ulindex--;
			}
			$("#openright ul").eq(ulindex).find("li").eq(liindex).html(htmlright);;
			prve = v.zx;
		}
	}
	$("#znumtext").text(znum);
	$("#xnumtext").text(xnum);
	$("#hnumtext").text(hnum);
	$("#snumtext").text(znum + xnum + hnum);
}

function get_banker_details(id, issue) {
	if(typeof(openballTimer) != "undefined") clearInterval(openballTimer);
	var json = {
		'no': issue,
		'lottery': id,
		'user_id': user_id,
		'token': token,
		'sign': sign
	}
	//  console.log(JSON.stringify(json))
	mui.ajax(uri + 'Common/GetNoLotteryInfo', {
		dataType: 'json',
		data: json,
		success: function(data) {
			if(data.number == '' || typeof(data.number) == 'undefined') {
				window.openballTimer = setTimeout(function() {
					get_banker_details(id, issue)
				}, 3000);
				$('.sz_openball').html('<i class="waiting">正</i><i class="waiting">在</i><i class="waiting">开</i><i class="waiting">奖</i><i class="waiting">中</i>')
			} else {
				var arr = data.number.split(',')
				var html = ''
				$.each(arr, function(i, v) {
					html += '<i>' + v + '</i>'
				})
				$('.sz_openball').html(html)
				get_open_list(id)
			}
		}
	})
}

function sz_timer(intDiff, id, cur_issue) {
	var $this = this;
	countDownTimer = window.setInterval(function() {
		var day = 0,
			hour = 0,
			minute = 0,
			second = 0;
		if(intDiff > 0) {
			hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
			minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
			second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
		}
		if(hour <= 9) hour = '0' + hour;
		if(minute <= 9) minute = '0' + minute;
		if(second <= 9) second = '0' + second;
		$('.hours').html(hour);
		$('.minutes').html(minute);
		$('.seconds').html(second);
		$("#fengdantime").text(second);
		intDiff--;
		//              console.log(intDiff)
		if(intDiff < 0) {
			// clearInterval(countDownTimer)
			//func.layerAlert('本期已经封单，请投注下一期')
			get_banker_details(id, cur_issue)
			get_room_details(window.localStorage['room_id'])
		}
	}, 1000);
}

function get_inner_room_list() {
	var $this = this;
	var json = {
		'sign': sign,
		'user_id': user_id,
		'token': token
	}
	mui.ajax(uri + 'Room/Roomlist', {
		dataType: 'json',
		data: json,
		type: 'get',
		success: function(data) {
			var html = ''
			$.each(data, function(i, v) {
				if(v != 1) {
					html += '<li data-id="' + v.room_id + '" rel="' + v.ispass + '">' + v.lottery_name + '</li>'
				}
			})
			$('#room_list').html(html)
			$("#room_list li").click(function() {
				var szlot = $(this).attr('szlot')
				$(".bars,.tips").html("");
				var roomid = $(this).attr('data-id')
				var ispass = $(this).attr("rel");
				if(ispass == "1") {

					mui.prompt({
						title: '请输入房间密码',
						formType: 1
					}, function(pass, index) {
						window.localStorage['sz_lot_id'] = szlot
						checck_room_details(roomid, pass, 1);
					});
				} else {
					window.localStorage['sz_lot_id'] = szlot
					window.localStorage['room_id'] = roomid
					console.log(roomid)
					get_room_details(roomid)
					get_line_up_list(roomid)
					//get_lot_info(window.localStorage['sz_lot_id']);
				}
			})
		}
	})
}

function get_line_up_list(id) {
	var json = {
		'sign': sign,
		'room_id': id,
		'user_id': user_id,
		'token': token
	}
	mui.ajax(uri + 'Room/Roomline', {
		dataType: 'json',
		data: json,
		type: 'get',
		success: function(data) {
			if(data.code == 1) {
				var isben = false;
				var chehtml = '';
				var html = ''
				$.each(data, function(i, v) {
					//                  	console.log(v.play_name)
					if(v != 1) {
						if(v.banker_id == user_id) {
							isben = true;
							chehtml = '<div class="sz_title che_sz" id="deroomline" data-id="' + v.roomline_id + '">撤销上庄</div>';
						}
						html += '<tr>'
						html += '<td>' + v.zjname + '</td>'
						html += '<td>' + v.balance + '</td>'
						html += '</tr>'
					}
				})
				if(isben) {
					$("#chezhuang").html(chehtml);
				}
				$('#sz_line_up_tbody').html(html)
			} else if(data.code == 0) {
				var html = ''
				html += '<tr>'
				html += '<td>暂无更多数据</td>'
				html += '</tr>'
				$('#sz_line_up_tbody').html(html)
			}
		}
	})
}

function shenqing_room(room_id, drawword, price) {
	var json = {
		'sign': sign,
		'token': token,
		'user_id': user_id,
		'room_id': room_id,
		'drawword': drawword,
		'price': price
	};
	mui.ajax(uri + 'Room/regroomline', {
		dataType: 'json',
		data: json,
		type: 'get',
		success: function(data) {
			console.log(JSON.stringify(data))
			switch(data.code) {
				case 0:
					return toast('申请失败')
					break;
				case 1:
					toast('申请成功')
					window.localStorage['banker_balance'] = parseFloat(window.localStorage['banker_balance']) - price;
					setTimeout('location.reload()', 1000);
					break;
				case 2:
					return toast('检查上庄金额必须大于50000')
					break;
				case 3:
					return toast('房间不存在')
					break;
				case 4:
					return toast('庄家余额不足')
					break;
				case 5:
					return toast('资金密码有误')
					break;
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

function get_room_record(search_time_s, search_time_e, record_no, order_status, lottery, page_no) {
	var json = {
		'sign': sign,
		'user_id': user_id,
		'token': token,
		'search_time_s': search_time_s,
		'search_time_e': search_time_e,
		'chase_no': record_no,
		'order_status': order_status,
		'record_no': '',
		'lottery': lottery,
		'page_no': page_no,
		'page_size': 10
	}
	console.log(JSON.stringify(json))
	mui.ajax(uri + 'RoomReport/GetRoomBetRecord', {
		data: json,
		dataType: 'json',
		type: 'get',
		success: function(data) {
			console.log(JSON.stringify(data))
			var html = ''
			if(data.code == 0 || typeof data.info == "undefined") {
				html += '<ul>'
				html += '<li>暂无数据</li>'
				html += '</ul>'

			} else {
//				console.log(data.info)
				$.each(data.info, function(i, v) {
					html += '<ul data-id="' + v.dan + '" class="sz_news clearfloat">'
					html += '<li>' + v.dan + '</li>'
					html += '<li>' + v.username + '</li>'
					html += '<li>' + v.room_id + '</li>'
					html += '<li>' + v.adddate + '</li>'
					html += '<li>' + v.lottery_name + '</li>'
					html += '<li>' + v.mid + '</li>'
					html += '<li>' + v.issue + '</li>'
					html += '<li>' + v.codes + '</li>'
					html += '<li>' + v.times + '</li>'
					html += '<li>' + checkBetMode(v.mode) + '</li>'
					html += '<li>' + v.money + '</li>'
					if(v.price == '') {
						html += '<li>暂无</li>'
					} else {
						html += '<li>' + v.pirze + '</li>'
					}
					html += '<li>' + v.kjcode + '</li>'
					if(v.status == '1') {
						html += '<li>未开奖<i class="sz_details"></i></li>'
					} else if(v.status == '2') {
						html += '<li>未中奖<i class="sz_details"></i></li>'
					} else if(v.status == '3') {
						html += '<li>已中奖<i class="sz_details"></i></li>'
					} else if(v.status == '4') {
						html += '<li>已删除<i class="sz_details"></i></li>'
					} else if(v.status == '5') {
						html += '<li>撤单<i class="sz_details"></i></li>'
					} else if(v.status == '6') {
						html += '<li>停止<i class="sz_details"></i></li>'
					}
					html += '</ul>'
				})
			}
			console.log(html)
			$('.sz_scroll').append(html)
			mui(".sz_look").on('tap', '.sz_news li:last-child', function() {
				var dan = $(this).parents('ul').attr('data-id')

				get_room_record_details(dan)
			})
		}
	})
}

function get_room_record_details(dan) {
	var json = {
		'sign': sign,
		'user_id': user_id,
		'token': token,
		'dan': dan
	}
	console.log(JSON.stringify(json))
	mui.ajax(uri + 'RoomReport/GetBetRoomDetail', {
		data: json,
		dataType: 'json',
		type: 'get',
		success: function(data) {
			console.log(JSON.stringify(data))
			var html = '';
			html += '<ul>' +
				'        		<li><a>订单号：</a><span>' + data.dan + '</span></li>' +
				'        		<li><a>用户名：</a><span>' + data.username + '</span></li>' +
				'        		<li><a>房间ID：</a><span>' + data.room_id + '</span></li>' +
				'        		<li><a>彩种：</a><span>' + data.lottery + '</span></li>' +
				'        		<li><a>玩法：</a><span>' + data.mid + '</span></li>' +
				'        		<li><a>期号：</a><span>' + data.issue + '</span></li>' +
				'        		<li><a>创建时间：</a><span>' + data.adddate + '</span></li>' +
				'        		<li><a>奖金组：</a><span>' + data.flevel_modes + '</span></li>' +
				'        	</ul>' +
				'        	<ul>' +
				'        		<li><a>投注内容：</a><span>' + data.codes + '</span></li>' +
				'        		<li><a>倍数：</a><span>' + data.times + '</span></li>' +
				'        		<li><a>模式：</a><span>' + checkBetMode(data.mode) + '</span></li>' +
				'        		<li><a>奖金：</a><span>' + data.pirze + '</span></li>' +
				'        		<li><a>投注金额：</a><span>' + data.pirze + '</span></li>' +
				'        		<li><a>返点：</a><span>' + data.flevel_fd + '</span></li>' +
				'        		<li><a>开奖号码：</a><span>' + data.kjcode + '</span></li>' +
				'        		<li><a>状态：</a><span>' + checkBetStatus(data.status) + '</span></li>' +
				'        	</ul>';
			$('.sz_particulars').append(html);
			$('.sz_particulars').fadeIn(500)
			$('.sz_look').fadeOut(500)
		}
	})
}

function checkBetMode(str) {
	if(str == '1') {
		return '元'
	} else if(str == '0.1') {
		return '角'
	} else if(str == '0.01') {
		return '分'
	} else if(str == '0.001') {
		return '厘'
	}
}

function checkBetStatus(str) {
	if(str == '1') {
		return '未开奖'
	} else if(str == '2') {
		return '未中奖'
	} else if(str == '3') {
		return '已中奖'
	} else if(str == '4') {
		return '已删除'
	} else if(str == '5') {
		return '撤单'
	} else if(str == '6') {
		return '停止'
	}
}
mui("body").on("tap", "#deroomline", function() {
	var roomline_id = $(this).attr("data-id");

	mui.confirm('是否取消排队上庄？', '', ['取消', '确定'], function(e) {
		if(e.index == 1) {
			deroomline(roomline_id)
		}
	});
});

function deroomline(roomline_id) {
	var room_id = window.localStorage['room_id'];
	console.log(room_id)
	var json = {
		'sign': sign,
		'user_id': user_id,
		'token': token,
		'room_id': room_id,
		'roomline_id': roomline_id
	}
	mui.ajax(uri + 'Room/deroomline', {
		data: json,
		dataType: 'json',
		type: 'get',
		success: function(data) {
			console.log(JSON.stringify(data))
			if(data.code == 0) {
				toast('排队取消失败')
			} else {
				toast('排队取消成功')
				setTimeout('location.reload() ', 1000)
			}
		}
	})
}

function getLotteryAll(){
	var json = {
			'sign': sign,
			'lottery': window.localStorage['sz_lot_id'],
			'user_id':user_id,
			'token':token
		}
	mui.ajax(uri+'Common/GetLotteryAll',{
		data: json,
		dataType: 'json',
		type: 'get',
		success:function(data){
//			console.log(JSON.stringify(data));
			LotteryGame = data.game;
			fullPlayTable();
		}
	})

}
