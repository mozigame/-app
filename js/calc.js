/*
 * 生成注数及金额
 */

var arr_115_rx;

function calcSSC(playName){
	bs = Number($('#test').val())
	ms = Number($('#bet-select .active').attr('data-val'))
	switch (playName){
		case '5xfs' : case '4xq4fs' : case '4xh4fs' : case '3xq3fs' : case '3xz3fs' : case '3xh3fs' : case '2xq2fs' : case '2xh2fs' :
		case '5xyffs' : case '5xhscs' : case '5xsxbx' : case '5xsjfc' : 
		case 'q2dxds' : case 'h2dxds' : case 'lhwq' : case 'lhws': case 'lhwb' : case 'lhwg' : case 'lhqb' : case 'lhqs' : case 'lhqg' : case 'lhbs' : case 'lhbg' :case 'lhsg' : 
		case 'zxfs' :  case 'q2zxfs' : case 'h2zxfs' : case 'zhdx' : case 'zhds' : case 'zdds' :
		  zhixuanfs()
		  break;
		case 'zxds' :
		  var reg = /\d{3}/
		  zhixuanDSPL(reg,3,'','')
		  break;
		case '5xds' : 
		  var reg = /\d{5}/
		  zhixuanDS(reg,5,'','')
		  break;
		case '4xq4ds' :case '4xh4ds' : 
          var reg = /\d{4}/
		  zhixuanDS(reg,4,'','')
		  break;
		case '3xq3ds':case '3xz3ds':case '3xh3ds':  case 'zxds' :
		  var reg = /\d{3}/
		  zhixuanDS(reg,3,'','')
		  break;
		case '3xq3hx' : case '3xz3hx' : case '3xh3hx' :
		  var reg = /\d{3}/
		  zuxuanHHDS(reg,3,'','')
		  break;
		case '2xq2ds' : case '2xh2ds' : case 'q2zxds' : case 'h2zxds' :
		  var reg = /\d{2}/
		  zhixuanDS(reg,2,'','')
		  break;
		case '5xzx120' :
		  zuxuan120(4)
		  break;
		case '5xzx60' :
		  zuxuanTS(60)
		  break;
		case '5xzx30' :
		  zuxuanTS(30)
		  break;
		case '5xzx20' :
		  zuxuanTS(20)
		  break;
		case '5xzx10' :
		  zuxuanTS(10)
		  break;
		case '5xzx5' :
		  zuxuanTS(5)
		  break;
		case '4xzx24' :
		  zuxuan24(3,'','')
		  break;
		case '4xzx12' :
		  zuxuanTS(12)
		  break;
		case '5x2mbdd' :case '4xzx6' : case 'q42mbdd' : case 'h42mbdd' :case 'q32mbdd' : case 'h32mbdd' : case 'z32mbdd' : case '2xq2zx' : case '2xh2zx' : case 'q2zx' : case 'h2zx' :
		  zuxuan6(1,'','')
		  break;
		case '4xzx4' :
		  zuxuanTS(4)
		  break;
		case '3xq3z3' : case '3xz3z3' : case '3xh3z3' : case 'z3fs' :
		  var reg = /\d{3}/
		  zuxuanz3z6(1,3,reg,'z3','','')
		  break;
		case '3xq3z6' : case '3xz3z6' : case '3xh3z6' : case 'z6fs' : case '5x3mbdd':
		  var reg = /\d{3}/
		  zuxuanz3z6(2,3,reg,'z6','','')
		  break;
		case '3xq3zxhz' :case '3xz3zxhz' :case '3xh3zxhz' :
		  zuxuanHZ('','')
		  break;
		case '3xq3hz' :case '3xz3hz' :case '3xh3hz' :
		  zhixuanX3HZ('','')
		  break;
		case 'q2hz' :case 'h2hz' :
		  zhixuanX2HZ('','')
		  break;
		case 'q2zxhz' : case 'h2zxhz' :
		  zuxuanX2HZ('','')
		  break;
		case '5xdwd' :case '5x1mbdd' : case 'q31mbdd' : case 'h31mbdd' : case 'z31mbdd' :case 'q41mbdd' : case 'h41mbdd' :case 'youniu' : case 'meiniu' : case 'ndxds' : case 'dwd' : case 'bdwd' :
		  calcDWD()
		  break;
		case 'r2fs':
		  zhixuanRX('2')
		  break;
		case 'r3fs':
		  zhixuanRX('3')
		  break;
		case 'r4fs':
		  zhixuanRX('4')
		  break;
		case 'r2zxhz' : 
		  zhixuanX2HZ(true,2)
		  break;
		case 'r3zxhz' :
		  zhixuanX3HZ(true,3)
		  break;
		case 'r2zuxhz' : 
		  zuxuanX2HZ(true,2)
		  break;
		case 'r3zuxhz' :
		  zuxuanX3HZ(true,3)
		  break;
		case 'r2zxfs' :
		  zuxuan6(2,true,2)
		  break;
		case 'r3zx3' :
		  var reg = /\d{3}/
		  zuxuanz3z6(1,3,reg,'z3',true,3)
		  break;
		case 'r3zx6' :
		  var reg = /\d{3}/
		  zuxuanz3z6(1,3,reg,'z6 ',true,3)
		  break;
		case 'r4zx24' :
		  zuxuan24(3,true,4)
		  break;
		case 'r4zx12' :
		  zuxuanTS(12,true,4)
		  break;
		case 'r4zx6' :
		  zuxuan6RX(2,true,4)
		  break;
		case 'r4zx4' :
		  zuxuanTS(4,true,4)
		  break;
		case 'r2ds' :
		  var reg = /\d{2}/
		  zhixuanDS(reg,2,true,2)
		  break;
		case 'r3ds' : 
		  var reg = /\d{3}/
		  zhixuanDS(reg,3,true,3)
		  break;
		case 'r4ds' :
		  var reg = /\d{4}/
		  zhixuanDS(reg,4,true,4)
		  break;
		case 'r2zxds' :
		  var reg = /\d{2}/
		  zuxuanDS(2,reg,true,2)
		  break;
		case 'r3zxhx' : 
		  var reg = /\d{3}/
		  zuxuanHHDS(reg,3,true,3)
		  break;
	}
	
}

