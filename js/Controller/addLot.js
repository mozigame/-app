/*
 * 自定义彩种
 */


if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

mui('.custom').on('tap', '.add', function(e) {
	$(this).text('x')
	$(this).attr('class','del')
	var obj = $(this).parents('li')
	var name = obj.attr('data-name')
	var text = obj.attr('data-text')
	$('#customLot').append('<li data-name="'+name+'" data-text="'+text+'">'+obj.html()+'</li>')
	obj.remove()
})

mui('.custom').on('tap', '.del', function(e) {
	$(this).text('+')
	$(this).attr('class','add')
	var obj = $(this).parents('li')
	var name = obj.attr('data-name')
	var text = obj.attr('data-text')
	$('#waitLot').append('<li data-name="'+name+'" data-text="'+text+'">'+obj.html()+'</li>')
	obj.remove()
})

mui('#topBar').on('tap', '#back', function(e) {
	var c_tem = []
	var w_tem = []
	var wb = plus.webview.getWebviewById('../Home/home.html')
	$.each($('#customLot li'), function(i,v) {
		var lotname = $(this).attr('data-name')
		var lottext = $(this).attr('data-text')
		var str = {"text":lottext,"name":lotname}
		c_tem.push(str)
	});
	$.each($('#waitLot li'), function(i,v) {
		var lotname = $(this).attr('data-name')
		var lottext = $(this).attr('data-text')
		var str = {"text":lottext,"name":lotname}
		w_tem.push(str)
	});
	var json = {"exsit":c_tem,"wait":w_tem}
	window.localStorage['customLot'] = JSON.stringify(json)
	mui.fire(wb,'refreshLotList',{
	})
	
	plus.webview.currentWebview().close()
});

function plusReady() {
	var para = plus.webview.currentWebview().value;
	console.log(para)
	console.log(JSON.parse(para))
//	console.log(JSON.parse(para))
	var a=JSON.parse(para);
	var para1=a.filter(function(item){
	return item.text && item.text !== "undefined" && item.text !== null 
})
	getCustomList(JSON.stringify(para1))
	if(customLot){
	   getWaitLotList()	
	}else{
	   getOtherLotList()	
	}
	addDesc()
}


function getCustomList(para){
	$('#customLot').empty()
	var html = ''
	$.each(JSON.parse(para), function(i,v) {
		if(v.name!="undefined"){
		if(v.name  != 'flbssc'&&v.name  != 'szcqssc'&&v.name  != 'sztxffc'&&v.name  != 'bjlcqssc'&&v.name  != 'bjltxffc'&&v.name  != 'bjlhgssc'&&v.name  != 'bjlflbssc'&&v.name  != 'szhgssc'&&v.name  != 'jsk3'){
		  html += '<li data-text="'+v.text+'" data-name="'+v.name+'"><img src="../../images/type/'+v.name+'.png" width="50" /><span>'+v.text+'</span><a href="javascript:;" class="del">x</a></li>'
       }
		}
	});
    $('#customLot').append(html)
}

function getOtherLotList(){
	console.log(lotArr)
	var html = ''
    $.each(JSON.parse(lotArr), function(i,v) {
    	if(v.name!="undefined"){
    	if(v.name  != 'flbssc'&&v.name  != 'szcqssc'&&v.name  != 'sztxffc'&&v.name  != 'bjlcqssc'&&v.name  != 'bjltxffc'&&v.name  != 'bjlhgssc'&&v.name  != 'bjlflbssc'&&v.name  != 'szhgssc'&&v.name  != 'jsk3'){
		   html += '<li data-text="'+v.lottery_name+'" data-name="'+v.lottery+'"><img src="../../images/type/'+v.lottery+'.png" width="50" /><span>'+v.lottery_name+'</span><a href="javascript:;" class="add">+</a></li>'
		}
    }
    });
    $('#waitLot').append(html)
}

function getWaitLotList(){
	
	var obj = JSON.parse(customLot).wait
	console.log(obj)
	var html = ''
    $.each(obj, function(i,v) {
    	if(v.name!="undefined"){
        if(v.name  != 'flbssc'&&v.name  != 'szcqssc'&&v.name  != 'sztxffc'&&v.name  != 'bjlcqssc'&&v.name  != 'bjltxffc'&&v.name  != 'bjlhgssc'&&v.name  != 'bjlflbssc'&&v.name  != 'szhgssc'&&v.name  != 'jsk3'){
        	html += '<li data-text="'+v.text+'" data-name="'+v.name+'"><img src="../../images/type/'+v.name+'.png" width="50" /><span>'+v.text+'</span><a href="javascript:;" class="add">+</a></li>'
        }
      }
    });
    console.log(html)
    $('#waitLot').append(html)
}

function addDesc(){
	$.each($('#air ul li'), function(i,v) {
		var name = $(this).attr('data-name')
		var html = ''
		switch (name) {
			case 'fc3d' :
			  html += '<p>'+lotDesc['3d']+'<p>' 
			  break;
			case 'pl3' :
			  html += '<p>'+lotDesc['p3']+'<p>' 
			  break;
			case 'bjpk10' :
			  html += '<p>'+lotDesc['pk10']+'<p>' 
			  break;
			case 'gd11x5' :case 'sd11x5' :case 'jx11x5' :case 'hlj11x5' :
			  html += '<p>'+lotDesc['115']+'<p>' 
			  break;
			case 'hgssc' :case 'djssc' :case 'dbssc' :case 'jlpssc' :case 'wh1fc' :case 'xyhgssc' :case 'xyjlpssc' :case 'xymskssc' :case 'xyxjpssc' :case 'xywh2fc' :case 'jlpffc' :case 'mskssc' :
			  html += '<p>'+lotDesc['mmc']+'<p>' 
			  break;
			case 'wh5fc' :case 'mlxy3fc' :case 'dbssc' :
			  html += '<p>'+lotDesc['ffc']+'<p>' 
			  break;
			default :
			  html += '<p>'+lotDesc['ssc']+'<p>'
			  break;
	    }
		$(this).append(html)
    });
}
