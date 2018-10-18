'use strict'
import {p,bli,ww,wh} from './func'
export default class dom {
    constructor(t) {
        //type: img font div arc line
        //pos w: x y w h r color background src border
		this.attr = {};
		this.rpx = bli;
		this.px  = 1+ window.innerWidth / 375;
		this.attr.mousemove = false;
		this.attr.click     = false;
		this.attr.del       = false;	//是否消毁
		this.attr.clicksy   = true;		//按扭声音
		this.attr.overflow  = false;
		this.attr.out		= false;	//是否不在指定区域
		this.attr.offset    = {x:0,y:0,w:0,h:0}		//隐藏区域位置
        
        this.attr.zindex	= 0;

		this.attr.outcl     = 0; //0不输出 1另一头又出来  2销毁

		this.xg_attr = {};	//效果属性,点击/划动效果
		this.oattr   = {};	//变换附加属性(如1-width:23; 2-width:30;); sAttr(1);
		this.nattr   = 0 ;	

		this.kmove = false; //可动态控制 是否可移动
		this.move  = false; //有在移动
		this.ckCK  = false; //这次点击已判断

        
		this.attr.zj = 0;	//默认转角0
		this.v1 = '';
		this.v2 = '';
		this.liuhai = (window.innerHeight/window.innerWidth)>1.9?90*bli:0;

		

		if (arguments.length>=2){
			this.dis  = true;
			this.fdis = true; //父窗隐藏否

			this.ty  = arguments[0].toLowerCase();
			this.v1 = arguments[1];
			this.v2 = arguments[2];
			this.iniDom();
			if (this.attr.mousemove){ //支持移动
				this.kmove= true;
				this.move = false;
				this.mx = this.attr.x;
				this.my = this.attr.y;
			}
			if (this.attr.overflow){ //滚动方向 0全向,1 x ,2 y
				if (undefined===this.attr.ofx){	
					this.attr.ofx = 0;
				}
			}
			if (undefined != this.attr.f){
				if (this.attr.f.attr.overflow && this.attr.f.attr.offset.h < this.attr.y+this.attr.height){
					this.attr.f.attr.offset.h = this.attr.y+this.attr.height;
				}
			}
		}else {
			this.dis = false;
		}

		this.attr.px = this.attr.x;	//实际坐标
		this.attr.py = this.attr.y;
		
		

		//this.outWin = false;	//是否在窗外
		
		/*arc[2] 
		f:上级 
		text:文本
		mousemove:true随鼠标移动
		noOut:true不出此框
		click:true点击
		overflow:true,超出隐藏
		zongli:true  重力
		zongliNum:23 重力值
		fantan:true  反弹
		zudang:true  阻挡否
		chili:true   带磁力
		hover:''	 点击后的样式
		*/
        //this.img = new Image()
        //this.img.src = imgSrc

        //this.width = w
        //this.height = h
        //this.x = x
        //this.y = y
    }
	