function calc115(playName){
	bs = Number($('#test').val())
	ms = Number($('#bet-select .active').attr('data-val'))
	switch (playName){
		case 'q3fs' :  case 'z3fs' :  case 'h3fs' : 
		   zhixuan115X3()
		   break;
		case 'q2fs' :  case 'h2fs' : 
		   zhixuan115X2()
		   break;
		case 'q2zx' :  case 'h2zx' : 
		   zuxuan115X2()
		   break;
		case 'q1' : 
		   calcDWD()
		   break;
		case 'fsrx2z2' :
		   renxuan115(2)
		   break;
		case 'fsrx3z3' :
		   renxuan115(3)
		   break;
		case 'fsrx4z4' :
		   renxuan115(4)
		   break;
		case 'fsrx5z5' :
		   renxuan115(5)
		   break;
		case 'fsrx6z5' :
		   renxuan115(6)
		   break;
		case 'fsrx7z5' :
		   renxuan115(7)
		   break;
		case 'fsrx8z5' :
		   renxuan115(8)
		   break;
		case 'dwd' : case 'q3bdwd' :
		   calcDWD()
		   break;
		case 'q3ds':case 'z3ds':case 'h3ds':
				var reg = /\d{2}/;
				get_danshi(6, reg);
			break;
			case 'q2ds':case 'h2ds':case 'dsrx2z2':
				var reg = /\d{2}/;
				get_danshi(4, reg);
			break;
			case 'dsrx3z3':
				var reg = /\d{2}/;
				 get_danshi(6, reg);
			break;
			case 'dsrx4z4':
				var reg = /\d{2}/;
				get_danshi(8, reg);
			break;
			case 'dsrx5z5':
				var reg = /\d{2}/;
				get_danshi(10, reg);
			break;
			case 'dsrx6z5':
				var reg = /\d{2}/;
				get_danshi(12, reg);
			break;
			case 'dsrx7z5':
				var reg = /\d{2}/;
				get_danshi(14, reg);
			break;
			case 'dsrx8z5':
				var reg = /\d{2}/;
				get_danshi(16, reg);
			break;
	}
}

function calcPK10(playName){
	bs = Number($('#test').val())
	ms = Number($('#bet-select .active').attr('data-val'))
	switch (playName){
		case 'cgjfs' :
		   zhixuanfs()
		   break;
		case 'cgyjfs' : 
		   zhixuan115X2()
		   break;
		case 'cq3mfs' : 
		   zhixuan115X3()
		   break;
		case 'dwd15' : case 'dwd610' : case 'dxd1m' : case 'dxd2m' : case 'dxd3m' : case 'dsd1m' :case 'dsd2m' :case 'dsd3m' :
		case 'gjvsd10m' :case 'yjvsd9m' :case 'jjvsd8m' :case 'd4mvsd7m' : case 'd5mvsd6m' :
		   calcDWD()
		   break;
		case 'q2hz' :
		   PK10HZ()
		   break;
		case 'cgyjds' :
		   zhixuanDS115(2)
		   break;
		case 'cq3mds' :
		   zhixuanDS115(3)
		   break;
    }
}

