'use strict'	//增加一些元素的效果
import Dom from '../inc/dom'
import {p,bli} from '../inc/func'
export default class Xg extends Dom {
    constructor(t){
		if(arguments.length<=2){
			super(arguments[0],arguments[1]);
		}else {
			super(arguments[0],arguments[1],arguments[2]);
		}

		if(undefined === this.attr.xg){
			this.attr.xg = 0;
		}
		this.attr.imgsOK   = false;		//是否已经设置好图片
		this.attr.nCurrImg = 0;
		this.attr.imgsList = {};

		if (undefined!==this.attr.imgs){
			this.attr.imgsList[0] = [];
			this.attr.imgsList[0].push(this.attr.img);

			for (var im in this.attr.imgs){
				this.attr.imgsList[im] = [];
				if (undefined === this.attr.imgs[im].min){	//单图
					
					//let img = new Image();
					//img.src = this.attr.imgs[im].dir;		
					//this.attr.imgsList[im].push(img);
					this.attr.imgsList[im].push(getImgLoad(this.attr.imgs[im].dir));

					this.attr.imgs[im].n = 0;
				}else {
					for (var i=parseInt(this.attr.imgs[im].min); i<=parseInt(this.attr.imgs[im].max); i++){
						this.attr.imgsList[im].push(getImgLoad(this.attr.imgs[im].dir.replace(/^(.*?)%(.*?)$/,'$1'+i+'$2')));

						//let img = new Image();
						//img.src = this.attr.imgs[im].dir.replace(/^(.*?)%(.*?)$/,'$1'+i+'$2');
						//this.attr.imgsList[im].push(img)
					}
					this.attr.imgs[im].n   = this.attr.imgs[im].min;
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

		if (undefined!==this.attr.mvx || undefined!==this.attr.mvy){
			this.kmove = true;
		}
    }
	
	ckXG(i){	//点击效果        
		if (this.attr.xg != 1){
			return;
		}		
		if (i==1){
			this.ckCK = true;
			if(undefined !== this.attr.xg){	//开始
				this.xg_attr = this.xgAttr(this.attr.xg,1);
				//p(this.xg_attr);
			}
		}else if(i==0){	//释放
			this.ckCK = false; 
			if(undefined !== this.attr.xg){
				this.xg_attr = {};
			}
		}else if(i==2){	//dom内移动
			this.xg_attr = this.xgAttr(this.attr.xg,1);
		}else if(i==3){	//dom外移动
			this.xg_attr = {};
		}
	}

	setImgCurr(n){	//设置使用哪一组图
		if (n <= 0){
			this.attr.img = this.attr.imgsList[0];
		}else if (undefined!==this.attr.imgsList[n]){
			this.attr.imgsOK = true;
			this.attr.nCurrImg = 1;
		}
		
	}
	xgAttr(i,j){
		switch(i){
			case 1:	//缩放	xg:1;
				if (j == 1){
					var sx=this.attr.width*0.1,sy=this.attr.height/this.attr.width*sx; //伸缩值
					return {x:this.attr.x+sx/2, y:this.attr.y+sy/2, mx:this.attr.x+sx/2, my:this.attr.y+sy/2, width:this.attr.width-sx, height:this.attr.height-sy};
				}
				break;
			case 2:	//动态图片 imgs:{dir:'images/explosion%.png',min:1,max:19},imgsOK:false;
				
				if (this.attr.imgsList[this.attr.nCurrImg].length == 1){	//单图不用整天赋值
					this.attr.imgsOK = true;
					this.img = this.attr.imgsList[this.attr.nCurrImg][0];
				}else if (this.attr.imgsList[this.attr.nCurrImg].length > 0){	//多切不停切换
					
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
				break;
			case 3:	//移动	xg:2;mvx:1;mvy:-1;outcl:0 
				if (this.kmove && !this.move && (undefined!==this.attr.mvx||undefined!==this.attr.mvy)){	//x方向
					if (undefined!==this.attr.mvx){
						this.attr.x += parseFloat(this.attr.mvx);
						this.mx = this.attr.x;
					}
					if (undefined!==this.attr.mvy){
						this.attr.y += parseFloat(this.attr.mvy);
						this.my = this.attr.y;
					}
					if (undefined!==this.attr.mvx && this.attr.mvx > 0 && this.attr.x > window.innerWidth){
						if (this.attr.outcl == 1){
							this.attr.x = 0-this.attr.width;
						}else if(this.attr.outcl == 2){
							this.attr.del = true;
						}else{
							this.dis = false;
						}
					}else if(undefined!==this.attr.mvx && this.attr.mvx < 0 && this.attr.x+this.attr.width < 0){
						if (this.attr.outcl == 1){
							this.attr.x = window.innerWidth;
						}else if(this.attr.outcl == 2){
							this.attr.del = true;
						}else{
							this.dis = false;
						}
					}else if (undefined!==this.attr.mvy && this.attr.mvy > 0 && this.attr.y > window.innerHeight){
						if (this.attr.outcl == 1){
							this.attr.y = 0-this.attr.height;
						}else if(this.attr.outcl == 2){
							this.attr.del = true;
						}else{
							this.dis = false;
						}
					}else if(undefined!==this.attr.mvy && this.attr.mvy < 0 && this.attr.y+this.attr.height < 0){
						if (this.attr.outcl == 1){
							this.attr.y = window.innerHeight;
						}else if(this.attr.outcl == 2){
							this.attr.del = true;
						}else{
							this.dis = false;
						}
					}
				}
				break;
			case 4:	//
				break;
			case 5:	//
				break;
		}
	}

	w(){
		//p(111);
		this.xgAttr(this.attr.xg,0);
		//p(this.attr.imgsOK);

		if (!this.attr.imgsOK && this.attr.nCurrImg > 0 && undefined!==this.attr.imgsList[this.attr.nCurrImg]){
			this.xgAttr(2,0);
		}
		
		super.w();
		//p('Btn w'); 
	}
}