	iniDom(){
		let v = this.v1, v2 = this.v2;
		if (v=='' && undefined==v2){
			this.dis = false;
			return;
		}
		if (v!=''){
			var ar = (v+';').match(/(\d+\-)?[a-z_]+:[^;]*?;/ig);
			for(var n in  ar){
				var ax =/^((\d+)\-)?([a-z_]+):([^;]*?);/i.exec(ar[n]);
				if(null!==ax){
					let atr = '';
					ax[3] = ax[3].toLowerCase();
					if(undefined===ax[2] && ax[3].toLowerCase() == 'src' && this.ty == 'img'){
						if(ax[4]==''){
							this.dis = false;
						}else {
							this.loadok = false;
							//this.img = new Image()
							//this.img.src = ax[4];
							this.img = getImgLoad(ax[4]);
						}
					}else if(ax[3].toLowerCase() == 'font'){
						let fontsize = ax[4].replace(/^.*?([\d\.]+)rpx.*?$/,'$1');
						if(/^[\d\.]+$/.test(fontsize)){
							ax[4] = ax[4].replace(/(\d+)rpx/,parseInt(parseInt(fontsize)*this.rpx*this.px)+'px');
						}else {
							let fontsize = ax[4].replace(/^.*?([\d\.]+)px.*?$/,'$1');
							if(/^[\d\.]+$/.test(fontsize)){
								ax[4] = ax[4].replace(/(\d+)px/,parseInt(parseInt(fontsize)*this.px)+'px');
							}
						}
						atr = ax[4].toLowerCase();
					}else if (/^\d{1,10}$/.test(ax[4])){
						ax[4] = ax[4].toLowerCase();
						atr = parseInt(ax[4]);
					}else if (/^(x|y|yuan|width|height|z)$/.test(ax[3])){
						if ('center'==ax[4]){
                            atr = 'center';
						}else if (/^[^-\d]/.test(ax[4])){
							atr = 0;
						}else if (/%$/.test(ax[4])){
							atr = ax[4];
						}else {
							ax[4] = ax[4].toLowerCase();				
							atr = parseFloat(ax[4]);
						}
					}else {
						ax[4] = ax[4].toLowerCase();
						atr = ax[4];
					}
					if (undefined===ax[2]){
						this.attr[ax[3]] = atr;
					}else {
						if (undefined === this.oattr[ax[2]]){
							this.oattr[ax[2]] = {}
						}						
						this.oattr[ax[2]][ax[3]] = atr;
					}
				}
			}
			let aBliAttr = ['x','y','width','height'];
			for (let i=0;i<aBliAttr.length;i++){
                if (aBliAttr[i]=='x'&& this.attr[aBliAttr[i]]=='center'){
                    this.attr[aBliAttr[i]] = (ww-this.attr['width'])/2*bli;
                }else if (aBliAttr[i]=='y'&& this.attr[aBliAttr[i]]=='center'){
                    this.attr[aBliAttr[i]] = (wh-this.attr['height'])/2*bli;
                }else if (undefined!==this.attr[aBliAttr[i]] && /^[\d\.]+$/.test(this.attr[aBliAttr[i]])){
					this.attr[aBliAttr[i]] *= bli;
				}
			}
			for (let i=0;i<aBliAttr.length;i++){
				if (undefined!==this.oattr[aBliAttr[i]] && /^[\d\.]+$/.test(this.oattr[aBliAttr[i]])){
					this.oattr[aBliAttr[i]] *= bli; 
				}
			}
			if (undefined!==this.attr.width && this.attr.width=='100%'){
				this.attr.width=window.innerWidth;
			}
			if (undefined!==this.attr.height && this.attr.height=='100%'){
				this.attr.height=window.innerHeight;
			}
		}
		if (undefined!=v2){
			for (var atr in v2){
				if(undefined!==this[atr]){
					this[atr] = v2[atr];
				}else {
					this.attr[atr] = v2[atr];
				}
			}
		}


		if (this.liuhai > 0 && this.attr.y > 0 && undefined === this.attr.f){
			this.attr.y += this.liuhai;
		}
		
		//p(this.oattr);
	}
	
	thMove(e,ckx,cky){
		//p('have move');
		if(!this.kmove)return;
		if (this.attr.overflow){
			if (!this.move){
				this.attr.offset.y = this.my;
				this.attr.offset.x = this.mx;
			}
			if(this.attr.ofx==0||this.attr.ofx==2)this.my = this.attr.offset.y + (e.touches[0].clientY-cky);
			if(this.attr.ofx==0||this.attr.ofx==1)this.mx = this.attr.offset.x + (e.touches[0].clientX-ckx);
		}else {
			if (undefined!==this.xg_attr && undefined!==this.xg_attr.mx){
				this.xg_attr.mx = this.xg_attr.x + (e.touches[0].clientX-ckx);
				this.xg_attr.my = this.xg_attr.y + (e.touches[0].clientY-cky);
			}
			this.mx = this.attr.x + (e.touches[0].clientX-ckx);
			this.my = this.attr.y + (e.touches[0].clientY-cky);

		}
		this.move = true;
	}
	thMoveEnd(e){
		//p('move end');
		this.move = false;
		if(!this.kmove)return;
		if (this.attr.overflow){
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
		}
	}

