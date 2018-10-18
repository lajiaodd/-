'use strict'
import Dom from '../inc/dom'
import Xg from '../ex/xg'
import Dongtu from '../ex/dongtu'
import MvChuan from '../ex/mvchuan'
import Move from '../ex/move'
import Mv from '../ex/mv'
import Da from '../ex/da'
import Paochuan from '../ex/paoChuan'


import {p,ww,wh,liuhai,rand,bli,now_m,vFloat,post,alt,bli2,mGS,inQ,now,data_r} from '../inc/func'

export default class Play {
    constructor(){
		let that = this;  
        let h = 1624;
        if (wh>h){
            h = '100%';
        }

        this.AllMoney = 0;
        this.JiaMoney = 0;
        this.disMoney = 0;
        
        this.hDu   = parseInt(270*bli); //弧度
        this.paoDao = [[63+625, 648], [63+625, 184], [63,184], [63,184+927], [63+625, 184+927], [63+625, 648]];

        for (var n in this.paoDao){
            this.paoDao[n][0] *= bli;
            this.paoDao[n][1] *= bli;
        }
        
        G.upShuDuMoney();
        p(G.beiShu);
        this.yxPOS   = [[this.paoDao[1][0]-this.hDu,this.paoDao[1][1]+this.hDu], [this.paoDao[2][0]+this.hDu,this.paoDao[2][1]+this.hDu], 
                        [this.paoDao[3][0]+this.hDu,this.paoDao[3][1]-this.hDu], [this.paoDao[4][0]-this.hDu,this.paoDao[4][1]-this.hDu]];  //圆心点
        

		G.dom.bg   = new Dom ('img','src:'+G.imgDir+'play_bg.jpg;x:0;y:0;width:100%;height:'+h+';');
        G.dom.home_btn = new Xg ('img','xg:1;src:'+G.imgDir+'home.png;x:29;y:42;width:74;height:78;',{click:function(){G.goPage();}});
        G.dom.jbi_btn  = new Xg ('img','xg:1;src:'+G.imgDir+'jbi.png;x:273;y:48;width:185;height:66;',{click:function(){G.comm.qianDao();}});
        G.dom.jbi_num = new Dom('font','font:14px 微软雅黑;x:'+(ww/2+10)+';y:78;txtalign:center;valign:middle;color:#531C17;',{text:G.zsi})

        G.dom.ph_btnx  = new Xg ('img','xg:1;src:'+G.imgDir+'ph.png;x:638;y:144;width:87;height:96;',{click:function(){G.comm.paiHang();}});

        G.dom.sudu_bg  = new Xg ('img','xg:1;src:'+G.imgDir+'sdu.png;x:center;y:244;width:195;height:46;');
        //new Dom('img','src:'+G.imgDir+'qian.png;x:center;y:299;width:267;height:56;');
        G.dom.qian_ixx = new Dom ('img','zindex:10;src:'+G.imgDir+'sc.png;p_x:600;p_y:0;p_w:56;p_h:56;x:center;y:299;width:56;height:56;');
        G.dom.qian_font= new Dom ('font','zindex:10;font:bold 24px 微软雅黑;color:#531C17;x:'+(ww/2)+';y:330;textalign:center;valign:middle;',{text:G.money});
        

        G.dom.su2_btn  = new Xg ('img','xg:1;src:'+G.imgDir+'2s.png;x:30;y:1086;width:115;height:120;',{click:function(){that.jiaSu_2x();}});
        G.dom.su_time  = new Dom('font','zindex:2;font:12px 微软雅黑;x:87.5;y:1225;txtalign:center;valign:middle;color:#FFF;',{text:''});

        G.dom.hs_btn   = new Xg ('img','xg:1;src:'+G.imgDir+'huisou.png;x:'+(ww-144)+';y:1086;width:114;height:120;',{click:function(){that.hui_sou();}});
        G.dom.zcy_btn  = new Xg ('img','xg:1;src:'+G.imgDir+'chuanYuan.png;x:center;y:1215;width:320;height:88;',{click:function(){G.fx();}});
        
        G.dom.jiaChuan_btn = new Xg ('img','xg:1;src:'+G.imgDir+'jiaChuan.png;x:220;y:947;width:208;height:94;',{click:function(){C.maiChuan(that);}});
        G.dom.chuanDui_btn = new Xg ('img','xg:1;src:'+G.imgDir+'chuanDui.png;x:443;y:947;width:92;height:94;',{click:function(){C.maiChuan(that);}}); //船队

        G.dom.jiaChuan_ixx = new Dom ('img','zindex:10;src:'+G.imgDir+'sc.png;p_x:600;p_y:0;p_w:56;p_h:56;x:60;y:53;width:20;height:20;',{f:G.dom.jiaChuan_btn});
        G.dom.jiaChuan_jb  = new Dom ('font','zindex:10;font:bold 12px 微软雅黑;color:#96430C;x:104;y:65;textalign:center;valign:middle;',{f:G.dom.jiaChuan_btn,text:'0'});
        
        G.dom.sdu_font = new Dom('font','font:12px 微软雅黑;x:'+(ww/2+10)+';y:266;txtalign:center;valign:middle;color:#FFF;',{text:G.mm_sy*G.beiShu+' / 秒'})

        G.dom.jsu = new Dom ('img','xg:1;zindex:2;src:'+G.imgDir+'jiesu.png;x:0;y:386;width:180;height:243;');
        G.dom.jsu_font = new Dom('font','zindex:2;font:12px 微软雅黑;x:63;y:487;txtalign:center;valign:middle;color:#FFF;',{text:''});
        
        
        //G.dom.lu = new Dom ('div','radius:120;line:2;border:#FFF;color:#FFF;x:115;y:230;width:520;height:830;');
        //G.dom.lu = new Dom ('div','radius:'+this.hDu+';line:2;border:#FFF;color:#FFF;x:63;y:184;width:625;height:927;');
        for (var x in this.yxPOS){
            //G.dom['yx_'+x] = new Dom ('arc','line:red;color:red;r:120;x:'+this.yxPOS[x][0]*bli2+';y:'+this.yxPOS[x][1]*bli2+';');

            //p(G.dom['yx_'+x].attr);
            //G.dom['yxB_'+x] = new Dom ('arc','line:red;color:red;r:'+this.hDu+';x:'+this.yxPOS[x][0]*bli2+';y:'+this.yxPOS[x][1]*bli2+';');
        }

        //this.gg_jbi();
        //this.chuan_go(1);
 
        //for (var i=1; i<=14; i++){
       //     G.my_c[i] = [i,0,0];
        //}
        //G.my_c[2] = [4,0,0];
        //G.my_c[3] = [1,0,0];
        //G.my_c[4] = [4,0,0];
        //G.my_c[5] = [4,0,0];
       // G.my_c[6] = [4,0,0];

        for (var k=1; k<=5; k++){
            let y = ((k-1)*107+398);
            for (var m=1; m<=3; m++){
                let n = (k-1)*3+m;
                let x = 0;
                if (m==1){
                    x = (ww/2-153-128/2);
                }else if (m==3){
                    x = (ww/2+25+128/2);
                }else {
                    x = (ww-128)/2;
                }
                G.dom['kg_'+n] = new Dongtu ('img','src:'+G.imgDir+'k1.png;x:'+x+';y:'+y+';width:128;height:80;',{imgs:{0:{dir:G.imgDir+'k1.png'},2:{dir:G.imgDir+'k2.png'},1:{dir:G.imgDir+'k%.png',min:3,loop:true,max:4}}});

                if (n <= G.js_w && undefined!==G.my_c[n]){
                    let pos = this.chuan_xy(G.my_c[n][0],x,y);
                    
                    if (n == 2){ 
                        //p(x*bli+' - '+y*bli);
                        //p(pos);
                    }
                    

                   //G.dom['k_'+n]  = new Dom('img','src:'+G.imgDir+'k2.png;x:'+x+';y:'+y+';width:128;height:80;');

                    //G.dom['k_'+n].attr.nCurrImg = 1;
                    let currPos = n;

                    if (G.my_c[n][1] == 1){ //在跑
                        
                        G.dom['k_c_'+n]= new MvChuan ('img','zindex:1;src:'+G.imgDir+'c/'+G.my_c[n][0]+'_2.png;chuan:'+G.my_c[n][0]+';weizi:'+n+';x:'+pos[0]+';y:'+pos[1]+';width:'+G.c[G.my_c[n][0]][1][0]+';height:'+G.c[G.my_c[n][0]][1][1]+';',{parent:that,click:function(){that.zhaoHui(currPos);},mousemove:true});
                        G.dom['k_c_'+n].attr.mousemove = false;
                        G.dom['k_r_'+n] = new Dom('img','zindex:2;src:'+G.imgDir+'re.png;x:'+(x+128/2)+';y:'+(y+80-39)+';width:38;height:39;',{dis:true});

                    }else {     //没在跑 

                        //p(G.c[n][1]);
                        G.dom['k_c_'+n]= new MvChuan ('img','xg:1;zindex:1;src:'+G.imgDir+'c/'+G.my_c[n][0]+'_2.png;chuan:'+G.my_c[n][0]+';weizi:'+n+';x:'+pos[0]+';y:'+pos[1]+';width:'+G.c[G.my_c[n][0]][1][0]+';height:'+G.c[G.my_c[n][0]][1][1]+';',{parent:that,click:function(){that.zhaoHui(currPos);},mousemove:true});

                        G.dom['k_r_'+n] = new Dom('img','zindex:2;src:'+G.imgDir+'re.png;x:'+(x+128/2)+';y:'+(y+80-39)+';width:38;height:39;',{dis:false});
                    }
                } else {
                    if (n > G.js_w){    //未开放
                        G.dom['kg_'+n].dis = false;
                    } else {
                        G.dom['kg_'+n].attr.nCurrImg = 2;
                    }
                    G.dom['k_r_'+n] = new Dom('img','zindex:2;src:'+G.imgDir+'re.png;x:'+(x+128/2)+';y:'+(y+80-39)+';width:38;height:39;',{dis:false});
                }
            }
        }
        this.setQian(0);
        this.iniPaoChuan(0);
        //p(G.dom.ph_btn);
        if (G.newer==1 && G.xslb == 0){    //新手
            G.comm.xinShou();
        }else { //离线收益
            G.comm.buZai_souHuo();
        }
        G.sc_time = now();
		G.bindLoop = this.play.bind(this);
    }
    movePos(x, y, t) {
        //p(x+' - '+y+' - '+t);
        //p(t.attr.weizi+' - '+t.attr.chuan);
        t.attr.zindex=3;
        G.iniDoms();

        for (var i=1; i<=G.js_w; i++){
            if (!G.dom['kg_'+i].dis){
                break;
            }  
            if (undefined===G.my_c[i] || (i!=t.attr.weizi && G.my_c[i][0]==t.attr.chuan && G.my_c[i][1]==0 && G.my_c[i][2]==0 )){
                G.dom['kg_'+i].attr.nCurrImg = 1;
            }
        }
        //G.dom['kg_3'].attr.nCurrImg = 1;
    }
    endMovePos(x, y, t){
        let that = this; 
        t.attr.zindex=1;

        x += parseInt(t.attr.width)/2;
        y += parseInt(t.attr.height)/2;

        //判断是不是在圆角矩形外
        
        let zy = 126;
        let zx = 63;
        let zr = 100;
        let zh = 458;
        let zw = ww*bli-2*zx;
        let chuJie = false;
        if (inQ(x,y,{x:zx,y:zy,width:zw,height:zh})){
            if (y<zy+zr){
                if (x<zx+zr && inQ(x,y,{x:this.yxPOS[1][0],y:this.yxPOS[1][1],r:zr})){
                    p('左上');
                }else if (x>zx+zw-zr && inQ(x,y,{x:this.yxPOS[0][0],y:this.yxPOS[0][1],r:zr})){
                    p('右上');
                }else {
                    chuJie = true;
                }
            }else if(y>zy+zh-zr) {
                if (x<zx+zr && inQ(x,y,{x:this.yxPOS[2][0],y:this.yxPOS[2][1],r:zr})){
                    p('左下');
                }else if (x>zx+zw-zr && inQ(x,y,{x:this.yxPOS[3][0],y:this.yxPOS[3][1],r:zr})){
                    p('右下');
                }else {
                    chuJie = true;
                }
            }else {
                p('矩形内');
            }
        }else {
            chuJie = true;
        }
        
        if (chuJie){
            let nn = 0;
            for (let n in G.my_c){
                if ((G.my_c[n][1]==1)){
                    nn += 1;
                }
            }
            //p(nn);
            if (nn>G.pd_w){
                alt('水路上船只已满')
            }else {            
                G.my_c[t.attr.weizi][1] = 1;
                this.iniPaoChuan(1);
                //p(t.attr.weizi);
                G.dom['k_r_'+t.attr.weizi].dis = true;
                G.dom['k_c_'+t.attr.weizi].attr.mousemove = false;
                p('上跑道');
            }
            t.mx = t.attr.x;
	        t.my = t.attr.y;
        }else {
            
            let wz = 0;
            for (var i=1; i<=G.js_w; i++){
                if (!G.dom['kg_'+i].dis || (undefined!==G.my_c[i]&&G.my_c[i][1] == 1)){
                    //p(i+' - '+G.my_c[i]);
                    continue;;
                }            
                if (inQ(x,y,{x:G.dom['kg_'+i].attr.x, y:G.dom['kg_'+i].attr.y, width:G.dom['kg_'+i].attr.width, height:G.dom['kg_'+i].attr.height})){
                    wz = i;
                    break;
                }
            }
            p('判断位置 + '+wz);
            if (wz>0&&undefined===G.my_c[wz]){        
                let pos = this.chuan_xy(t.attr.chuan, G.dom['kg_'+wz].attr.x*bli2, G.dom['kg_'+wz].attr.y*bli2);

                G.dom['kg_'+wz].attr.nCurrImg = 0;
                G.dom['kg_'+t.attr.chuan].attr.nCurrImg = 2;
                G.my_c[wz] = G.my_c[t.attr.weizi];
                delete G.my_c[t.attr.weizi];
                
                G.dom['k_c_'+wz]= new MvChuan ('img','xg:1;zindex:1;src:'+G.imgDir+'c/'+G.my_c[wz][0]+'_2.png;chuan:'+G.my_c[wz][0]+';weizi:'+wz+';x:'+pos[0]+';y:'+pos[1]+';width:'+G.c[t.attr.chuan][1][0]+';height:'+G.c[t.attr.chuan][1][1]+';',{parent:that,click:function(){that.zhaoHui(wz);},mousemove:true});
                
                t.attr.del = true;
            }else if (wz>0&&undefined!==G.my_c[wz] && wz!==t.attr.weizi && t.attr.chuan==G.dom['k_c_'+wz].attr.chuan && undefined!== G.c[parseInt(t.attr.chuan)+1]){    //合成
                p('合成');

                //let pos = this.chuan_xy(t.attr.chuan, G.dom['kg_'+wz].attr.x, G.dom['kg_'+wz].attr.y);
                //G.dom['kg_'+wz].attr.nCurrImg = 0;

                t.mx = G.dom['k_c_'+wz].attr.x - 40*bli;
                t.my = G.dom['k_c_'+wz].attr.y;
                t.attr.opacity = 0.7;
                

                t.attr.xiaoshi = 1;
                G.dom['k_c_'+wz].attr.xiaoshi = 1;
                G.dom['k_c_'+wz].mx = G.dom['k_c_'+wz].attr.x + 40*bli;
                G.dom['k_c_'+wz].attr.opacity = 0.7;

                G.dom['kg_'+t.attr.weizi].attr.nCurrImg = 2;

                t.attr.zindex=2;
                G.dom['k_c_'+wz].attr.zindex = 2;

                G.dom['k_c_hc'] = G.dom['k_c_'+wz];

                delete G.my_c[t.attr.weizi];

                let c = parseInt(t.attr.chuan)+1;


                let pos = this.chuan_xy(c, G.dom['kg_'+wz].attr.x*bli2, G.dom['kg_'+wz].attr.y*bli2);            
                G.my_c[wz] = [c,0,0];

                G.dom['k_c_'+wz]= new MvChuan ('img','xg:1;zindex:1;src:'+G.imgDir+'c/'+c+'_2.png;chuan:'+c+';weizi:'+wz+';x:'+pos[0]+';y:'+pos[1]+';width:'+G.c[c][1][0]+';height:'+G.c[c][1][1]+';',{parent:that,click:function(){that.zhaoHui(wz);},mousemove:true});

                this.ckJieShuoChuan(c);
    
                //G.dom['k_c_'+wz]= new MvChuan ('img','xg:1;zindex:1;src:'+G.imgDir+'c/'+G.my_c[wz][0]+'_2.png;chuan:'+G.my_c[wz][0]+';weizi:'+wz+';x:'+pos[0]+';y:'+pos[1]+';width:'+G.c[t.attr.chuan][1][0]+';height:'+G.c[t.attr.chuan][1][1]+';',{parent:that,click:function(){that.zhaoHui(wz);},mousemove:true});

            }else {
                
                t.mx = t.attr.x;
                t.my = t.attr.y;
            }
        }
        for (var i=1; i<=G.js_w; i++){
            if (G.dom['kg_'+i].dis){ //移动
                if (undefined===G.my_c[i]){
                    G.dom['kg_'+i].attr.nCurrImg = 2;
                }else {                
                    G.dom['kg_'+i].attr.nCurrImg = 0;
                }
            }
        }
        G.iniDoms();
        G.updateData();
    }

