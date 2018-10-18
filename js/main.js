'use strict'
import Xg from './ex/xg'
import Dom from './inc/dom';
import Music from './inc/music'
import {p,rand,now,post,inQ,ww,wh} from './inc/func'
import Touch from './inc/touch'
import Index from './page/index'
import Play from './page/play'
import Comm from './page/comm'

window.ctx = canvas.getContext('2d');
window.clip = false;
var width = canvas.width, height = canvas.height;
if (window.devicePixelRatio) { 
    canvas.style.width = width + "px";
    canvas.style.height = height + "px"; 
    canvas.height = height * window.devicePixelRatio;
    canvas.width = width * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

ctx.fillStyle = '#7B459D';
ctx.fillRect(0, 0, canvas.width, canvas.height);

window.imgLoad = {};	//初始图片容器 


window.getImgLoad = function(img){
	let n = 0;
	for (var i in imgLoad){
		n += 1;
	}
	if (undefined===imgLoad[img]){
		imgLoad[img]     = new Image();
		imgLoad[img].src = img;	
	}
	return imgLoad[img];
}



window.touchHandler = {};
window.touchMVHandler = {};
window.touchEDHandler = {};
window.hasEventBind = false;


export default class Main {
    constructor() {
        let that = this;
        
		this.mwidth = 750;	  //默认宽度
		this.bli    = this.mwidth / 1000;	//比例，用于界面设计
		this.syin   = true;	  //声音开关
		this.onShow = false;  //是否取了onShow的数据

        this.local    = false;
        this.serUrl   = '';
        this.localUrl = '';

		this.dombg  = {};	  //背景元素
        this.dom    = {};	  //页面元素
        this.currPage = 'index';

		this.liuhai = (window.innerHeight/window.innerWidth)>1.9?90*this.bli:0;	//是否有流海
        this.ww = window.innerWidth;
        this.wh = window.innerHeight;

		this.adOK = (window.innerHeight/window.innerWidth)<1.65?false:true;
		this.adID = '';

		this.openD  = wx.getOpenDataContext();	
		this.shVas = this.openD.canvas;
		this.shVas.width = 2*this.shVas.width;
		this.shVas.height = 2*this.shVas.height;

		this.us     = {};
        this.config = { CY_fxTxt: ['超好玩的益智小游戏，不用下载即可畅玩'], CY_fxImg: 'img/1.jpg', CY_fxCS: '' };
		this.scene		= 0;	//进入的ID
		this.fid        = 0;	//来路朋友ID
		this.adHeight	= 0;	//广告的高度
        this.aniId		= 0;	//当前帖ID
		this.stop       = false;
		this.imgDir     = 'img/';
        
        this.moveDom;	//当前移动的元素
        this.clickDom;	//当前点击的元素
        this.clickPos = { x: 0, y: 0 ,d:{},kz:{}}	//点击的点位置

		this.bStartBtn = true;	//是否显示此按扭
        this.buildStartBtn();	//生成系统获取信息按扭

		this.comm      = new Comm();
        this.oVar();
        //this.goPage();	
    }

    oVar(){ //游戏独有变量 (0,1 宽高, 2格内偏差,3速度,4一圈赚币)
        /*this.c  = {1:[[60,141],[77,91],15,6.25, 25], 2:[[60, 140],[100,82],10,5.96, 50], 
                    3:[[58,140],[100,68],10, 5.68, 100], 4:[[69, 122],[94, 75],5, 5.4, 200], 
                    5:[[72, 139],[97, 84],5, 5.11, 400], 6:[[70, 144],[98, 85],3, 4.83, 800], 
                    7:[[74, 133],[108, 85],4, 4.55, 1600], 8:[[76, 139],[115,99],5, 4.26, 3200], 
                    9:[[79,146],[110,92],5, 3.98, 6400], 10:[[81,146],[110,95],5, 3.7, 12800],
                    11:[[83,160],[93,88],5, 3.52, 25600], 12:[[82, 164],[110,97],5, 3.35, 51200], 
                    13:[[83, 173],[122,111],0, 3.17, 102400], 14:[[83,176],[113,105],0, 3, 204800]}*/

        this.c  = {1:[[60,141],[77,91],15, 1.75, 25], 2:[[60, 140],[100,82],10, 2, 50], 
                    3:[[58,140],[100,68],10, 2.25, 100], 4:[[69, 122],[94, 75],5, 2.5, 200], 
                    5:[[72, 139],[97, 84],5, 2.75, 400], 6:[[70, 144],[98, 85],3, 3, 800], 
                    7:[[74, 133],[108, 85],4, 3.25, 1600], 8:[[76, 139],[115,99],5, 3.5, 3200], 
                    9:[[79,146],[110,92],5, 3.75, 6400], 10:[[81,146],[110,95],5, 4, 12800],
                    11:[[83,160],[93,88],5, 4.25, 25600], 12:[[82, 164],[110,97],5, 4.5, 51200],
                    13:[[83, 173],[122,111],0, 4.75, 102400], 14:[[83,176],[113,105],0, 5, 204800]}

        this.sdBli = 13.4;  //速度为2

        this.mc_cs = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0}    //买次数
        this.c_cm  = {1:100,2:1500,3:6750,4:17955,5:47760,6:127042,7:337931,8:898896,9:2391062,10:6360225,11:16918199,12:45002410,13:119706411,14:318419054} //初始价
        this.c_m   = {1:100,2:1500,3:6750,4:17955,5:47760,6:127042,7:337931,8:898896,9:2391062,10:6360225,11:16918199,12:45002410,13:119706411,14:318419054}
        
        this.cw_z   = 15;     //总船位
        this.pd_max = 12;   //跑道最多可达多少船
        this.js_zs  = 2;    //加速一次消耗钻石

        this.xslb = 1;   //是否已领新手礼包
        this.newer= 0;   //是否第一次进入，显示新手礼包
        this.zsi  = 0;   //钻石 
        this.money= 0;   //初始2000金币

        this.js_c = {1:1,2:1,3:1};      //当前解锁船级别
        this.js_w = 6;      //船位
        
        this.pd_w = 6;      //跑道位
        this.mm_sy  = 0     //每秒收益


        /************加速参数***********/
        
        this.js_cs  = 0;    //可直接加速次数
        this.beiShu = 1;    //速度倍数

        this.js_true = false;    //加速中？
        this.js_time = 0;        //加速开始时间
        this.js_miao = 300;      //加速一次多少秒 300

        this.js_lq_true = false; //冷却中？
        this.js_lq_time = 0;     //冷却开始时间
        this.js_lq_miao = 180;     //需冷却多少秒 180
        /************--------***********/

        this.us_data_fz = false;


        //this.my_c  = {1:[1,1,0],2:[3,0,0],3:[4,0,0],4:[3,0,0],5:[5,1,0],6:[14,1,0],7:[7,0,0],8:[14,1,0]};
        this.my_c    = {'1':['1',0,0]}; //我的船 (0船ID, 1在跑否, 2用于程序判断是不是已经上跑道 )
                            //{1:[1,0,0]}

        this.d_chuan = 1;    //是否掉船
        this.dc_jbie = 7;    //解锁了7级船就不再掉
        this.dc_time = 15;   //多少秒掉一船
        this.sc_time = now();//上次掉船时间

        this.up_time = now(); //最后更新数据时间
        

        this.config['qd'] = {1: 5, 2: 5, 3: 10, 4: 10, 5: 10, 6: 10, 7: 15};
        this.us['qd']     = [1, 0];

        this.more_appid = 'wx3df1cf2a43a6b16d';
        this.more_appph = 'pages/index/index';

    }
    upShuDuMoney(){ 
        let money = 0;
        for (var k in this.my_c){
            if (this.my_c[k][1] == 1){
                let c = this.my_c[k][0];
                money += this.c[c][4]/(this.c[c][3]*13.4/2);
            }            
        }
        this.mm_sy = parseInt(money);
        if (undefined!==G.dom.sdu_font){
            G.dom.sdu_font.attr.text = G.mm_sy+' / 秒';
        }
        
    }
    updateData(d){
        let that = this;
        let pt = {'act':'updateData'}
        if (undefined!==d && undefined!==d['oact']){
            for (var k in d){
                pt[k] = d[k];
            }
        }
        
        pt['wz_c'] = JSON.stringify(this.my_c);
        pt['zsi']  = this.zsi;
        pt['m']    = this.money;
        pt['js_w'] = this.js_w;
        pt['pd_w'] = this.pd_w;
        pt['mm_sy']= this.mm_sy;
        pt['js_c'] = 3;
        for (let jsc in this.js_c){
            if (jsc > pt['js_c']){
                pt['js_c'] = jsc;
            }            
        }
        if (pt['js_c'] >= this.dc_jbie){
            this.d_chuan = 0;
        }
        
        //this.js_c = {1:1,2:1,3:1};      //当前解锁船级别
        post(pt, function (dt) {
            if (dt.code == 200) {
                if (undefined!==dt['mccs'] && undefined!==d['oact'] && 'maiChuan'==d['oact'] && d['mai_c']>0){
                    that.mc_cs[d['mai_c']] = dt['mccs'];
                    that.upChuanMoney();
                }
            }
        });
        this.up_time = now();
        this.upShuDuMoney();
    }
    upChuanMoney(){
        for (var k in this.c_cm){
            let money = this.c_cm[k];
            //p(money);
            for (var i=0; i<this.mc_cs[k]; i++){
                money += money*(this.config['zhangfu']/100);
            }
            //p(k+' - '+this.mc_cs[k]+' - '+money);
            this.c_m[k] = parseInt(money);
        }
        //p(this.c_cm);
    }
    gameData(d){
        if (!this.us_data_fz){
            this.money = parseInt(this.us.ggnum);
            this.zsi   = parseInt(this.us.jbi);
            this.xslb  = parseInt(d.xslb);
            if (this.xslb==0){
                this.newer = 1;
            }
            
            for (var i=1; i<=d.js_c; i++){
                this.js_c[i] = 1;
            }
            this.js_w       = parseInt(d.js_w);
            this.pd_w       = parseInt(d.pd_w);
            this.mm_sy      = parseInt(d.mm_sy);
            this.js_cs      = parseInt(d.js_cs);
            this.js_time    = parseInt(d.js_time);
            this.js_lq_time = parseInt(d.js_lq_time);
            this.my_c       = d.wz_c!=''?JSON.parse(d.wz_c):{};
            this.my_c_data  = d.wz_c_data!=''?JSON.parse(d.wz_c_data):{};
            this.js_miao    = parseInt(d.js_miao);
            this.js_lq_miao = parseInt(d.js_lq_miao);
            this.js_true    = d.js_true;
            this.js_lq_true = d.js_lq_true;

            if (d.js_c >= this.dc_jbie){
                this.d_chuan = 0;
            }
            if (d.mc_cs!==''){
                for (var k in d.mc_cs){
                    this.mc_cs[k] = d.mc_cs[k];
                }
            }
            this.us_data_fz = true;
        }
    }
    goAPPID(id,p) {
        if (undefined===id){
            id = this.more_appid;
            p  = this.more_appph;
        }
        var e = this;
        wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
            appId: id,
            path: p,
            success: function () {
                //p("底部发现更多游戏成功跳转到appId为 wxa0526df46dfc97a1 的小程序");
            },
            fail: function () { },
            complete: function () { }
        }) : wx.previewImage({
            //urls: [ 'i/jbix.png','i/jbix.png' ]
        });
    }
    goPage(s,gk) {
		let that = this;
        this.dom   = {};        
		imgLoad    = {};
       
        this.clickMove = false;
		this.music     = new Music();
		this.touch     = new Touch(this);

        //this.openD.postMessage({cmd:'echo',n:0,uid:this.config.uid,fen:this.deFen})

		//s = 'play';
		p('请示 '+(s==undefined?'index':s)+' 页');

        this.currPage = s;
		switch(s){
			case 'play':
				this.play = new Play(gk);
				break;
			default:
                this.currPage = 'index';
				this.page = new Index();
				break;
		}
        //that.comm.guoGuanHaoYou();
		//this.touch.touchEvent(0);
        this.iniDoms();
		// 清除上一局的动画 
        window.cancelAnimationFrame(this.aniId);
        this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
	}
	
    delClass(v) {	//清理class
        for (var dx in this.dom) {
            if (undefined!==this.dom[dx].attr && undefined !== this.dom[dx].attr['class'] && this.dom[dx].attr['class'] == v) {
                delete this.dom[dx];
            }
        }
        this.iniDoms();
    }
	setClass(css,attr){
        for (var dx in this.dom) {
            if (undefined !== this.dom[dx].attr['class'] && this.dom[dx].attr['class'] == css) {
				for (var attr1 in attr){
					this.dom[dx][attr1] = attr[attr1];
				}
            }
        }
	}
    iniDoms() {		//更新元素记录
        this.doms = [];
        let domTemp = {0:{}};
        for (var domk in this.dom) {
            if(undefined!==this.dom[domk].attr){
                if (undefined !== this.dom[domk].attr.zindex && this.dom[domk].attr.zindex > 0){
                    if (undefined===domTemp[this.dom[domk].attr.zindex]){
                        domTemp[this.dom[domk].attr.zindex] = {};
                    }
                    
                    domTemp[this.dom[domk].attr.zindex][domk] = this.dom[domk];
                }else {
                    domTemp[0][domk] = this.dom[domk];
                }
            }else {
                domTemp[0][domk] = this.dom[domk];
            }
        }
        this.dom = {};
        for (var m in domTemp){
            for (var domk in domTemp[m]){
                this.dom[domk] = domTemp[m][domk];
            }            
        }
        //p(domTemp);
        domTemp = {};
        for (var domk in this.dom) {

			if (this.dom[domk]instanceof Array){
				//for (var dm2 in this.dom[dm]){
				//	this.doms[this.doms.length] = domk;
				//}
			}else {
				this.doms[this.doms.length] = domk;
			}
        }
    }

	iniBG() {	//初始背景
        if (this.adOK && this.adHeight == 0 && undefined !== this.bannerAd) {	//获取底部高度
            if (undefined !== this.bannerAd.style.realHeight) {
                this.adHeight = this.bannerAd.style.realHeight;
                this.bannerAd.style.top = this.wh - this.adHeight;
            }
        }
        ctx.clearRect(0, 0, this.ww, this.wh);
        ctx.closePath();
        ctx.restore();
        for (var dm in this.dombg) {		
            this.dombg[dm].w();
        }
    }
	domShow() {
        let hasDel = false;
        for (var dm in this.dom) {
			if (this.dom[dm]instanceof Array){
				for (var dm2 in this.dom[dm]){
					if (this.dom[dm][dm2].attr.del){
						delete this.dom[dm][dm2];
                        hasDel = true;
					}else {			
						this.dom[dm][dm2].w();
					}
				}
			}else {
				if (this.dom[dm].attr.del){
					delete this.dom[dm];
					hasDel = true;
				}else {
					this.dom[dm].w();
				}
			}
        }
        if (hasDel){
            this.iniDoms();
        }

        if (clip) { //前面有裁没闭合
            clip = false;
            ctx.restore();
        }
	}
	touchEvent(){
		this.touch.touchEvent(1);
        this.aniId = window.requestAnimationFrame(this.bindLoop, canvas);
	}



    usLoginFunc(e,t){
        let that = this; 
        post({act: 'usLogin', fid: that.fid, qzt: that.qzt, scene: that.scene, data: e.rawData,
            code: t.code, iv: e.iv, encryptedData: e.encryptedData
        }, function (d) {
            
            wx.hideLoading();
            if (that.fid > 0) that.fid = 0;
            if (that.qzt > 0) that.qzt = 0;
            if (d.code == 200) {
                that.start.hide();
                if (d.config) {
                    for (var k in d.config){
                        that.config[k] = d.config[k];
                    }
                }
                if (undefined !== d.uid && d.uid > 0) {
                    that.us = d;
                }
                that.gameData(d.gData);
            }
        }, 'json');
    }

    oldGetUser() {
        let that = this; 
        //wx.showLoading({ title: '更新中...' })
        wx.login({
            success: function (t) {
                //wx.hideLoading();
                wx.getUserInfo({
                    success: function (e) {
                        that.usLoginFunc(e,t);
                    }, fail: function (t) {
                        wx.showModal({
                            title: '请求授权',
                            content: '未授权，请先授权再继续游戏！',
                            showCancel:false,
                            complete: function (x) {
                                that.oldGetUser();
                            }
                        })
                    }
                })
            },
            fail: function (t) {
                p('fail');
                //p(t);
                wx.showModal({
                    title: '请求授权',
                    content: '未授权，无法继续游戏',
                    showCancel: false,
                    complete: function (x) {
                        that.oldGetUser();
                    }
                })
                //that.oldGetUser();
            }, complete: function (t) {
                p('complete');
                //p(t);
            }
        })
    }

    buildStartBtn() {
		if (!this.bStartBtn){
			return;
		}
		
        let that = this;
        if (undefined === wx.createUserInfoButton) {
            this.oldGetUser();
            return;
        }

        
        this.start = wx.createUserInfoButton({
            text: '',
            style: {
                left: 0,
                top: 0,
                width: this.ww,
                height: this.wh 
                //,lineHeight: 40,
                //,backgroundColor: '#ff0000'
                //color: '#ffffff',
                //textAlign: 'center',
                //fontSize: 16
                //,borderRadius: 4
            }
        });
        this.start.onTap((e) => {
            wx.showLoading({ title: '更新中...' })
            if (that.us.data != undefined && that.config.uid > 0) {
                wx.hideLoading();
                that.start.hide();
                //that.music.con(that.syin);
                //that.goPage('level');
            } else {
                if (e.errMsg == 'getUserInfo:ok') {
                    //p('开始按扭');
                    //p(e);
                    wx.login({
                        success: function (t) {
                            that.usLoginFunc(e,t);
                        }
                    });
                }
            }
        })
    }

    getConfig(ck, arr) {
        let that = this;
        if (ck == 0 && now() - this.getConfigTime < 10) {
            return;
        }
        this.getConfigTime = now();
        p(' getConfig: ' + that.fid + ' + ' + that.qzt);
        if (!that.show) {	//第一次show必须先取来路参数
            wx.onShow(function (t) {
                //p('from');
                //p(t);
                if (undefined != t.query.fid) {
                    that.fid = t.query.fid;
                }
                if (undefined != t.query.qz) {
                    that.qzt = t.query.qz;
                }

                that.scene = t.scene;
                that.show = true;
                that.getConfig(1)
            });
        } else {
			var css = { act: 'config',fid: that.fid};		
			post(css, function (a) {
                if (a.uid > 0) {
                    if (that.fid > 0) that.fid = 0;
                    if (that.qzt > 0) that.qzt = 0;
                }
                that.config = a.config;

                if (undefined !== a.us && undefined !== a.us.us_id) {
                    that.us = a.us;
                    if (undefined!==that.start){
                        that.start.hide();
                    }
                    that.gameData(a.gData);
                    if (that.currPage == 'index'){
                        if (a.us.qd[1] == 0){
                            that.comm.qianDao();
                        }                        
                        that.upChuanMoney();
                    }
                    
                }else {
                    that.oldGetUser();
                }
                if (a.config.moreBtn == 1 && undefined!==G.dom.more){
                    G.dom.more.dis = true;
                }
                

				//that.goPage('play',4,4,1);
				//that.altGG(5, 1235)
				//that.comm.paiHang();
            });
        }
    }

    fx(cs) {
		//return;
        let that = this;
        let fxt = (undefined!==this.us&&undefined!==this.us.us_name?'['+this.us.us_name+'@我]':'')+that.config.CY_fxTxt[0];
        let fxi = 'timg.gif';//that.config.CY_fxImg;
        let fxcs= that.config.CY_fxCS;

        p('分享参数 '+fxi);

        //p('分享参数： ' + that.config.CY_fxCS == '' ? 'qz=' + that.qzTime : that.config.CY_fxCS + '&qz=' + that.qzTime);
        wx.shareAppMessage({
            title: fxt,
            imageUrl: fxi,
            query: fxcs,
            withShareTicket: true,
            success: function (t) {
                //o.getQunRankInfo(t.shareTickets[0]), r.onClose() 

            }
            , fail: function (t) {
                console.log("match share failed >>>>>>>>>>")
            }
        });
        p('进了 fx');
    }
	ad() {	//输出广告 已有会清理后再创建
		if (!this.adOK){return}
		this.adHeight = 0;
		if (undefined !== this.bannerAd) {
			this.bannerAd.destroy()
		}
		if (undefined === wx.createBannerAd) {
			return;
		}
		this.bannerAd = wx.createBannerAd({
			adUnitId: this.adID,
			style: {
				left: 0,
				top: this.wh * 0.85,
				width: this.ww
			}
		})
		this.bannerAd.show()
	}
}