	sAttr(n){
		if (this.nattr == n){
			return;
		}
		this.iniDom(); //初始最开始属性
		if (n>0 && undefined != this.oattr[n]){
			for (let art in this.oattr[n]){				
				this.attr[art] = this.oattr[n][art];
				if (art == 'src'){
					this.sSrc(this.oattr[n][art]);
				}
			}
		}
		this.nattr = n;
		//else if(n==0 && this.attr.src!=''){
		//	this.sSrc(this.attr.src);
		//}
	}
	sSrc(src){
		if (this.ty == 'img'){
			this.loadok = false;
			//this.img = new Image();
			//this.img.src = src;
			this.img = getImgLoad(src);
		}
	}
	ckXG(i){
		if(i == 1){
			this.ckCK = true;
		}else {
			this.ckCK = false;
		}
	}
    w(){    //绘到ctx上
		if (!this.dis || !this.fdis) return;
		let that = this;
		var at   = {};
		for (var k in this.attr){ //此方式不对源修改  var at=this.attr
			at[k] = this.attr[k];
		}
		for (var nXG in this.xg_attr){
			at[nXG] = this.xg_attr[nXG];
		}
		
		let ax = at.x; 
		let ay = at.y;
		if (at.mousemove && !at.overflow){
			if (undefined!==this.xg_attr && undefined!==this.xg_attr.mx){
				ax = this.xg_attr.mx;
				ay = this.xg_attr.my;
			}else {
				ax = this.mx;
				ay = this.my;
			}
		}
		
		//todo判断是否已经出窗口，出的话不画
		if (undefined!=at.f){
			if (undefined !== at.f.attr.f){
				this.fdis = at.f.fdis;
			}else {			
				this.fdis = at.f.dis;
			}
			let fq = at.f
			if(at.f.attr.mousemove){
				ax = ax+ at.f.mx;
				ay = ay+ at.f.my;
			}else {
				ax += fq.attr.px;
				ay += fq.attr.py;

				/*while(true){
					if (fq.attr.overflow){
						ax += fq.attr.offset.x;
						ay += fq.attr.offset.y;
					}else {					
						ax += fq.attr.x;
						ay += fq.attr.y;
					}
					if (undefined !== fq.attr.f){
						fq = at.f
					}
					/*else {
						break;
					}*/					
				//}
			}

			this.attr.px = ax;
			this.attr.py = ay;
			//at.px = ax;
			//at.py = ay;
		}

		
		if(!clip && undefined!=at.f && at.f.attr.overflow){ //clip 只裁切一次
			clip = true;
			ctx.save();
			ctx.beginPath();
			ctx.rect(at.f.attr.x,at.f.attr.y,at.f.attr.width,at.f.attr.height);
			ctx.clip();
		}
		if(clip && (undefined==at.f||!at.f.attr.overflow)){
			clip = false;
			ctx.restore(); 
		}	
	
		switch(this.ty){
			case 'img':
                if(at.opacity!==undefined)  ctx.globalAlpha=at.opacity;
				if (undefined===that.img || ''==that.img.src){
					break;
				}
				if (that.loadok){
					
					if (at.yuan!==undefined){
						ctx.save();
						ctx.arc(ax+at.yuan,ay+at.yuan,at.yuan,0,2*Math.PI);
						ctx.clip();						
					}
					if(at.mv!==undefined){ //移动
						ax += at.mv/10;
						if (ax > window.innerWidth){
							ax = 0-at.width;
						}
						at.x = ax;
					}
					if(at.z!==undefined && at.z > 0){ //中心旋转
                        
						ctx.save();
						ctx.translate(ax +at.width/2, ay +at.height/2);
						ctx.rotate(that.attr.zj*(Math.PI/180));
						if (undefined !== at.p_x && undefined !== at.p_y){
							ctx.drawImage(that.img,at.p_x, at.p_y, at.p_w, at.p_h, -at.width/2,-at.height/2,at.width,at.height);
						}else {							
							ctx.drawImage(that.img,-at.width/2,-at.height/2,at.width,at.height);

							//ctx.drawImage(that.img,-at.width/2,-at.height/2,at.width,at.height);
						}
						that.attr.zj += at.z/10;
                    
					}else if(at.zjd!==undefined){ //转角度

                        ctx.save();
                        ctx.translate(ax +at.width/2, ay +at.height/2)
                        ctx.rotate(at.zjd*(Math.PI/180));

                        if (undefined !== at.p_x && undefined !== at.p_y){
							ctx.drawImage(that.img,at.p_x, at.p_y, at.p_w, at.p_h, -at.width/2,-at.height/2,at.width,at.height);
						}else {							
							ctx.drawImage(that.img,-at.width/2,-at.height/2,at.width,at.height);
						}
    
                    }else if(at.bzpos!==undefined && at.bzpos==1){ //绕点旋转
                        //p(at.x+' - '+(-at.width/2));
                        ctx.save();
                        ctx.translate(at.zpos[0], at.zpos[1]);
                        ctx.rotate(at.zposjd*(Math.PI/180));
                        //p(at.zposjd);
                        if (undefined!==at.zpossd && at.zpossd!=0){
                            that.attr.zposjd += at.zpossd;
                        }
                        if (undefined !== at.p_x && undefined !== at.p_y){
							ctx.drawImage(that.img,at.p_x, at.p_y, at.p_w, at.p_h, at.x-at.zpos[0],at.y-at.zpos[1],at.width,at.height);
						} else {
							ctx.drawImage(that.img,at.x-at.zpos[0],at.y-at.zpos[1],at.width,at.height);
						}
                        ctx.restore();
                    }else{
						if (undefined !== at.p_x && undefined !== at.p_y){
							ctx.drawImage(that.img,at.p_x, at.p_y, at.p_w, at.p_h, ax,ay,at.width,at.height);
						}else {							
							ctx.drawImage(that.img,ax,ay,at.width,at.height);
						}
					}
					if (at.yuan!==undefined || at.zjd!==undefined || at.z!==undefined){
                        ctx.restore();
                    }
				}else {
					that.loadok = true;
					that.img.onload=function(){
						if (at.yuan!==undefined){
							ctx.save();
							ctx.arc(ax+at.yuan/2,ay+at.yuan/2,at.yuan,0,2*Math.PI);
							ctx.clip();
						}
						if(at.mv!==undefined){ //移动
							ax += at.mv/10;
							if (ax > window.innerWidth){
								ax = 0-at.width;
							}
							at.x = ax;
						}
						if(at.z!==undefined && at.z > 0){
							ctx.save();
							ctx.translate(ax +at.width/2, ay +at.height/2)
							ctx.rotate(that.attr.zj*(Math.PI/180));
							if (undefined !== at.p_x && undefined !== at.p_y){
								ctx.drawImage(that.img,at.p_x, at.p_y, at.p_w, at.p_h, -at.width/2,-at.height/2,at.width,at.height);
							}else {							
								ctx.drawImage(that.img,-at.width/2,-at.height/2,at.width,at.height);
							}
							that.attr.zj += at.z/10;
						}else if(at.zjd!==undefined){ //转角度
                            ctx.save();
                            ctx.translate(ax +at.width/2, ay +at.height/2)
                            ctx.rotate(at.zjd*(Math.PI/180));

                            if (undefined !== at.p_x && undefined !== at.p_y){
                                ctx.drawImage(that.img,at.p_x, at.p_y, at.p_w, at.p_h, -at.width/2,-at.height/2,at.width,at.height);
                            }else {							
                                ctx.drawImage(that.img,-at.width/2,-at.height/2,at.width,at.height);
                            }
        
                        }else{
							if (undefined !== at.p_x && undefined !== at.p_y){
								ctx.drawImage(that.img,at.p_x, at.p_y, at.p_w, at.p_h, ax,ay,at.width,at.height);
							}else {							
								ctx.drawImage(that.img,ax,ay,at.width,at.height);
							}
						}

						if (at.yuan!==undefined || at.zjd!==undefined || at.z!==undefined){
                            ctx.restore();
                        }
						//p('ok: '+that.img.src);
					}
					that.img.onerror=function(t){
						that.dis = false; 
						//p(t);
						p('onerror: '+that.img.src);
					}
				}
                if(at.opacity!==undefined)  ctx.globalAlpha=1;
				break;
			case 'font':
				if(undefined!==that.attr.text){
					ctx.beginPath();
					ctx.scale(0.5,0.5);
					if(at.color!==undefined)ctx.fillStyle = at.color;
					if(at.font!==undefined)ctx.font=at.font;	//30px 微软雅黑
					if(at.textalign!==undefined)ctx.textAlign = at.textalign; //点的左右
					else{ctx.textAlign='center';}
					if(at.valign!==undefined)ctx.textBaseline = at.valign; //上下线
					else{ctx.textBaseLine='middle';}

					if(/\n/.test(that.attr.text)){
						var aText = that.attr.text.split('\n');
						for (var n in aText){
							ctx.fillText(aText[n],ax*2,(ay+n*1)*2);
						}
					}else{
						ctx.fillText(that.attr.text,ax*2,ay*2);
					}
					ctx.scale(2,2);
					ctx.stroke();
					
				}
				break;
			case 'div':
				//ctx.save();
				if(at.width <= 0 && at.text!==undefined){
					ctx.font=at.font;
					at.width = ctx.measureText(at.text).width/2;
					if (undefined!=at.padding){
						at.width += at.padding*2;
						this.attr.width = at.width;
					}
				}				
				
				if(undefined!=at.yyk) ctx.shadowBlur=at.yyk;
				if(undefined!=at.yy) ctx.shadowColor=at.yy;	//
				if(at.line!==undefined)  ctx.lineWidth=at.line;
				if(at.opacity!==undefined)  ctx.globalAlpha=at.opacity;
				if (undefined!=at.radius){ //圆角
					ctx.beginPath();				
					if(undefined!=at.border)ctx.strokeStyle=at.border;					
					ctx.moveTo(ax + at.radius, ay);  
					ctx.arcTo(ax + at.width, ay, ax + at.width, ay + at.height, at.radius);  
					ctx.arcTo(ax + at.width, ay + at.height, ax, ay + at.height, at.radius);  
					ctx.arcTo(ax, ay + at.height, ax, ay, at.radius);  
					ctx.arcTo(ax, ay, ax + at.radius, ay, at.radius);
					ctx.strokeStyle=0;
					ctx.lineWidth=0;
					if(at.background!==undefined){ctx.fillStyle=at.background;ctx.fill()}
					ctx.stroke();  
				}else {			
					ctx.beginPath();
					if (at.background!==undefined&&at.background!=''&&at.border!==undefined&&at.border!=''){
						ctx.fillStyle=at.background;
						ctx.strokeStyle=at.border;
						ctx.rect(ax,ay,at.width,at.height);
						ctx.fill();
						ctx.stroke();
					}else if (at.background!==undefined&&at.background!=''){						
						ctx.fillStyle=at.background; 
						ctx.fillRect(ax,ay,at.width,at.height);
					}else {				
						if(at.border!==undefined)ctx.strokeStyle=at.border;
						ctx.strokeRect(ax,ay,at.width,at.height);
					}
				}
				if(undefined!=at.yyk) ctx.shadowBlur=0;
				if(at.opacity!==undefined)  ctx.globalAlpha=1;


				if (at.text!==undefined){
					ctx.scale(0.5,0.5);
					if(at.color!==undefined)ctx.fillStyle = at.color;
					if(at.font!==undefined){ctx.font=at.font;}	//30px 微软雅黑
					if(at.textalign!==undefined)ctx.textAlign = at.textalign; //点的左右
					if(at.valign!==undefined)ctx.textBaseline = at.valign; //上下线

					if(/\n/.test(that.attr.text)){
						var aText = that.attr.text.split('\n');
						for (var n in aText){
							ctx.fillText(aText[n],(ax+at.width/2)*2,(ay+at.height/2+n*20)*2);
						}
					}else{
						ctx.fillText(that.attr.text,(ax+at.width/2)*2,(ay+at.height/2)*2);
					}
					ctx.scale(2,2);
					ctx.stroke();
				}

				//ctx.closePath();
				//ctx.restore();
				break;
			case 'arc':
				if (at.r > 0){
					ctx.beginPath();
					ctx.lineCap="round"; 
					if(at.line!==undefined)ctx.lineWidth=at.line;
					if(at.background!==undefined)ctx.fillStyle=at.background;
					if(at.border!==undefined)ctx.strokeStyle=at.border;
					ctx.arc(ax,ay,parseInt(at.r),0,2*Math.PI);
					if(at.background!==undefined)ctx.fill();
					ctx.closePath()
					ctx.stroke();
				}
				break;

			case 'dbian':	//多边形
				if (at.r > 0 && at.bian>2){
					ctx.beginPath();
					ctx.moveTo(ax + at.r * Math.cos(2*Math.PI*0/at.bian), ay + at.r * Math.sin(2*Math.PI*0/at.bian));
					for(var i = 1; i <= at.bian; i++) {
						ctx.lineTo(ax + at.r * Math.cos(2*Math.PI*i/at.bian), ay + at.r * Math.sin(2*Math.PI*i/at.bian));
					}
					ctx.closePath();
					if(undefined!=at.border)ctx.strokeStyle=at.border;	
					if(at.line!==undefined)ctx.lineWidth=at.line;
					if(at.background!==undefined){ctx.fillStyle=at.background;ctx.fill()}
					ctx.stroke();  
				}
				break;
			case 'line':
				ctx.beginPath();
				ctx.lineCap = "round";
				ctx.lineJoin = "round"; //圆角
				var start = true;

                let fx = 0,fy = 0;
                if (undefined!=at.f){
					if (at.f.attr.mousemove){
						fx = at.f.mx;
						fy = at.f.my;
					}else {
						fx = at.f.attr.x;
						fy = at.f.attr.y;
					}
                }

				if (ax!==undefined){
					start = false
					ctx.moveTo(ax,ay);
				}
                //p(fx);
				for (var pos in at.path){
					if (at.path[pos].length==2){
						var mvx = at.path[pos][0]*bli+fx;
						if(start){
							ctx.moveTo(mvx,at.path[pos][1]*bli+fy);
						}else {
							ctx.lineTo(mvx,at.path[pos][1]*bli+fy);
						}
						start = false;
					}else {
						start = true;
						ctx.closePath();
					}
				}				
				if(at.color!==undefined) ctx.strokeStyle=at.color;
				if(at.line!==undefined)  ctx.lineWidth=at.line;
				ctx.stroke(); 
				break;
			default:
				p('错误的类型');
				this.dis = false
				break;
		}
    }
}