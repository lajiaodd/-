'use strict'	//增加一些元素的效果
import Dom from '../inc/dom'
import {p,bli} from '../inc/func'

export default class Move extends Dom {
    constructor(t){
		if(arguments.length<=2){
			super(arguments[0],arguments[1]);
		}else {
			super(arguments[0],arguments[1],arguments[2]);
		}
    }
	ckXG(){  //点下
        if(this.attr.pdom.delBtn){
            this.attr.del = true;
            //p(this.attr.pdom.delBtn);
            //p(this.attr.tuk);
            delete this.attr.pdom.map[this.attr.tuk];
            //p(this.attr.pdom.map)
        }

    }
	thMove(e,ckx,cky){
        
		//p('have move');
		if(!this.kmove || this.attr.pdom.guenDong || !this.attr.mv)return;
		if (this.attr.movexy == 'x'){
			let mx = this.attr.x + (e.touches[0].clientX-ckx);
			if (mx>this.attr.max*bli){
				mx = this.attr.max*bli;
			}else if(mx < this.attr.min*bli){
				mx = this.attr.min*bli;
			}
			this.mx = mx;

	/*
				if (undefined!==this.xg_attr && undefined!==this.xg_attr.mx){
				this.xg_attr.mx = this.xg_attr.x + (e.touches[0].clientX-ckx);
				this.xg_attr.my = this.xg_attr.y + (e.touches[0].clientY-cky);
			}
			this.mx = this.attr.x + (e.touches[0].clientX-ckx);
			this.my = this.attr.y + (e.touches[0].clientY-cky);
			*/

		}else {	//y
			let my = this.attr.y + (e.touches[0].clientY-cky);
			if (my>this.attr.max*bli){
				my = this.attr.max*bli;
			}else if(my < this.attr.min*bli){
				my = this.attr.min*bli;
			}
			this.my = my;
		}
		this.move = true;
	}
	thMoveEnd(e){
		//p('move end');
		this.move = false;
		if(!this.kmove|| !this.attr.mv)return;
		if (this.attr.overflow){
			this.attr.offset.y = this.my;
			this.attr.offset.x = this.mx;
			
		}else {
			this.attr.x = this.mx;
			this.attr.y = this.my;
		}

		this.attr.pdom.moveEnd(this);
	}


	w(){
		super.w();
	}
}