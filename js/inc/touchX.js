'use strict'
import {p,rand,now,post,inQ} from './func'
export default class Touch {
    constructor(parents){
		this.parent   = parents;
        this.hasMove  = false;
        this.numMove  = 0;
	}
	touchEvent(i){
		if (i==0){ //取消
			//p('remove touch.');
			touchHandler   && canvas.removeEventListener('touchstart', touchHandler);
			touchMVHandler && canvas.removeEventListener('touchmove', touchMVHandler);
			touchEDHandler && canvas.removeEventListener('touchend', touchEDHandler);
			hasEventBind = false;
		}else if(!hasEventBind){
			//p('add touch.');
			hasEventBind   = true;
			touchHandler   = this.touchStart.bind(this);
			touchMVHandler = this.touchMove.bind(this);
			touchEDHandler = this.touchEnd.bind(this);
			canvas.addEventListener('touchstart', touchHandler);
			canvas.addEventListener('touchmove', touchMVHandler);
			canvas.addEventListener('touchend', touchEDHandler);
		}
	}
	touchEnd(e) {
		//p('touchEnd');
		e.preventDefault();
		//p(this.moveDom.move);
        if (this.hasMove && undefined !== this.moveDom && undefined !== this.moveDom.attr) {
			if(this.moveDom.move){
				this.moveDom.thMoveEnd(e);
			}
			this.moveDom.ckXG(0);
        }else if(undefined !== this.clickDom && undefined !== this.clickDom.attr &&  this.clickDom.attr.click){
			//todo判断上一层有没有其它元素
			if (inQ(e.changedTouches[0].pageX, e.changedTouches[0].pageY, this.clickPos.d, this.clickPos.kz)) {
				this.clickDom.attr.click(this.clickDom);
			}
			this.clickDom.ckXG(0);
		}
        this.moveDom  = {};
        this.clickDom = {};
        this.clickPos = {};
	}
	touchMove(e) {
		//p('touchMove');
        e.preventDefault();
        if (this.numMove >= 2){
            this.hasMove = true;
        }else {
            this.numMove += 1;
        }        
		
        if (this.hasMove && undefined !== this.moveDom && undefined !== this.moveDom.attr) {
            if (undefined!==this.clickDom){
                this.clickDom.ckXG(0);
                this.clickDom = undefined;                
            }
            this.moveDom.thMove(e, this.movePos.x, this.movePos.y);
        }else if(undefined !== this.clickDom && undefined !== this.clickDom.attr &&  this.clickDom.attr.click){
			if (inQ(e.touches[0].clientX, e.touches[0].clientY, this.clickPos.d, this.clickPos.kz)){
				this.clickDom.ckXG(2);
			}else {
				this.clickDom.ckXG(3);
			}
		}
	}
    touchStart(e) {
        //p('touchStart');
        e.preventDefault()
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        this.hasMove  = false;
        this.moveDom  = undefined;
        this.clickDom = undefined;
        this.clickPos = { x: x, y: y ,d:{},kz:{}};
        this.movePos  = { x: x, y: y ,d:{},kz:{}};
        this.click_mv = true;  //点击后，它父是否为可动
        this.numMove  = 0; 

		//p(G.dom);
        for (var i = G.doms.length - 1; i >= 0; i--) {
           
            if (G.dom[G.doms[i]].dis && G.dom[G.doms[i]].fdis && ((this.moveDom===undefined && this.clickDom===undefined &&G.dom[G.doms[i]].attr.click) || (this.moveDom===undefined &&G.dom[G.doms[i]].attr.mousemove && this.click_mv))) {
				//p(G.doms[i]);
                var dom1 = G.dom[G.doms[i]];
                var kz = 0;
                if (undefined != dom1.attr.r) {
                    var d = { x: dom1.attr.x, y: dom1.attr.y, r: dom1.attr.r, width: 0, height: 0 }
                } else {
                    var d = { x: dom1.attr.x, y: dom1.attr.y, width: dom1.attr.width, height: dom1.attr.height }
                }
                if (undefined != dom1.attr.f) {
                    let o = dom1;
                    while (true) {
                        if(o.attr.f.attr.mousemove){
                            d.x += o.attr.f.mx;
                            d.y += o.attr.f.my;
                        }else {
                            d.x += o.attr.f.attr.x;
                            d.y += o.attr.f.attr.y;
                        }
                        if (undefined === o.attr.f.attr.f) {
                            break;
                        } else {
                            o = o.attr.f;
                        }
                    }
                }                
                if (undefined != dom1.attr.line && dom1.attr.line > 1) {
                    kz = parseInt(dom1.attr.line / 2);
                }
				//p(d);
                if (inQ(x, y, d, kz)) {
                    if (d.height != this.wh && !dom1.attr.mousemove && dom1.attr.clickSY) {
                        this.music.ck(this.syin);		//点击声音
                    }
                    if (dom1.attr.mousemove && dom1.kmove){
						p('moveDom start ' + G.doms[i]);
						this.moveDom = dom1;
						dom1.ckXG(1);	
                    } else {
                        if (undefined != dom1.attr.f) {
                            let o = dom1;
                            let d = o.attr.f;
                            let ok= true;
                            while (true) {
                                //判断有没有在父窗内                                
                                if (d.attr.overflow){    //有超出隐藏
                                    if (undefined != d.attr.r) {
                                        var fd = { x: d.attr.x, y: d.attr.y, r: d.attr.r, width: 0, height: 0 }
                                    } else {
                                        var fd = { x: d.attr.x, y: d.attr.y, width: d.attr.width, height: d.attr.height }
                                    }
                                    if(!inQ(x, y, fd, 0)){
                                        ok= false;
                                        break;
                                    }
                                }
                                if (undefined === d.attr.f) {
                                    break;
                                } else {
                                    o = d;
                                    d = d.attr.f;
                                }
                            }
                            if (!ok){
                                continue;
                            }                            
                        }else {
                            this.click_mv = false;
                        }
                        //p(d);
                        //p(G.doms[i]);
                        p('clickDom start ' + G.doms[i]);
                        this.clickDom = dom1;
						this.clickPos = {d:d,kz:kz};

                        //p(this.clickDom);
						dom1.ckXG(1,x,y);						
                        //dom1.attr.click(dom1);
                    }
                    //break;
                }
            }
        }
    }
	

    ordThEnd(e) { //放手
        if (undefined !== this.moveDom && undefined !== this.moveDom.attr && this.moveDom.move) {
            e.preventDefault()
            this.moveDom.thMoveEnd(e);
        }
    }
    ordMove(e) {
        if (undefined !== this.moveDom && undefined !== this.moveDom.attr) {         
            e.preventDefault()
            this.moveDom.thMove(e, this.movePos.x, this.movePos.y);
        }
    }

}