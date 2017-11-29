/*
 * 追号页面
 */
var price;
var order_info;
if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

function plusReady() {
	var wv = plus.webview.currentWebview()
	price = wv.value.data[0].price
	getList(wv.value.lottery)
	window.localStorage['chaseInfo'] = JSON.stringify(wv.value)
}

mui('#topBar').on('tap', '#back', function(e) {
    plus.webview.currentWebview().close()
});

$('#chase-list').on('tap', 'li input[type=checkbox]', function(e) {
	$(this).toggleClass('active')
	if($(this).hasClass('active')){
		var input_je = $(this).parents('li').find('input[type=number]')
		input_je.val('1')
		var bouns = Number(input_je.val())*Number(price)*1
		var single_je = $(this).parents('li').find('.je').text(bouns.toFixed(2))
	}else{
		input_je.val('')
		$(this).parents('li').find('.je').text('0.00')
	}
});

$('#chase-list').on('change', 'li input[type=number]', function(e) {
	var bouns = Number($(this).val())*Number(price)*1
	$(this).parents('li').find('.je').text(bouns.toFixed(2))
})

$('body').on('tap', '#navBar', function(e) {
	var detail = JSON.parse(window.localStorage['chaseInfo'])
	var data_no = []
	var multiple_data = []
	var price_data = []
	var num_data = []
	var play_data = []
	var rxw_data = []
	var each_zhushu_data = []
	var each_price_data = []
	var pattern_data = []
	var each_multiple_data = []
	$.each($('#chase-list li .active'), function() {
		var $this = $(this).parents('li')
		data_no.push($this.find('.no').text())
		multiple_data.push(Number($this.find('input[type=number]').val()))
		price_data.push($this.find('.je').text())
		play_data.push(detail.data[0].play)
		num_data.push(detail.data[0].num)
		rxw_data.push(detail.data[0].rxw)
		each_zhushu_data.push(detail.data[0].zhushu)
		each_price_data.push(detail.data[0].price)
		pattern_data.push(detail.data[0].pattern)
		each_multiple_data.push(Number($this.find('input[type=number]').val()))
	});
	var json = {
		"user_id":user_id,
        "token":token,
        "sign":sign,
        "no_data":data_no,
        "multiple_data":multiple_data,
        "price_data":price_data,
        "num_data":num_data,
        "play_data":play_data,
        "rxw_data":rxw_data,
        "each_zhushu_data":each_zhushu_data,
        "each_price_data":each_price_data,
        "pattern_data":pattern_data,
        "each_multiple_data":each_multiple_data,
        "lottery":detail.order_lottery,
        "total_zhushu":detail.total_zhushu,
        "flevel_modes":detail.flevel_modes,
        "total_price":detail.total_price,
        "isyes":1,
        "way":"同倍追号"
	}
    console.log(JSON.stringify(json))
    mui.ajax(uri+'Play/BetRunIng',{
        dataType:'json',
        data: json,
        type:'post',
        success:function(data){
        	console.log(JSON.stringify(data))
        	if(data.code == 1){
        		toast("追号成功")
        		setTimeout('plus.webview.currentWebview().close()',1000)
        	}else{
        		toast("追号失败")
        	}
        }
    })
})

function getList(lot){
	plus.nativeUI.showWaiting()
	$('#chase-list').empty()
	mui.ajax(uri+'Play/GetChaseRecordNoList?lottery='+lot+'&sign='+sign+'&token='+token+'&user_id='+user_id,{
        dataType:'json',
        type:'get',  
        success:function(data){
//      	if(data.code == 202){
//          	plus.runtime.restart()
//          }
        	var html = ''
        	$.each(data.data, function(i,v) {
        		html += '<li><span class="no">'+v.no+'</span><span><input type="number">倍</span><span class="je">0.00</span><span class="mui-input-group">'
        		html += '<div class="mui-input-row mui-checkbox mui-left"><label></label><input name="checkbox" value="Item 1" type="checkbox"></div></span></li>'
        	});
        	$('#chase-list').append(html)
            plus.nativeUI.closeWaiting()
        }
    })      
}