function calcXY(playName){
	bs = Number($('#test').val())
	ms = Number($('#bet-select .active').attr('data-val'))
	calcDWD(true)
}


//-------------------------------------------------------------------------
//时时彩计算
//-------------------------------------------------------------------------

//直选复式
function zhixuanfs(){
	var init = 1
	$('#betMain .balls-l').each(function(i,v){
		 var num = $(this).find('.active').size()
		 init = init * num
	})
	zs = Number(init)
	calcResult()
}

//直选单式
function zhixuanDS(reg,n,isPos,posNum){
    var m = $('#textarea').val()
	var num = [];
	var arr = m.split(/[ ,;\r\n]/);
	var json = {}
	$(arr).each(function(i) {
		if(arr[i].length == n && reg.test(arr[i]) && !json[arr[i]]) {
			num.push(arr[i])
			json[arr[i]] = 1;
		}
	});
	var result = num

	$('#textarea').val(result)
	var init = result.length
	zs = Number(init)
	
	if(isPos == true) {
		var nums = $('#pos span.active').size()
		if(nums >= posNum) {
			if(posNum == 2) {
				var d = nums * (nums - 1) / 2
				zs = Number(init * d)
			}
			if(posNum == 3) {
				var d = nums * (nums - 1) * (nums - 2) / 6
				zs = Number(init * d)
			}
			if(posNum == 4) {
				if(nums == posNum){
					zs = Number(init * 1)
				}else if(nums > posNum) {
					zs = Number(init * 5)
				}
			}
			calcResult()

		}else{
			zs = 0
		    calcResult()
		}
	} else {
		calcResult()
	}
}

//直选单式
function zhixuanDSPL(reg,n,isPos,posNum){
	console.log(n)
    var m = $('#textarea').val()
	var num = [];
	var arr = m.split(/[ ,;\r\n]/);
	var json = {}
	$(arr).each(function(i) {
		if(arr[i].length == n && reg.test(arr[i])) {
			num.push(arr[i])
		}
	});
	var result = num

	$('#textarea').val(result)
	var init = result.length
	zs = Number(init)
    calcResult()
}


//组选单式
function zuxuanDS(n,reg,isPos,posNum) {
	var regs = /^(?!\d*?(\d)\d*?\1)\d{1,10}$/
	var m = $('#textarea').val()
	var num = [];
	var arr = m.split(/[ ,;\r\n]/);
	var json = {}
	$(arr).each(function(index, ele) {
		if(ele.length == n && reg.test(arr[index])) {
			var first = "";
			var second = "";
			var i = 0;
			for(i = 0; i < n; i++) {
				if(i == 0) {
					first = arr[index].substr(i, 1)
				}
				if(i == 1) {
					second = arr[index].substr(i, 1)
				}
			}
			if(first == second) {
				return false
			} else {
				num.push(first + second)
			}
		}
	})
	$('#textarea').val(num)
	var init = num.length
	if(isPos == true) {
		var nums = $('#pos span.active').size()
		if(nums >= posNum) {
			if(posNum == 2) {
				var d = nums * (nums - 1) / 2
				zs = Number(init * d)
				 calcResult()
			}
		} else {
			zs = 0
		    calcResult()
		}
	} else {
		zs = Number(init)
		calcResult()
	}
}

function zuxuanHHDS(reg,n,isPos,posNum) {
	var m = $('#textarea').val()
	var num = [];
	var arr = m.split(/[ ,;\r\n]/);
	$(arr).each(function(index, ele) {
		if(ele.length == 3) {
			var first = "";
			var second = "";
			var third = "";
			var i = 0;
			for(i = 0; i < n; i++) {
				if(i == 0) {
					first = arr[index].substr(i, 1)
				}
				if(i == 1) {
					second = arr[index].substr(i, 1)
				}
				if(i == 2) {
					third = arr[index].substr(i, 1)
				}
			}
			if(first == second && second == third && first == third) {
				return false
			} else {
				num.push(first + second + third)
			}
		}
	});
	var json = {}
	var tem = [];
	$(num).each(function(i) {
		if(!json[num[i]]) {
			tem.push(num[i])
			json[num[i]] = 1;
		}
	});
	$('#textarea').val(tem)

	var init = tem.length

	if(isPos == true) {
		var nums = $('#pos span.active').size()
		if(nums >= posNum) {
			if(posNum == 3) {
				var d = nums * (nums - 1) * (nums - 2) / 6
				zs = Number(init * d)
				calcResult()
			}
		} else {
			zs = 0
		    calcResult()
		}
	} else {
		zs = Number(init)
        calcResult()
	}
}


