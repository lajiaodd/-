'use strict'	//增加一些元素的效果
import Dom from '../inc/dom'
import {p} from '../inc/func'

export default class Dongtu extends Dom {
    constructor(){
		if(arguments.length<=2){
			super(arguments[0],arguments[1]);
		}else {
			super(arguments[0],arguments[1],arguments[2]);
		}

		this.attr.imgsOK   = true;		//是否已经设置好图片
		this.attr.nCurrImg = 0;
		this.attr.imgsList = {};
		this.dongsu = 10;
        this.kdongsu= this.dongsu;
		if (undefined!==this.attr.imgs){
			this.attr.imgsList[0] = [];
			this.attr.imgsList[0].push(this.attr.img);

			for (var im in this.attr.imgs){
				this.attr.imgsList[im] = {};
				if (undefined === this.attr.imgs[im].min){	//单图
					
					//let img = new Image();
					//img.src = this.attr.imgs[im].dir;		
					//this.attr.imgsList[im].push(img);
					this.attr.imgsList[im][0] = getImgLoad(this.attr.imgs[im].dir);
					
					this.attr.imgs[im].len = 1
					this.attr.imgs[im].n   = 0;
				}else {
					for (var i=parseInt(this.attr.imgs[im].min); i<=parseInt(this.attr.imgs[im].max); i++){
						this.attr.imgsList[im][i] = getImgLoad(this.attr.imgs[im].dir.replace(/^(.*?)%(.*?)$/,'$1'+i+'$2'));
						this.attr.imgs[im].len   += 1;
						//let img = new Image();
						//img.src = this.attr.imgs[im].dir.replace(/^(.*?)%(.*?)$/,'$1'+i+'$2');
						//this.attr.imgsList[im].push(img)
					}
					this.attr.imgs[im].len = this.attr.imgs[im].max - this.attr.imgs[im].min+1;
					this.attr.imgs[im].n   = this.attr.imgs[im].min;
					//p(this.attr.imgs[im]);
				}
			}
			/*for (var i=parseInt(this.attr.imgs.min); i<=parseInt(this.attr.imgs.max); i++){
				let img = new Image();
				img.src = this.attr.imgs.dir.replace(/^(.*?)%(.*?)$/,'$1'+i+'$2');
				this.attr.imgsList.push(img)
			}
			//this.attr.imgs.old = this.img; //是否需要保存原图
			this.attr.imgs.n   = this.attr.imgs.min;
			*/
		}

        //p(this.attr.imgs);
    }
	
	xgAttr(){
		if (this.attr.imgs[this.attr.nCurrImg].len == 1){	//单图不用整天赋值
			this.attr.imgsOK = true;
			this.img = this.attr.imgsList[this.attr.nCurrImg][0];
		}else if (this.attr.imgs[this.attr.nCurrImg].len > 0){	//多图不停切换
            
			if (this.attr.imgs[this.attr.nCurrImg].n <= this.attr.imgs[this.attr.nCurrImg].max){
				//this.loadok = false;
				this.img = this.attr.imgsList[this.attr.nCurrImg][this.attr.imgs[this.attr.nCurrImg].n];

				this.attr.imgs[this.attr.nCurrImg].n += 1;
				if (this.attr.imgs[this.attr.nCurrImg].n > this.attr.imgs[this.attr.nCurrImg].max && undefined!==this.attr.imgs[this.attr.nCurrImg].loop && this.attr.imgs[this.attr.nCurrImg].loop){
					this.attr.imgs[this.attr.nCurrImg].n = this.attr.imgs[this.attr.nCurrImg].min;
				}
				//if (this.attr.y > 300){
				//	this.attr.imgs[this.attr.nCurrImg].n = this.attr.imgs[this.attr.nCurrImg].max + 1;
				//}
			}else {
				for (var o in this.attr.imgs[this.attr.nCurrImg].ok){
					if(o == 'func'){
						this.attr.imgs[this.attr.nCurrImg].ok[o]();
					}else  {
						this.attr[o] = this.attr.imgs[this.attr.nCurrImg].ok[o];
					}
				}
				//this.attr.imgs.n = this.attr.imgs.min;
				//this.img = this.attr.imgs.old;
				//this.attr.this.attr.nCurrImg = 0; = false;
			}
		}
	}
	w(){
		this.kdongsu -= 1;
		if (this.kdongsu<=0){
			this.xgAttr();
			this.kdongsu= this.dongsu;
		}        
		super.w();
		//p('Btn w'); 
	}
}