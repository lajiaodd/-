'use strict'
var ww  = 750;
var bli = window.innerWidth/750;
var bli2= 750/window.innerWidth;
var wh  = window.innerHeight/bli;
var liuhai = (window.innerHeight/window.innerWidth)>1.9?90:0;
//p('wh');
//p(wh);
function p(s) {
	//if(window.navigator.platform == 'devtools'){
		console.log(s);
	//}
}
function post(q) {
    let sUrl = G.serUrl;
    if (G.local && window.navigator.platform == 'devtools') {
        sUrl = G.localUrl;
    }
    //wx.showLoading({title:'加载中...'})
	let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {};
    if (undefined===q){
        q = {};
    }    
	q['phpsessid'] = gc("phpsessid");
	wx.request({
		url: sUrl, data: q, method: "POST", header:{"content-type": "application/x-www-form-urlencoded" },
		success: function (a) {
            //wx.hideLoading();
			if (a.statusCode == 200) {
				n(a.data);
				if (a.data.phpsessid != undefined) {
					sc("phpsessid", a.data.phpsessid);
				}
			} else {
				p('request error url:' + sUrl + ' code:' + a.statusCode) 
			}
		},
		fail: function (e){wx.hideLoading();p('request error' + e);}
	})
}
function rand(n1, n2) {
	return Math.floor(Math.random() * (n2 - n1) + n1)
}
function now(n) {  //当前秒数
	if (undefined === n || n <= 0) {
		var d = new Date;
	} else {
		var d = new Date(n * 1000);
	}
	return Math.ceil(d.getTime() / 1000);
}
function now_m(n) {  //当前微秒
	if (undefined === n || n <= 0) {
		var d = new Date;
	} else {
		var d = new Date(n * 1000);
	}
	return d.getTime();
}
function date(s, n) {
	if (undefined === n || s <= 0) {
		const date = new Date;
	} else {
		const date = new Date(n * 1000);
	}
	var str = '';
	if (undefined === s || s == '') {
		str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
			+ ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	} else {
		str = s.replace(/Y/, date.getFullYear());
		str = str.replace(/m/, date.getMonth() + 1);
		str = str.replace(/d/, date.getDate());
		str = str.replace(/H/, date.getHours());
		str = str.replace(/i/, date.getMinutes());
		str = str.replace(/s/, date.getSeconds());
	}
	str = str.replace(/([^\d])([\d])([^\d])/g, '$10$2$3');
	str = str.replace(/([^\d])([\d])([^\d])/g, '$10$2$3');
	str = str.replace(/([^\d])([\d])([^\d])/g, '$10$2$3');
	str = str.replace(/([^\d])([\d])$/g, '$10$2');
	return str;
}
function inQ(x, y, q, sz) {  //sz 边框收展数值
	if (undefined == sz || null == sz) { sz = 0; }//扩展区
	if (undefined != q.r) {//半径
		q.r += sz;
		return Math.abs(q.x - x) <= q.r && Math.abs(q.y - y) <= q.r;
	} else {
		return (x >= q.x - sz && y >= q.y - sz && x <= q.x + q.width + sz && y <= q.y + q.height + sz)
	}
}
function jgT(n) {
	nj = now() - n;
	if (nj > 86400) {
		n = date('m-d H:i', n);
	} else if (nj > 3600) {
		n = Math.floor(nj / 3600) + '小时前';
	} else if (nj > 60) {
		n = Math.floor(nj % 3600 / 60) + '分钟前';
	} else {
		n = nj + '秒前'; 
	}
	return n;
}
function gc(k, n) {
	if (undefined === wx.getStorageSync(k)) {
		if (undefined !== n) {
			return n;
		} else {
			return '';
		}
	}
	return wx.getStorageSync(k);
}
function sc(k, v) {
	wx.setStorageSync(k, v);
}
function alt(t){
    if (undefined===t){
        wx.hideToast();
    }else {    
	    wx.showToast({ title: t,icon:'none'})
    }
}
function vFloat(src,pos,n){
	if (n ==1){	//分秒
		src  = (now_m()-src)/1000;
		let src2 = 0;
		let src3 = 0;
		if (src>3600){
			src2 = parseInt(src/3600);
		}
		if (src%3600>60){
			src3 = parseInt(src%3600/60);
		}
		return (src2>0?src2+'小时':'')+(src3>0?src3+'分':'')+vFloat(src%60,1,0);   
	}else {	
		return (Math.round(src*Math.pow(10, pos))/Math.pow(10, pos)).toFixed(1);   
	}
}
function alert(s,t,cancel,f,that){
    if (undefined===s){
        wx.hideToast();
    }else {
        wx.showModal({
            title: undefined==t?'提示框':t,
            content: s,
            showCancel:undefined==cancel?false:cancel,
            success: function (re) {
                if (re['confirm']){ //确认
                    if (undefined!==f){
                        f(that);
                    }
                }else { //取消
                    //
                }
            }
        });
    }
}
function loading(t){
    wx.showLoading({title:t});
}
function mGS(n,z){
    //K M G T
    let dw = '';
    if (undefined===z){    
        let nn = n +'';
        let am = {'T':[19,1000000000000], 'G':[16,1000000000], 'M':[13,1000000], 'K':[10,1000]};
        let m  = 10;
        
        for (var k in am){
            if (nn.length>=am[k][0]){
                dw = k;
                n = parseFloat(n/am[k][1]).toFixed(0);
                break;
            }
        }
    }
    n = parseFloat(n);
    n = n.toLocaleString();
    return n+dw;
}
function data_r(n){ //时间格式
    if (n>60){
        let f = parseInt(n/60);
        let m = (n%60);
        return (f<10?'0'+f:f)+':'+(m<10?'0'+m:m);
    }else {
        return '00:'+(n<10?'0'+n:n);
    }
}
export{p,rand,post,now,sc,gc,jgT,inQ,date,now_m,ww,wh,bli,liuhai,vFloat,alert,alt,loading,bli2,mGS,data_r}