//组选120
function zuxuan120(t){
    var init = $('#betMain .balls-l .active').size()
	if(init > t) {
		var cc = {
			5: 1,
			6: 6,
			7: 21,
			8: 56,
			9: 126,
			10: 252
		};
		$.each(cc, function(i, v) {
			if(init == i) {
				zs = Number(v)
				calcResult()
			}
		})
	}else{
		zs = 0
		calcResult()
	}
}

function zuxuan24(t,isPos,posNum) {
	var init = $('#betMain .balls-l .active').size()
	if(init > t) {
		var cc = {
			4: 1,
			5: 5,
			6: 15,
			7: 35,
			8: 70,
			9: 126,
			10: 210
		};
		$.each(cc, function(i, v) {
			if(init == i) {
				if(isPos == true) {
					var nums = $('#pos span.active').size()
					if(nums >= posNum) {
						if(posNum == 4) {
							if(nums == posNum){
								zs = Number(v * 1)

							}
							if(nums > posNum){
							    zs = Number(v * 5)
							}
							calcResult()
						}
					}else{
				       zs = 0
		               calcResult()

					}
				} else {
					zs = Number(v)
		            calcResult()

				}
			}
		})
	} else {
		zs = 0
		calcResult()
	}
}

function zuxuan6(t,isPos,posNum) {
	var init = $('#betMain .balls-l .active').size()
	if(init > t) {
		var cc = {
			2: 1,
			3: 3,
			4: 6,
			5: 10,
			6: 15,
			7: 21,
			8: 28,
			9: 36,
			10: 45
		};
		$.each(cc, function(i, v) {
			if(init == i) {
				if(isPos == true) {
					var nums = $('#pos span.active').size()
					if(nums >= posNum) {
						if(nums == 2){
                             zs = Number(v * 1)
						}
						if(nums == 3){
                             zs = Number(v * 3)
						}
						if(nums == 4){
                             zs = Number(v * 6)
						}
						if(nums == 5){
                             zs = Number(v * 10)
						}
						calcResult()
					}else{
						zs = 0
		               calcResult()
					}
				} else {
					zs = Number(v)
		            calcResult()
				}
			}
		})
	} else {
		zs = 0
		calcResult()
	}
}

function zuxuan6RX(t,isPos,posNum) {
	var init = $('#betMain .balls-l .active').size()
	if(init > t) {
		var cc = {
			2: 1,
			3: 3,
			4: 6,
			5: 10,
			6: 15,
			7: 21,
			8: 28,
			9: 36,
			10: 45
		};
		$.each(cc, function(i, v) {
			if(init == i) {
				if(isPos == true) {
					var nums = $('#pos span.active').size()
					if(nums >= posNum) {
						if(nums == 4){
                             zs = Number(v * 1)
						}
						if(nums == 5){
                             zs = Number(v * 5)
						}
						calcResult()
					}else{
						zs = 0
		               calcResult()
					}
				} else {
					zs = Number(v)
		            calcResult()
				}
			}
		})
	} else {
		zs = 0
		calcResult()
	}
}

function zuxuanz3z6(t,n,reg,type,isPos,posNum) {
	var init = $('#betMain .balls-l .active').size()
	if(init > t) {
		var result 
		if(type == 'z3'){
			result = init * (init - 1)
		}else{
            result = init * (init - 1) * (init - 2) / 6
		}
		if(isPos == true) {
			var num = $('#pos span.active').size()
			if(num >= posNum) {
				if(posNum == 3) {
					var d = num * (num - 1) * (num - 2) / 6
					zs = Number(result * d)
					calcResult()
				}
			} else{
				zs = 0
		        calcResult()
			}
		} else {
			zs = Number(result)
		    calcResult()
		}

	} else {
		zs = 0
		calcResult()
	}
}

//时时彩组选60、组选30、组选20、组选10、组选5、组选12、组选4
function zuxuanTS(n,isPos,posNum) {
	var arr1 = ''
	var arr2 = ''

	$('#betMain .balls-l').each(function(i) {
		if(i == 0){
			arr1 += $(this).find('.active').text()
		}else{
			arr2 += $(this).find('.active').text()
		}
	})

	str = arr1 + "," + arr2;
	if(isPos == true){
		var nums = $('#pos span.active').size()
		if(nums >= posNum) {
			if(posNum == 4) {
				if(nums == posNum){
					zs = Number(GetDXZXSelZhuShu(str, n))
					console.log(zs)
					calcResult()
				}
				if(nums > posNum){
					zs = Number(GetDXZXSelZhuShu(str, n))*5
					calcResult()
				}
			}
		} else{
			zs = 0
		    calcResult()
		}
	}else{
	   zs = Number(GetDXZXSelZhuShu(str, n))
	   calcResult()	
	}
}

