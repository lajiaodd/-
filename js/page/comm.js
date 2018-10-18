'use strict'
import Dom from '../inc/dom'
import Xg from '../ex/xg'
import MvChuan from '../ex/mvchuan'
import {p,rand,ww,wh,liuhai,bli,post,alt,now,mGS,bli2} from '../inc/func'

export default class Comm {
    constructor(){
        //this.maiChuan(4);
		//this.bg();
    }
    guiZhe() {	//规则
        let that = this;
        G.dom.gzbg = new Dom('img', 'class:guiz;src:'+G.imgDir+'1.png;width:100%;height:100%;x:0;y:0;', { click: function () { } });
        G.dom.gzs = new Dom('img', 'class:guiz;src:'+G.imgDir+'gz.png;width:' + 910 * G.bli + ';height:' + 670 * G.bli + ';x:'+45*G.bli+';y:' + 422 * G.bli + ';');

        G.dom.ts_close = new Dom('img', 'class:guiz;src:'+G.imgDir+'popup-close.png;width:' + 76 * G.bli + ';height:' + 145 * G.bli + ';x:' + 810 * G.bli + ';y:' + 281 * G.bli + ';', {
            click: function () {
                that.parent.delClass('guiz');
            }
        });
        G.iniDoms();
    }

	bg(){
        return;
		/*G.dombg['bg'] = new Dom ('img','src:'+G.imgDir+'PG_bj-min.png;x:0;y:0;width:100%;height:100%;');
        let yunw = rand(30, 100), yunh = rand(10, 20), yunx = rand(0, G.ww);
        for (var n = 0; n <= 7; n++) {
            G.dombg['yun' + n] = new Dom('img', 'src:imgs/yun.png;mv:' + rand(1, 10) + ';width:' + yunw + ';height:' + yunw * 0.73 + ';x:' + yunx + ';y:' + yunh + ';')			
            yunh += yunw * 0.73 + rand(10, 50);
            yunw = rand(60, 80);
            yunx = rand(0, G.ww);
        }*/
	}