    ckJieShuoChuan(c){   //判断是不是解锁新船
        if (undefined===G.js_c[c]){
            G.comm.jieShuo(c);
            G.js_c[c] = 1;
    
            if (G.pd_w < G.pd_max){
                G.pd_w += 1;
                G.dom.jsu_font.attr.text = this.paiChuanNum()+'/'+G.pd_w;
            }
            if (G.js_w < G.cw_z){
                G.js_w += 1;
                G.dom['kg_'+G.js_w].dis = true;
            }
            G.updateData();
        }        
    }
    setQian(n){
        G.money = G.money+n;
        if (n==0){
            this.setQianBian();
        }
    }
    setQianBian(){
        if (this.disMoney > G.money){
            this.disMoney = G.money;
        }
        G.dom.qian_font.attr.text   = mGS(this.disMoney);
        G.dom.jiaChuan_jb.attr.text = mGS(this.disMoney);
        ctx.font='bold 24px 微软雅黑';
        let w = ctx.measureText(this.disMoney).width;
        if (undefined!==G.dom['cm_jb_f']){
            G.dom.cm_jb_f.attr.text = mGS(this.disMoney);
        }        
        G.dom.qian_ixx.attr.x = ((ww-w*bli2)/2-70)*bli;

        ctx.font='12px 微软雅黑';
        w = ctx.measureText(G.money).width;
        G.dom.jiaChuan_ixx.attr.x = ((208-w*bli2)/2-28)*bli;
    }
    iniPaoChuan(m){
        var w = 0;
        for (let n in G.my_c){
            if (G.my_c[n][1] == 1 && n<=G.js_w){
                if (m==0 || G.my_c[n][2] == 0){
                    this.chuan_go(n, G.my_c[n][0]);
                    G.my_c[n][2] = 1;
                    G.dom['k_c_'+n].attr.opacity=0.6;
                    G.dom['kg_'+n].attr.opacity=0.6;
                }
                w += 1;
            }
        }
        G.dom.jsu_font.attr.text = w+'/'+G.pd_w;
    }
    paiChuanNum(){
        var w = 0;
        for (let n in G.my_c){
            if (G.my_c[n][1] == 1 && n<=G.js_w){
                w += 1;
            }
        }
        return w;
    }
    zhaoHui(n){
        //p(n);
        if (undefined===G.my_c[n]){
            alt('无游艇存在')
        }else {
            
            //G.dom['kg_'+n].attr.opacity = 1;
            //G.dom['k_c_'+n].attr.opacity = 1;
            //p(G.dom['k_c_'+n].attr);
            G.dom['k_c_'+n].attr.mousemove = true;
            G.dom['k_r_'+n].dis = false;
            if (undefined!==G.dom['go_'+n]){
                G.dom['go_'+n].attr.del = true;
                G.my_c[n][1] = 0;
                G.my_c[n][2] = 0;
                G.dom['k_c_'+n].attr.opacity=1;
                G.dom['kg_'+n].attr.opacity=1;
            }
            G.dom.jsu_font.attr.text = this.paiChuanNum()+'/'+G.pd_w;

            G.updateData();
        }
    }
    gg_jbi(n){   //过关显示金币
        //p(G.c[n]);
        this.setQian(G.c[n][4]);
        G.dom['go_'+now_m()] = new Da ('img','xg:1;src:'+G.imgDir+'zjb.png;x:690;y:646;width:86;height:90;');
        G.iniDoms();
    }