function zuxuanHZ(isPos,posNum) {
	var arr = []
	var init = 0;
	var cc = {
		1: 1,
		2: 2,
		3: 2,
		4: 4,
		5: 5,
		6: 6,
		7: 8,
		8: 10,
		9: 11,
		10: 13,
		11: 14,
		12: 14,
		13: 15,
		14: 15,
		15: 14,
		16: 14,
		17: 13,
		18: 11,
		19: 10,
		20: 8,
		21: 6,
		22: 5,
		23: 4,
		24: 2,
		25: 2,
		26: 1
	}
	$.each($('#betMain .balls-l .active'), function(i, v) {
		var d = $(this).text()
		$.each(cc, function(k, n) {
			if(d == k) {
				init += n
			}
		})
	})

	if(isPos == true) {
		var nums = $('#pos span.active').size()
		if(nums >= posNum) {
			if(posNum == 3) {
				var d = nums * (nums - 1) * (nums - 2) / 6
				zs = Number(init * d)
				calcResult()
			}
		} else{
			zs = 0
		    calcResult()
		}
	} else {
		zs = Number(init)
		calcResult()
	}
}

function zhixuanX3HZ(isPos,posNum) {
	var lotCode = '';
	$.each($('#betMain .balls-l .active'), function() {
		lotCode += $(this).text() + ','
	})
	var result = 0;
	var hmStr = "";
	var hzVal = "";
	for(k = 0; k <= 9; k++) {
		for(l = 0; l <= 9; l++) {
			for(m = 0; m <= 9; m++) {
				var hz = k + l + m;
				if(lotCode.indexOf(',') >= 0) {
					var lotCodeArray = lotCode.split(",");
					for(t = 0; t < lotCodeArray.length; t++) {
						if(lotCodeArray[t] == hz) {
							result++;
						}
					}
				} else {
					if(lotCode == hz) {
						result++;
					}
				}
			}
		}
	}
	var res = result - 1
	if(isPos == true) {
		var num = $('#pos span.active').size()
		if(num >= posNum) {
			if(posNum == 3) {
				var d = num * (num - 1) * (num - 2) / 6
				zs = Number(res * d)
				calcResult()
			}
		}else{
			zs = 0
		    calcResult()
		}

	} else {
		zs = Number(res)
		calcResult()
	}
}

function zhixuanX2HZ(isPos,posNum){
	var lotCode = '';
	$.each($('#betMain .balls-l .active'), function() {
		lotCode += $(this).text() + ','
	})
	var result = 0;
	var hmStr = "";
	var hzVal = "";
	for(k = 0; k <= 9; k++) {
		for(l = 0; l <= 9; l++) {
			var hz = k + l
			if(lotCode.indexOf(',') >= 0) {
				var lotCodeArray = lotCode.split(",");
				for(t = 0; t < lotCodeArray.length; t++) {
					if(lotCodeArray[t] == hz) {
						result++;
					}
				}
			} else {
				if(lotCode == hz) {
					result++;
				}
			}
		}
	}
	var res = result - 1
	if(isPos == true) {
		var num = $('#pos span.active').size()
		if(num >= posNum) {
			if(posNum == 2) {
				var d = num * (num - 1) / 2
				zs = Number(res * d)
				calcResult()
			}
		}else{
			zs = 0
		    calcResult()
		}

	} else {
		zs = Number(res)
		calcResult()
	}
}

function zuxuanX2HZ(isPos,posNum) {
	var arr = []
	var init = 0;
	var cc = {
		1: 1,
		2: 1,
		3: 2,
		4: 2,
		5: 3,
		6: 3,
		7: 4,
		8: 4,
		9: 5,
		10: 4,
		11: 4,
		12: 3,
		13: 3,
		14: 2,
		15: 2,
		16: 1,
		17: 1
	}
	$.each($('#betMain .balls-l .active'), function(i, v) {
		var d = $(this).text()
		$.each(cc, function(k, n) {
			if(d == k) {
				init += n
			}
		})
	})

	if(isPos == true) {
		var num = $('#pos span.active').size()
		if(num >= posNum) {
			if(posNum == 2) {
				var d = num * (num - 1) / 2
				zs = Number(init * d)
				calcResult()
			}
		}else{
			zs = 0
		    calcResult()
		}
	} else {
		zs = Number(init)
		calcResult()
	}
}

