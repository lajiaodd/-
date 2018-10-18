'use strict'
import Dom from '../inc/dom'
import Xg from '../ex/xg'
import Dongtu from '../ex/dongtu'
import {p,ww,wh,rand,now,post,inQ} from '../inc/func'

export default class Index {
    constructor(){
        let that = this;    
        let h = 1624;
        if (wh>h){
            h = '100%';
        }
		G.dom.bg    = new Dom('img','src:'+G.imgDir+'bg.jpg;x:0;y:0;width:100%;height:'+h+';');
        G.dom.start = new Xg('img','xg:1;src:'+G.imgDir+'start_btn.png;x:'+(ww-366)/2+';y:763;width:366;height:128;',{click:function(){that.start();}});
        G.dom.more  = new Xg('img','xg:1;src:'+G.imgDir+'more_btn.png;x:'+(ww-280)/2+';y:931;width:280;height:98;',{dis:false,click:function(){G.goAPPID();}});


		G.getConfig(0);
		G.bindLoop = this.index.bind(G);    
    }
    start(){
        G.goPage('play');
    }
    more(){
        //
    }
    index(){
        this.iniBG();
        //this.indexBG(this.nX, this.nY);
		this.domShow();

		this.touchEvent();
    }

}