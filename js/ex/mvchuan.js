'use strict'	//增加一些元素的效果
import Dom from '../inc/dom'
import {p} from '../inc/func'

export default class MvChuan extends Dom {
    constructor(){
		if(arguments.length<=2){
			super(arguments[0],arguments[1]);
		}else {
			super(arguments[0],arguments[1],arguments[2]);
		}
        this.attr.xiaoshi = 0;
        this.attr.opacity = 1;
    }

	thMove(e,ckx,cky){
		p('have move');
		if(!this.kmove)return;
        this.mx = this.attr.x + (e.touches[0].clientX-ckx);
        this.my = this.attr.y + (e.touches[0].clientY-cky);        

		this.move = true;
        this.attr.parent.movePos(this.mx,this.my, this);
	}
	thMoveEnd(e){
		p('move end');
		this.move = false;
		if(!this.kmove)return;

        
        this.attr.parent.endMovePos(this.mx,this.my,this);

	}


	w(){
        if (this.attr.xiaoshi == 1){
            this.attr.opacity -= 0.03;
            if (this.attr.opacity <=0.1){
                this.attr.del = true;
            }
        }else if (undefined!==this.attr.endy){

            if (this.attr.y<parseFloat(this.attr.endy)){
                 this.attr.y += 15;
                 this.my = this.attr.y;
            }else {
                 this.attr.opacity = 1;
                 this.attr.y = parseFloat(this.attr.endy);
                 this.my = this.attr.y;
                 this.attr.py = this.attr.y;
                 delete this.attr.endy;
            }
        }
        
        super.w();
		//p('Btn w'); 
	}
}