function zuxuanX3HZ(isPos,posNum) {
	var arr = []
	var init = 0;
	var cc = {
		1: 1,
		2: 2,
		3: 2,
		4: 4,
		5: 5,
		6: 6,
		7: 8,
		8: 10,
		9: 11,
		10: 13,
		11: 14,
		12: 14,
		13: 15,
		14: 15,
		15: 14,
		16: 14,
		17: 13,
		18: 11,
		19: 10,
		20: 8,
		21: 6,
		22: 5,
		23: 4,
		24: 2,
		25: 2,
		26: 1
	}
	$.each($('#betMain .balls-l .active'), function(i, v) {
		var d = $(this).text()
		$.each(cc, function(k, n) {
			if(d == k) {
				init += n
			}
		})
	})

	if(isPos == true) {
		var nums = $('#pos span.active').size()
		if(nums >= posNum) {
			if(posNum == 3) {
				var d = nums * (nums - 1) * (nums - 2) / 6
				zs = Number(init * d)
				calcResult()
			}
		}else{
			zs = 0
		    calcResult()
		}
	} else {
		zs = Number(init)
		calcResult()
	}
}

function calcDWD(sta){
	var init
	if(sta == true){
	   init = $('#lucky .active').size()
	}else{
	   init = $('#betMain .balls-l .active').size()	
	}
	console.log(init)
	zs = Number(init)
	calcResult()
}

function zuxuanRX(n,isPos,posNum) {
	var m = []
	$.each($('.balls-bar'), function(i) {
		var num = $(this).find('.balls-l .active').size()
		if(num != 0) {
			m.push(num)
		}
	})
	if(m.length >= n) {
		var result = 1
		for(var i = 0; i < m.length; i++) {
			result = m[i] * result
		}

		if(isPos == true) {
			var nums = $('#pos span.active').size()
			if(nums >= posNum) {
				if(posNum == 2) {
					var d = nums * (nums - 1) / 2
					zs = Number(result * d)
				}
				if(posNum == 3) {
					var d = nums * (nums - 1) * (nums - 2) / 6
					zs = Number(result * d)
				}
				if(posNumn == 4) {
					if(nums == n){
                        zs = Number(result * 1)
					}
					if(nums > n){
                        zs = Number(result * 5)
			        }
				}
				calcResult()

			}else{
				zs = 0
		        calcResult()
			}
		} else {
			zs = Number(result)
	        calcResult()
		}

	}
}

function zhixuanRX(type) {
	var arr1 = []
	var arr2 = []
	var arr3 = []
	var arr4 = []
	var arr5 = []
    $('#betMain .balls-bar').each(function(i,v) {
    	$.each($(this).find('.balls-l .active'),function(){
            var text = $(this).text()
			if(i == 0){
	           arr1.push(text)
			}
			if(i == 1){
	           arr2.push(text)
			}
			if(i == 2){
	           arr3.push(text)
			}
			if(i == 3){
	           arr4.push(text)
			}
			if(i == 4){
	           arr5.push(text)
			}
    	})
	})
    var wan = arr1.length;
    var qian = arr2.length;
    var bai = arr3.length;
    var shi = arr4.length;
    var ge = arr5.length;
    var  nums;
    if(type == '2'){
        nums = wan * qian + wan * bai + wan * shi + wan * ge + qian * bai + qian * shi + qian * ge + bai * shi + bai * ge + shi * ge;
    }
    if(type == '3'){
        nums = wan*qian*bai+wan*qian*shi+wan*qian*ge+wan*bai*shi+wan*bai*ge+wan*shi*ge+qian*bai*shi+qian*bai*ge+qian*shi*ge+bai*shi*ge;
    } 
    if(type == '4'){
       nums = wan*qian*bai*shi+wan*qian*bai*ge+wan*bai*shi*ge+wan*qian*shi*ge+qian*bai*shi*ge
    }
    zs = Number(nums)	
    calcResult()
}