    sdJiaBei(n){    //加速
        //
    }

    chuan_go(w, n){
        let that = this;

        // attr.jd 一圈金币数 attr.sudu;速度值
        G.dom['go_'+w] = new Paochuan('img','src:'+G.imgDir+'c/'+n+'_0.png;x:'+(63-G.c[n][0][0]/2)+';y:'+(487-G.c[n][0][1]/2)+';chuan:'+n+';sudu:'+G.c[n][3]+';width:'+G.c[n][0][0]+';height:'+G.c[n][0][1]+';color:#FFF;',{t:that});
        G.iniDoms();

        //
    }
    chuan_xy(n,x,y){
        if (undefined!==G.c[n]){
            return[x-(G.c[n][1][0]-128)/2, y-(G.c[n][1][1]-80)-G.c[n][2]]
        }
        return [0,0];
    }

    hui_sou(){
        
    }
    jiaSu_2x(){
        G.comm.jiaSu();
    }
	
	play() {
        if (G.xslb==1 && G.d_chuan == 1 && now()-G.sc_time >= G.dc_time){
            G.sc_time = now();
            let awz = [];
            for (var i=1; i<=G.js_w; i++){
                if (undefined===G.my_c[i]){
                    awz.push(i);
                }
            }
            if (awz.length <= 0){
                p('已经没有船位');
            }else {
                let that = this;
                let c = rand(1,2);
                let n = awz[rand(0,awz.length)];
                p('位置'+n);
                let pos = that.chuan_xy(c,G.dom['kg_'+n].attr.x*bli2,G.dom['kg_'+n].attr.y*bli2);
                G.my_c[n] = [c,0,0];
                G.dom['k_c_'+n]= new MvChuan ('img','xg:1;zindex:1;src:'+G.imgDir+'c/'+c+'_2.png;endy:'+pos[1]*bli+';chuan:'+c+';weizi:'+n+';x:'+pos[0]+';y:0;width:'+G.c[c][1][0]+';height:'+G.c[c][1][1]+';',{parent:that,click:function(){that.zhaoHui(n);},mousemove:true});
                G.dom['k_c_'+n].attr.opacity = 0.5;
                G.dom['kg_'+n].attr.nCurrImg = 0;
                G.iniDoms();
                G.updateData();
            }
        }
        if (this.disMoney < G.money){
            if (this.AllMoney != G.money){
                this.AllMoney = G.money;
                this.JiaMoney = parseInt((G.money - this.disMoney)/20);
                if (this.JiaMoney <= 1){
                    this.JiaMoney = 1;
                }
            }
            this.disMoney += this.JiaMoney;
            this.setQianBian();
        }else if (this.disMoney > G.money){
            this.setQianBian();
        }
        
        if (G.js_true){ //加速中
            //G.js_time
            if (now()-G.js_time > G.js_miao){    //停加速
                //G.dom.su_time.dis = false;
                G.js_true = false;   //加速中？
                G.js_time = now();
                G.beiShu  = 1;
                for (var c in G.my_c){
                    if (G.my_c[c][1] == 1 && undefined!==G.dom['go_'+c]){
                        G.dom['go_'+c].tiaoShu();
                    }
                }
                post({'act':'lenQue'}, function (d) {});
                G.dom.sdu_font.attr.text = G.mm_sy+' / 秒';
                G.dom.su_time.attr.text = '冷却中..';
                G.js_lq_true = true;        //冷却中？
                G.js_lq_time = now();       //冷却开始时间
            }else {
                if (G.beiShu == 1){
                    G.beiShu = 2;
                    for (var c in G.my_c){
                        if (G.my_c[c][1] == 1 && undefined!==G.dom['go_'+c]){
                            G.dom['go_'+c].tiaoShu();
                        }
                    }
                }
                
                G.dom.su_time.attr.text = data_r(G.js_miao - (now()-G.js_time));
            }            
        }else if (G.js_lq_true){    //冷却中
            if (now()-G.js_lq_time > G.js_lq_miao){ //冷却结束
                G.dom.su_time.dis = false;
                G.js_lq_true = false;
            }else {
                G.dom.sdu_font.attr.text = G.mm_sy+' / 秒';
                G.dom.su_time.attr.text = '冷却中..';
            }
        }
        
        if (now() - G.up_time > 10){
            G.updateData();
        }
        
        

        G.iniBG();
        G.domShow();
		G.touchEvent();
		
	}
}