    paiHang(n){  //排行
        p('排行');
        let that =this;
        G.dom['cm_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'1.png;x:0;y:0;width:100%;height:100%;',{click:function(){}});
        
        G.dom['cm_bt'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'ph_bg.png;x:'+(ww-530)/2+';y:303;width:510;height:728;');
        /*
        G.dom['cm_clo'] = new Xg ('img','class:comm;xg:1;zindex:10;src:'+G.imgDir+'sc.png;p_x:534;p_y:0;p_w:56;p_h:56;x:643;y:247;width:56;height:56;',{click:function(){G.delClass('comm')}});
        G.dom['cm_tt'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:610;p_w:648;p_h:131;x:center;y:281;width:648;height:131;');
        if (n == 1){
            G.dom['cm_my'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:96;p_w:151;p_h:43;x:184;y:309;width:151;height:43;',{click:function(){G.delClass('comm');that.paiHang(1);}});
            G.dom['cm_all'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:170;p_y:150;p_w:151;p_h:43;x:419;y:310;width:151;height:43;',{click:function(){G.delClass('comm');that.paiHang(2);}});
        }else {
            G.dom['cm_my'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:170;p_y:96;p_w:151;p_h:43;x:184;y:309;width:151;height:43;',{click:function(){G.delClass('comm');that.paiHang(1);}});
            G.dom['cm_all'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:150;p_w:151;p_h:43;x:419;y:310;width:151;height:43;',{click:function(){G.delClass('comm');that.paiHang(2);}});
        }*/

        G.dom['cm_tt'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:473;p_w:648;p_h:131;x:center;y:281;width:648;height:131;');
        G.dom['cm_clo'] = new Xg ('img','class:comm;xg:1;zindex:10;src:'+G.imgDir+'sc.png;p_x:534;p_y:0;p_w:56;p_h:56;x:558;y:298;width:56;height:56;',{click:function(){G.delClass('comm')}});
        G.dom['cm_all'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:150;p_w:151;p_h:43;x:center;y:310;width:151;height:43;');

        G.dom['cm_phk'] = new Dom('div', 'class:comm;zindex:100;border:#E8E3B4;width:432;height:575;x:157;y:400;', {overflow: true, ofx: 2, mousemove: true});
        G.iniDoms();

        let y = 105;    
        wx.showLoading({title:'数据加载中...'});
        post({act:'gOrder'}, function(d){
            wx.hideLoading();
            if(d['code'] == 200){

                for (var m in d['ls']) {
                    let i = parseInt(m) + 1;
                    G.dom['cm_ls_tx_'+i] = new Dom ('img','class:comm;zindex:10;src:'+d['ls'][m]['pic']+';x:15;y:'+(y*(i-1) + 26)+';width:56;height:56;',{f:G.dom['cm_phk']});
                    G.dom['cm_ls_na_'+i] = new Dom ('font','class:comm;zindex:10;font:bold 16px 微软雅黑;color:#CB6928;x:100;y:'+(y*(i-1) + 32)+';textalign:left;valign:middle;',{text:d['ls'][m]['name'],f:G.dom['cm_phk']});
                    G.dom['cm_ls_fs_'+i] = new Dom ('font','class:comm;zindex:10;color:#603A16;font:14px 微软雅黑;x:100;y:'+(y*(i-1) + 72)+';textalign:left;',{text:mGS(d['ls'][m]['ggnum']),f:G.dom['cm_phk']});

                    G.dom['cm_ls_px_'+i] = new Dom ('font','class:comm;zindex:10;font:bold 20px 微软雅黑;color:#9C5215;x:400;y:'+(y*(i-1) + 52)+';textalign:center;',{text:i,f:G.dom['cm_phk']});

                    G.dom['cm_ls_line_'+i] = new Dom('line', 'class:comm;zindex:100;color:#CA966C;line:1;',{path:[[2,(y*(i-1) + y)],[432,(y*(i-1) + y)]],f:G.dom['cm_phk']});

                }

            }
        })

        /*for (var i=1; i<=10; i++){
            G.dom['cm_ls_tx_'+i] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'132.jpg;x:15;y:'+(y*(i-1) + 26)+';width:56;height:56;',{f:G.dom['cm_phk']});
            G.dom['cm_ls_na_'+i] = new Dom ('font','class:comm;zindex:10;font:bold 16px 微软雅黑;color:#CB6928;x:100;y:'+(y*(i-1) + 32)+';textalign:left;valign:middle;',{text:'name',f:G.dom['cm_phk']});
            G.dom['cm_ls_fs_'+i] = new Dom ('font','class:comm;zindex:10;color:#603A16;font:14px 微软雅黑;x:100;y:'+(y*(i-1) + 72)+';textalign:left;',{text:'122342K',f:G.dom['cm_phk']});
            G.dom['cm_ls_px_'+i] = new Dom ('font','class:comm;zindex:10;src:'+G.imgDir+'132.jpg;font:bold 20px 微软雅黑;color:#9C5215;x:400;y:'+(y*(i-1) + 52)+';textalign:center;',{text:i,f:G.dom['cm_phk']});

            G.dom['cm_ls_line_'+i] = new Dom('line', 'class:comm;zindex:100;color:#CA966C;line:1;',{path:[[2,(y*(i-1) + y)],[432,(y*(i-1) + y)]],f:G.dom['cm_phk']});
        }*/
        //G.iniDoms();
    }

    

    maiChuan(t){ //买船
        p('买船');
        let that =this;
        G.dom['cm_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'1.png;x:0;y:0;width:100%;height:100%;',{click:function(){}});
        G.dom['cm_mc_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'cm_maic_bg.png;x:center;y:181;width:680;height:1008;');
        
        G.dom['cm_clo'] = new Xg ('img','class:comm;xg:1;zindex:10;src:'+G.imgDir+'sc.png;p_x:534;p_y:0;p_w:56;p_h:56;x:601;y:229;width:56;height:56;',{click:function(){G.delClass('comm')}});

        G.dom['cm_jbi'] = new Dom ('img','class:comm;xg:1;zindex:10;src:'+G.imgDir+'sc.png;p_x:600;p_y:0;p_w:56;p_h:56;x:97;y:230;width:56;height:56;');
        G.dom['cm_jb_f'] = new Dom ('font','class:comm;zindex:10;font:bold 24px 微软雅黑;color:#531C17;x:160;y:258;textalign:left;valign:middle;',{text:mGS(G.money)});


        G.dom['cm_lsk'] = new Dom('div', 'class:comm;zindex:10;border:#E8E3B4;width:590;height:818;x:center;y:310;', {overflow: true, ofx: 2, mousemove: true});

        let y = 150;
        for (var c in G.c){
            let n = c;
            /*if (c == 1){
                G.dom['cm_xbg_'+c] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:760;p_w:590;p_h:128;x:0;y:0;width:590;height:128;',{f:G.dom['cm_lsk'], click:function(){that.maiChuan_ck(n,t)}});

                    G.dom['cm_btnx_'+c] = new Xg ('img','class:comm;zindex:10;src:'+G.imgDir+'jiaChuan.png;x:375;y:'+(y*(c-2) + y+75-G.c[c][1][1]/2-G.c[c][2])+';width:208;height:94;',{f:G.dom['cm_lsk']});

                    G.dom['cm_btn_i_'+c] =  new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:600;p_y:0;p_w:56;p_h:56;x:450;y:'+(y*(c-2) + y+130-G.c[c][1][1]/2-G.c[c][2])+';width:20;height:20;',{f:G.dom['cm_lsk']});

                    G.dom['cm_btn_f_'+c]  = new Dom ('font','class:comm;zindex:10;font:12px 微软雅黑;color:#96430C;x:480;y:'+(y*(c-2) + y+140-G.c[c][1][1]/2-G.c[c][2])+';textalign:center;valign:middle;',{f:G.dom['cm_lsk'],text:'0'});

            }else {*/
                if (undefined!==G.js_c[c]){   //解锁
                    G.dom['cm_xbg_'+c] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:900;p_w:590;p_h:128;x:0;y:'+(y*(c-2) + y)+';width:590;height:128;',{f:G.dom['cm_lsk']});

                    G.dom['cm_cc_'+c] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'c/'+c+'_2.png;x:'+(80-G.c[c][1][0]/2)+';y:'+(y*(c-2) + y+74-G.c[c][1][1]/2-G.c[c][2])+';width:'+G.c[c][1][0]+';height:'+G.c[c][1][1]+';',{f:G.dom['cm_lsk']});

                    //G.dom['cm_btn_'+c] = new Xg ('img','xg:1;src:'+G.imgDir+'jiaChuan.png;x:200;y:'+(y*(c-2) + y+74-G.c[c][1][1]/2-G.c[c][2])+';width:208;height:94;',{f:G.dom['cm_lsk']});

                    G.dom['cm_btnx_'+c] = new Xg ('img','class:comm;zindex:10;src:'+G.imgDir+'jiaChuan.png;x:375;y:'+(y*(c-2) + y+65-G.c[c][1][1]/2-G.c[c][2])+';width:208;height:94;',{f:G.dom['cm_lsk'], click:function(){p(n);that.maiChuan_ck(n,t)}});

                    let mon = G.c_m[c];
                    ctx.font='12px 微软雅黑';
                    let w = ctx.measureText(mon).width;

                    G.dom['cm_btn_i_'+c] =  new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:600;p_y:0;p_w:56;p_h:56;x:'+(460-w)+';y:'+(y*(c-2) + y+120-G.c[c][1][1]/2-G.c[c][2])+';width:20;height:20;',{f:G.dom['cm_lsk']});

                    G.dom['cm_btn_f_'+c]  = new Dom ('font','class:comm;zindex:10;font:12px 微软雅黑;color:#96430C;x:480;y:'+(y*(c-2) + y+130-G.c[c][1][1]/2-G.c[c][2])+';textalign:center;valign:middle;',{f:G.dom['cm_lsk'],text:mon});

                }else {
                    G.dom['cm_xbg_'+c] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:1040;p_w:590;p_h:128;x:0;y:'+(y*(c-2) + y)+';width:590;height:128;',{f:G.dom['cm_lsk'], click:function(){alt('未解锁')}});

                    G.dom['cm_cc_'+c] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'c/'+c+'_1.png;x:'+(80-G.c[c][1][0]/2)+';y:'+(y*(c-2) + y+74-G.c[c][1][1]/2-G.c[c][2])+';width:'+G.c[c][1][0]+';height:'+G.c[c][1][1]+';',{f:G.dom['cm_lsk']});

                    G.dom['cm_jb_'+c] = new Dom ('font','class:comm;zindex:10;font:12px 微软雅黑;color:#FFF;x:520;y:'+(y*(c-2) + y + 60)+';textalign:center;valign:middle;',{text:c,f:G.dom['cm_lsk']});
                }
            //}
        }
        G.iniDoms();
    }
    maiChuan_ck(c,t){ //点击买船/解锁
        let n = 0;
        G.delClass('comm');
        for (var i=1; i<=G.js_w; i++){
            if (undefined===G.my_c[i]){
                n = i;
                break;
            }
        }
        
        if (G.money < G.c_m[c]){
            alt('您的金币不足');
            return;
        }
        

        if (n <= 0){
            alt('已经没有船位');
        }else {
            p('位置'+n);

            G.money -= G.c_m[c];
            let pos = t.chuan_xy(c,G.dom['kg_'+n].attr.x*bli2,G.dom['kg_'+n].attr.y*bli2);
            G.my_c[n] = [c,0,0];
            G.dom['k_c_'+n]= new MvChuan ('img','xg:1;zindex:1;src:'+G.imgDir+'c/'+c+'_2.png;chuan:'+c+';endy:'+pos[1]*bli+';weizi:'+n+';x:'+pos[0]+';y:0;width:'+G.c[c][1][0]+';height:'+G.c[c][1][1]+';',{parent:t,click:function(){t.zhaoHui(n);},mousemove:true});

            G.dom['kg_'+n].attr.nCurrImg = 0;
            G.iniDoms();

            G.updateData({oact:'maiChuan',mai_c:c});
        }
    }

    jiaSu(){ //看视频_获得钻石
        if (G.js_lq_true){
            alt('还在冷却中');
            return;
        }else if (G.js_true){
            alt('已经加速中');
            return;
        }
        
        let that = this;
        G.dom['cm_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'1.png;x:0;y:0;width:100%;height:100%;',{click:function(){}});
        G.dom['cm_sh_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'jsu_bg.png;x:center;y:373;width:510;height:432;');
        
        G.dom['cm_tt'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:473;p_w:648;p_h:131;x:center;y:341;width:648;height:131;');
        G.dom['cm_clo'] = new Xg ('img','class:comm;xg:1;zindex:10;src:'+G.imgDir+'sc.png;p_x:534;p_y:0;p_w:56;p_h:56;x:558;y:358;width:56;height:56;',{click:function(){G.delClass('comm')}});

        G.dom['cm_ttf'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:270;p_w:266;p_h:42;x:center;y:367;width:266;height:42;');

        let st = '';
        if (G.js_cs > 0){
            st = '有 '+G.js_cs+' 次免费加速机会';            
        }else {
            st = '无免费加速机会，消耗 '+G.js_zs+' 钻石';   
        }
        G.dom['cm_time1'] = new Dom ('font','class:comm;zindex:10;font:bold 15px 微软雅黑;color:#531C17;x:'+(ww/2)+';y:550;textalign:center;valign:middle;',{text:st});
        G.dom['cm_time2'] = new Dom ('font','class:comm;zindex:10;font:bold 15px 微软雅黑;color:#531C17;x:'+(ww/2)+';y:600;textalign:center;valign:middle;',{text:'加速5分钟将获双倍收益'});

        G.dom['cm_btn'] = new Xg ('img','xg:1;class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:1380;p_w:274;p_h:96;x:center;y:720;width:274;height:96;',{click:function(){G.delClass('comm');that.jiaSu_ck();}});
        G.iniDoms();
    }
    jiaSu_ck(){
        p('确定加速');
        let pt = {act: 'jiasu'}
        if (G.js_cs > 0){
            G.js_cs -= 1;  
            pt['jscs'] = G.js_cs;
        }else {
            if (G.js_zs > G.zsi){
                alt('钻石不够');
                return;
            }else {
                //todo 扣钻石
                p('todo 扣钻石');
            }
            G.zsi -= G.js_zs;
            pt['zsi'] = G.zsi;
        }
        
        post(pt, function (d) {
            if (d.code == 200) {
                G.dom.jbi_num.attr.text = G.zsi;
                G.dom.sdu_font.attr.text = (G.mm_sy*2)+' / 秒';
                G.js_true = true;   //加速中？
                G.js_time = now();
                G.beiShu  = 2;
                G.dom.su_time.dis = true;
                for (var c in G.my_c){
                    if (G.my_c[c][1] == 1 && undefined!==G.dom['go_'+c]){
                        G.dom['go_'+c].tiaoShu();
                    }
                }

            }
        });
    }
    huoZhuan(){ //获得钻石
        p('获得钻石');
    }
    huoZhuan_v(){ //看视频_获得钻石
        p('看视频_获得钻石');

        G.dom['cm_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'1.png;x:0;y:0;width:100%;height:100%;',{click:function(){}});
        G.dom['cm_sh_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'vid.png;x:center;y:373;width:510;height:432;');
        
        G.dom['cm_tt'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:473;p_w:648;p_h:131;x:center;y:341;width:648;height:131;');
        G.dom['cm_clo'] = new Xg ('img','class:comm;xg:1;zindex:10;src:'+G.imgDir+'sc.png;p_x:534;p_y:0;p_w:56;p_h:56;x:558;y:358;width:56;height:56;',{click:function(){G.delClass('comm')}});

        G.dom['cm_ttf'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:0;p_w:226;p_h:42;x:center;y:367;width:226;height:42;');

        G.dom['cm_btn'] = new Xg ('img','xg:1;class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:1180;p_w:274;p_h:96;x:center;y:720;width:274;height:96;',{click:function(){G.delClass('comm')}});

        G.iniDoms();
    }
    huoZhuan_v_notime(){ //看视频_获得钻石
        p('没到时间看视频_获得钻石');
        G.dom['cm_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'1.png;x:0;y:0;width:100%;height:100%;',{click:function(){}});
        G.dom['cm_sh_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'vid.png;x:center;y:373;width:510;height:432;');
        
        G.dom['cm_tt'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:473;p_w:648;p_h:131;x:center;y:341;width:648;height:131;');
        G.dom['cm_clo'] = new Xg ('img','class:comm;xg:1;zindex:10;src:'+G.imgDir+'sc.png;p_x:534;p_y:0;p_w:56;p_h:56;x:558;y:358;width:56;height:56;',{click:function(){G.delClass('comm')}});

        G.dom['cm_ttf'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:0;p_w:226;p_h:42;x:center;y:367;width:226;height:42;');

        G.dom['cm_time'] = new Dom ('font','class:comm;zindex:10;font:12px 微软雅黑;color:#531C17;x:'+(ww/2)+';y:680;textalign:center;valign:middle;',{text:'12分20秒后可再次获得'});

        G.dom['cm_btn'] = new Xg ('img','xg:1;class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:1280;p_w:274;p_h:96;x:center;y:720;width:274;height:96;',{click:function(){G.delClass('comm')}});

        G.iniDoms();
    }
    buZai_souHuo(n){ //离线收获
        p('离线收获');
        let that =this;
        post({act: 'unlineMoney'}, function (d) {
            if (d.code == 200) {
                let n = d.souy;
                G.dom['cm_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'1.png;x:0;y:0;width:100%;height:100%;',{click:function(){}});
                G.dom['cm_sh_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'l_xian.png;x:center;y:373;width:510;height:526;');
                
                G.dom['cm_tt'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:473;p_w:648;p_h:131;x:center;y:341;width:648;height:131;');
                G.dom['cm_clo'] = new Xg ('img','class:comm;xg:1;zindex:10;src:'+G.imgDir+'sc.png;p_x:534;p_y:0;p_w:56;p_h:56;x:558;y:358;width:56;height:56;',{click:function(){G.delClass('comm')}});

                G.dom['cm_ttf'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:50;p_w:321;p_h:35;x:center;y:367;width:321;height:35;');

                G.dom['cm_zjb'] = new Dom ('font','class:comm;zindex:10;font:bold 26px 微软雅黑;color:#531C17;x:'+(ww/2)+';y:700;textalign:center;valign:middle;',{text:'+'+n});

                G.dom['cm_btn'] = new Xg ('img','xg:1;class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:280;p_y:1180;p_w:274;p_h:96;x:center;y:810;width:274;height:96;',{click:function(){G.delClass('comm');that.buZai_souHuo_ok(n);}});
                G.iniDoms();
            }
        }); 
    }
    buZai_souHuo_ok(n){ //领取离线收益
        G.money += n;
        p('领取离线收益');
    }

    qianDao(){  //签到奖励
        p('签到奖励');
        let that =this;
        G.dom['cm_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'1.png;x:0;y:0;width:100%;height:100%;',{click:function(){}});
        G.dom['cm_tt'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:206;p_w:331;p_h:54;x:center;y:319;width:331;height:54;');

        G.dom['cm_clo'] = new Xg ('img','class:comm;xg:1;zindex:10;src:'+G.imgDir+'sc.png;p_x:460;p_y:0;p_w:56;p_h:56;x:621;y:321;width:56;height:56;',{click:function(){G.delClass('comm')}});
        
        G.dom['cm_cbg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'qd_bg.png;x:center;y:399;width:692;height:550;',{click:function(){}});


        if (1 == G.us.qd[1]){
            G.dom['cm_btn'] = new Xg ('img','xg:1;class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:1380;p_w:274;p_h:96;x:center;y:863;width:274;height:96;',{click:function(){G.delClass('comm')}});
        }else {        
            G.dom['cm_btn'] = new Xg ('img','xg:1;class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:280;p_y:1180;p_w:274;p_h:96;x:center;y:863;width:274;height:96;',{click:function(){that.qianDao_ck()}});
        }

        let xw = 132;
        let xh = 171;
        let xx = 90, xy = 464, xx2 = xx;
		let lqu = false;
		for (var i = 1; i <= 7; i++) {
			let tu = 'sign';
			if (i == 7){
				tu = 'sign2';
			}
			if (i < G.us.qd[0] || (i == parseInt(G.us.qd[0]) && 1 == G.us.qd[1])) {
				G.dom['qd5x_' + i] = new Dom('img', 'class:comm;zindex:10;src:'+G.imgDir+'qd/'+tu+'-off.png;width:' + xw + ';height:' + xh + ';x:' + xx + ';y:' + xy + ';');

				G.dom['qd5b_' + i] = new Dom('font', 'class:comm;zindex:10;color:#DDD;font:14px 微软雅黑;textalign:center;valign:middle;x:' + xw/2 + ';y:133;', { text: '+' + G.config.qd[i] ,f:G.dom['qd5x_' + i]});
				G.dom['qd5f_' + i] = new Dom('font', 'class:comm;zindex:10;color:#DDD;font:14px 微软雅黑;textalign:center;valign:middle;x:' + xw/2 + ';y:30;', { text: '第' + i + '天' ,f:G.dom['qd5x_' + i]});

			} else if (i == G.us.qd[0]) {
				lqu = true;
				G.dom['qd5x_' + i] = new Dom('img', 'class:comm;zindex:10;src:'+G.imgDir+'qd/'+tu+'-current.png;width:' + xw + ';height:' + xh + ';x:' + xx + ';y:' + xy + ';');

				G.dom['qd5b_' + i] = new Dom('font', 'class:comm;zindex:10;color:#FFF;font:14px 微软雅黑;textalign:center;valign:middle;x:' + xw/2 + ';y:133;', { text: '+' + G.config.qd[i] ,f:G.dom['qd5x_' + i]});
				G.dom['qd5f_' + i] = new Dom('font', 'class:comm;zindex:10;color:#FFF;font:14px 微软雅黑;textalign:center;valign:middle;x:' + xw/2 + ';y:30;', { text: '第' + i + '天' ,f:G.dom['qd5x_' + i]});
			}else {
				G.dom['qd5x_' + i] = new Dom('img', 'class:comm;zindex:10;src:'+G.imgDir+'qd/'+tu+'-on.png;width:' + xw + ';height:' + xh + ';x:' + xx + ';y:' +xy + ';');
				G.dom['qd5b_' + i] = new Dom('font', 'class:comm;zindex:10;color:#FFF;font:14px 微软雅黑;textalign:center;valign:middle;x:' + xw/2 + ';y:133;', { text: '+' + G.config.qd[i] ,f:G.dom['qd5x_' + i]});
				G.dom['qd5f_' + i] = new Dom('font', 'class:comm;zindex:10;color:#FFF;font:14px 微软雅黑;textalign:center;valign:middle;x:' + xw/2 + ';y:30;', { text: '第' + i + '天' ,f:G.dom['qd5x_' + i]});
			}
            xx += xw+15;
            if (i == 4) {
                xy += xh + 22;
                xx = xx2;
            }
			if (i == 6) {
                xw = 278;
            }
		}
        G.iniDoms();
    }
    qianDao_ck(){
        G.delClass('comm');
        p('点了签到');

        let that = this;
        post({act: 'qianDao'}, function (d) {
            if (d.code == 200) {
				alt('签到成功');
                G.zsi = d.jbi;
                G.us.qd = d.qd;
                if (undefined!==G.dom.jbi_num){
                    G.dom.jbi_num.attr.text = d.jbi;
                }
            }
        });
    }

    jieShuo(n){  //解锁船
        p('解锁船');
        let that =this;
        G.dom['cm_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'1.png;x:0;y:0;width:100%;height:100%;',{click:function(){}});
        G.dom['cm_tt'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:473;p_w:648;p_h:131;x:center;y:341;width:648;height:131;');
        G.dom['cm_ttf'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:340;p_y:150;p_w:191;p_h:43;x:center;y:367;width:191;height:43;');
        G.dom['cm_clo'] = new Xg ('img','class:comm;xg:1;zindex:10;src:'+G.imgDir+'sc.png;p_x:534;p_y:0;p_w:56;p_h:56;x:558;y:358;width:56;height:56;',{click:function(){G.delClass('comm')}});
        
        G.dom['cm_fg'] = new Dom ('img','class:comm;z:2;zindex:10;src:'+G.imgDir+'fguang.png;x:center;y:457;width:398;height:387;');
        G.dom['cm_cuan'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'c/'+n+'_2.png;x:center;y:'+(457+(387-G.c[n][1][1]*2)/2)+';width:'+G.c[n][1][0]*2+';height:'+G.c[n][1][1]*2+';');
        G.dom['cm_btn'] = new Xg ('img','xg:1;class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:1280;p_w:274;p_h:96;x:center;y:856;width:274;height:96;',{click:function(){G.delClass('comm')}});
        G.iniDoms();
    }

    xinShou(){  //新手礼包
        p('新手礼包');
        let that =this;
        G.dom['cm_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'1.png;x:0;y:0;width:100%;height:100%;',{click:function(){}});
        G.dom['cm_mc_bg'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'xs_lb.png;x:center;y:271;width:510;height:679;');
        G.dom['cm_tt'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:0;p_y:473;p_w:648;p_h:131;x:center;y:261;width:648;height:131;');
        G.dom['cm_ttf'] = new Dom ('img','class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:340;p_y:100;p_w:163;p_h:45;x:center;y:289;width:163;height:45;');
        G.dom['cm_clo'] = new Xg ('img','class:comm;xg:1;zindex:10;src:'+G.imgDir+'sc.png;p_x:534;p_y:0;p_w:56;p_h:56;x:558;y:279;width:56;height:56;',{click:function(){G.delClass('comm');that.xinShou_ck()}});

        G.dom['cm_lb1'] = new Dom ('font','class:comm;zindex:10;font:bold 22px 微软雅黑;color:#531C17;x:226;y:210;textalign:left;valign:middle;',{text:'2000金币',f:G.dom['cm_mc_bg']});
        G.dom['cm_lb2'] = new Dom ('font','class:comm;zindex:10;font:bold 22px 微软雅黑;color:#531C17;x:226;y:339;textalign:left;valign:middle;',{text:'3钻石',f:G.dom['cm_mc_bg']});
        G.dom['cm_lb3'] = new Dom ('font','class:comm;zindex:10;font:bold 22px 微软雅黑;color:#531C17;x:226;y:474;textalign:left;valign:middle;',{text:'5分钟加速',f:G.dom['cm_mc_bg']});
        G.dom['cm_btn'] = new Xg ('img','xg:1;class:comm;zindex:10;src:'+G.imgDir+'sc.png;p_x:280;p_y:1180;p_w:274;p_h:96;x:center;y:863;width:274;height:96;',{click:function(){G.delClass('comm');that.xinShou_ck()}});

        G.iniDoms();
    }
    xinShou_ck(){
        p(G.zsi);
        
        G.zsi  += 3;   //钻石
        G.money+= 2000;   //初始2000金币
        G.js_cs+= 1;
        G.xslb  = 1;    //已领
        G.newer = 0;
        G.dom.jbi_num.attr.text = G.zsi;
        G.sc_time = now();
        p('点了领取新手礼包');

        post({act: 'xslb',m:G.money, zsi:G.zsi ,jscs:G.js_cs}, function (d) {
            if (d.code == 200) {
				alt('领取成功');
            }
        });

    }

}