//-------------------------------------------------------------------------
//时时彩组选计算 ---组选60、组选30、组选20、组选10、组选5、组选12、组选4
//-------------------------------------------------------------------------
function GetDXZXSelZhuShu(lotCode, typeIndex) {
	var selZhus;
	if(typeIndex == 60 || typeIndex == 30 || typeIndex == 20 || typeIndex == 10 || typeIndex == 5 || typeIndex == 12 || typeIndex == 4) {
		var lotArray = lotCode.split(",");
		var chCode = lotArray[0];
		var bchCode = lotArray[1];
		var chLen = chCode.length;
		var bchLen = bchCode.length;

		var bchRCode = "";
		var chRCode = "";
		var doubleRCode = "";
		for(l = 0; l <= 9; l++) {
			var s = l + "";
			if(typeIndex != 30) {
				if(chCode.indexOf(s) >= 0 && bchCode.indexOf(s) < 0) {
					chRCode += s;
				}

				if(bchCode.indexOf(s) >= 0) {
					bchRCode += s;
				}

				if(chCode.indexOf(s) >= 0 && bchCode.indexOf(s) >= 0) {
					doubleRCode += s;
				}
			} else {
				if(chCode.indexOf(s) >= 0) {
					chRCode += s;
				}

				if(bchCode.indexOf(s) >= 0 && chCode.indexOf(s) < 0) {
					bchRCode += s;
				}

				if(chCode.indexOf(s) >= 0 && bchCode.indexOf(s) >= 0) {
					doubleRCode += s;
				}
			}
		}

		var a = chRCode.length;
		var b = bchRCode.length;
		var c = doubleRCode.length;

		if(typeIndex == 60) {
			selZhus = GetDXZXZhuShuCaulate(a, b, c, 1, 3);
		}
		if(typeIndex == 30) {
			selZhus = GetDXZXZhuShuCaulate(b, a, c, 1, 2);
		}
		if(typeIndex == 20) {
			selZhus = GetDXZXZhuShuCaulate(a, b, c, 1, 2);
		}
		if(typeIndex == 10) {
			selZhus = GetDXZXZhuShuCaulate(a, b, c, 1, 1);
		}
		if(typeIndex == 5) {
			selZhus = GetDXZXZhuShuCaulate(a, b, c, 1, 1);
		}
		if(typeIndex == 12) {
			selZhus = GetDXZXZhuShuCaulate(a, b, c, 1, 2);
		}
		if(typeIndex == 4) {
			selZhus = GetDXZXZhuShuCaulate(a, b, c, 1, 1);
		}
	}
	return selZhus;
}

function GetPLZH(a, m) {
	var cval = 0;
	var fm = 1;
	var fz = 1;
	for(j = 1; j <= m; j++) {
		fm = fm * (a - j + 1);
		fz = fz * j;
	}
	cval = fm / fz;
	return cval;
}

function GetDXZXZhuShuCaulate(a, b, c, m, n) {
	var init = 0;
	init = GetPLZH(a, m) * GetPLZH(b, n) + c * GetPLZH(b - 1, n);
	return init
}

//-------------------------------------------------------------------------
//11选5计算
//-------------------------------------------------------------------------

function zhixuan115X3(){
	var arr1 = []
	var arr2 = []
	var arr3 = []

	$('#betMain .balls-bar').each(function(i,v) {
    	$.each($(this).find('.balls-l .active'),function(){
            var text = $(this).text()
			if(i == 0){
	           arr1.push(text)
			}
			if(i == 1){
	           arr2.push(text)
			}
			if(i == 2){
	           arr3.push(text)
			}
    	})
	})

	var tem = [];

	for(var i = 0; i < arr1.length; i++) {
		for(var j = 0; j < arr2.length; j++) {
			for(var k = 0; k < arr3.length; k++) {
			   if(arr1[i] != arr2[j] && arr1[i] != arr3[k] && arr2[j] != arr3[k]) {
				  var str = arr1[i] + arr2[j] + arr3[k]
				  tem.push(str)
			   }
			}
		}
	}
	zs = Number(tem.length)
	calcResult()
}

function zhixuan115X2(){
	var arr1 = []
	var arr2 = []

	$('#betMain .balls-bar').each(function(i,v) {
    	$.each($(this).find('.balls-l .active'),function(){
            var text = $(this).text()
			if(i == 0){
	           arr1.push(text)
			}
			if(i == 1){
	           arr2.push(text)
			}
    	})
	})

	var tem = [];

	for(var i = 0; i < arr1.length; i++) {
		for(var j = 0; j < arr2.length; j++) {
            if(arr1[i] != arr2[j]) {
				var str = arr1[i] + arr2[j]
				tem.push(str)
			}
		}
	}
	zs = Number(tem.length)
	calcResult()
}

function zuxuan115X2(){
	var init = $('#betMain .balls-l .active').size()
		var cc = {
			0 : 0,
			1 : 0,
			2 : 1,
			3 : 3,
			4 : 6,
			5 : 10,
			6 : 15,
			7 : 21,
			8 : 28,
			9 : 36,
			10: 45,
			11: 55
		};
		$.each(cc, function(i, v) {
			if(init == i) {
				zs = Number(v)
				calcResult()
			}
		})
}

