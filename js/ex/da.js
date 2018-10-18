'use strict'	//变大至消失
import Dom from '../inc/dom'
import {p,bli} from '../inc/func'

export default class Da extends Dom {
    constructor(t){
		if(arguments.length<=2){
			super(arguments[0],arguments[1]);
		}else {
			super(arguments[0],arguments[1],arguments[2]);
		}
        this.oWidth  = this.attr.width;
        this.oHeight = this.attr.height;
        this.x = this.attr.x;
        this.y = this.attr.y;

        this.ntime = 50;
        this.ctime = this.ntime;
        this.attr.width  = 0;
        this.attr.height = 1* this.oWidth/this.oHeight;


    }
    cgWH(){
        this.attr.width += 5;
        this.attr.height = this.attr.width * this.oHeight/ this.oWidth;
        if (this.attr.width > this.oWidth){
            this.attr.width = this.oWidth;
            this.ctime -= 1;
            if (this.ctime <= 0){
                this.attr.del = true;
            }else {
                this.attr.opacity = this.ctime/this.ntime;
            }
        }
        this.attr.height = this.attr.width * this.oHeight/ this.oWidth;
        this.attr.x = this.x - this.attr.width/2;
        this.attr.y = this.y - this.attr.height/2;
    }

	w(){
        this.cgWH();
		super.w();
	}
}