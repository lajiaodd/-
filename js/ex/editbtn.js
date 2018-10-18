'use strict'	//增加一些元素的效果
import Dom from '../inc/dom'
import {p,bli} from '../inc/func'

export default class Editbtn extends Dom {
    constructor(t){
		if(arguments.length<=2){
			super(arguments[0],arguments[1]);
		}else {
			super(arguments[0],arguments[1],arguments[2]);
		}
        this.Big = false;
    }
	
	thMove(e,ckx,cky){
		//p('have move');
		if(!this.kmove)return;

        this.mx = this.attr.x + (e.touches[0].clientX-ckx);
        this.my = this.attr.y + (e.touches[0].clientY-cky);        

        if (!this.Big){
            this.attr.width = this.attr.parent.geW*this.attr.h*bli;
            this.attr.height = this.attr.parent.geH*this.attr.s*bli;
            this.Big = true;
        }
		this.move = true;
        this.attr.parent.movePos(this.mx,this.my, this);
	}
	thMoveEnd(e){
		//p('move end');
		this.move = false;
		if(!this.kmove)return;
		/*if (this.attr.overflow){
			this.attr.offset.y = this.my;
			this.attr.offset.x = this.mx;
			if (this.attr.ofx==2){
				if (this.attr.offset.y - this.attr.y > 0){
					this.attr.offset.y = this.attr.y;
				}else if(this.attr.offset.y + this.attr.offset.h < this.attr.height+this.attr.y -10){
					this.attr.offset.y = this.attr.height+this.attr.y -10 - this.attr.offset.h;
				}
				this.my = this.attr.offset.y;
			}
			
		}else {
			this.attr.x = this.mx;
			this.attr.y = this.my;
		}*/


        if (this.Big){
            this.attr.width = this.attr.parent.geW*this.attr.h*bli*this.attr.parent.sxx;
            this.attr.height = this.attr.parent.geH*this.attr.s*bli*this.attr.parent.sxx;

            this.Big = false;
        }

        this.mx = this.attr.x;
	    this.my = this.attr.y;
        
        this.attr.parent.addPos(this.attr.tuk);

	}

	w(){
		super.w();
	}
}