function zhixuanDS115(n) {
	var newString = $('#textarea').val()
	var hmItemsStr = ''
	var itemLength = 0;
	newString = newString.replace("'", "@");
	newString = newString.replace(",", "@");
	newString = newString.replace("\n", "@");
	newString = newString.replace("\r", "@");
	newString = newString.replace("\t", "@");
	var str = newString.replace("@@", "@");
	str = str.replace(";", "@");
	var arr = str.split("@");
	$.each(arr, function(i, v) {
		v = v.replace("%20", " ");
		v = v.trim();
		var hmArry = v.split(" ");
		if(v.length > 1 && hmArry.length == n) {
			var hmCode = v;
			var isValed = hmCodeValSXY5(hmCode, n);
			if(isValed == true) {
				itemLength++;
				hmItemsStr += v + ";";
			}
		}
	})
	hmItemsStr = hmItemsStr.substring(0, hmItemsStr.length - 1)
	var arr = hmItemsStr.split(";")
	var json = {}
	var num = []
	$(arr).each(function(i) {
		if(!json[arr[i]]) {
			num.push(arr[i])
			json[arr[i]] = 1;
		}
	});
	var result = num

	$('#textarea').val(result)
	if(result == '') {
		zs = 0
	} else {
		zs = Number(result.length)
	}
	calcResult()
}

function renxuan115(num){
	var m = $('#betMain .balls-l .active').size()
	var result = 1
	if(m < num) {
		zs = 0
	} else {
		var f = fact(m - num)
		var s = fact(m)
		var t = fact(num) * f
		var result = s / t
		zs = Number(result)
	}
    calcResult()
}

function fact(num) {
	if(num <= 1) {
		return 1;
	} else {
		return num * arguments.callee(num - 1);
	}
}

function hmCodeValSXY5(hmCode, fdNum) {
	var hmArr = hmCode.split(" ");
	var hmStr = "";
	if(hmArr.length !== fdNum) {
		return false;
	} else {
		for(i = 0; i < hmArr.length; i++) {
			if(hmArr[i] != "01" && hmArr[i] != "02" && hmArr[i] != "03" && hmArr[i] != "04" && hmArr[i] != "05" && hmArr[i] != "06" && hmArr[i] != "07" && hmArr[i] != "08" && hmArr[i] != "09" && hmArr[i] != "10" && hmArr[i] != "11") {
				return false;
			} else {
				if(hmStr.indexOf(hmArr[i]) >= 0) {
					return false;
				} else {
					hmStr += hmArr[i] + "|";

				}
			}
		}
		return true;
	}
}

function get_danshi(length, reg) {
	   var txt = $('#textarea').val()
	   var arr = [];
	   var res = 0;
	   var returns = [];
	   var length1 = 0;
	   rhaoma = [];
	   var  arr = arr1 = arr2 = arr3 = arr4 = [];
	   arr = txt.split(/[,\r\n]/);
	   $(arr).each(function(i) {
			var arr3 = arr[i].split(" ");
			arr3.sort();
			arr4.push(arr3.join(' '));
	  });
	  //var arr = delect_chong(arr4);
	  
	  console.log(arr4)
	
	  $(arr).each(function(i) {
		arr4 = arr[i].split(" ");
		$(arr4).each(function(j){
				if (arr4.length == length/2) {
					
					if(reg.test(arr4[j]) && arr4[j]!=00 && arr4[j]<=11 && arr4[j].length==2){
						length1 = length1 + 1;
					}
				
					if(length1 == length/2 && j+1==length/2){
						 res=res+1;
						 
						 rhaoma.push(arr[i]);
						 length1=0;
					}
					
					if(j+1 == length/2 && length1!=length/2){
						 length1=0;
					}
					
				}
			
			});
		
		
		});
	   returns.push(res)
	   arr_115_rx = arr
	   zs = Number(returns)
	   calcResult()
}

//去除重复号
function delect_chong(arr){
	   var new_arr=[];
	   var json = {};
	  for(var i = 0; i < arr.length; i++){
		  arr2 = arr[i].split(" ");
		  for(var v=0;v < arr2.length;v++){
			for(var k=v+1;k<arr2.length;k++){
				if(arr2[v] === arr2[k]){
					arr.remove(i);
				}
			}
		  }
		  if(!json[arr[i]]){ 
		   new_arr.push(arr[i]);
		   json[arr[i]] = 1;
		  }
	 }
}

function PK10HZ() {
	var num = 0
	var cc = {
		0: 0,
		1: 0,
		2: 0,
		3: 2,
		4: 2,
		5: 4,
		6: 4,
		7: 6,
		8: 6,
		9: 8,
		10: 8,
		11: 10,
		12: 8,
		13: 8,
		14: 6,
		15: 6,
		16: 4,
		17: 4,
		18: 2,
		19: 2
	};
	$.each($('#betMain .balls-l .active'), function(index) {
		var a = $(this).text()
		$.each(cc, function(i, v) {
			if(i == a) {
				num += v
			}
		});
	})
	zs = Number(num)
	calcResult()
}


function calcResult(){
	var je = Number(bs) * Number(ms) * Number(zs) * Number(window.localStorage['price'])
	$('#zs').text(zs)
	$('#je').text(Number(je).toFixed(3))
}