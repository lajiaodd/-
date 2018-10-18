'use strict'	//变大至消失
import Dom from '../inc/dom'
import {p,bli,now_m} from '../inc/func'

export default class Paochuan extends Dom {
    constructor(){
		if(arguments.length<=2){
			super(arguments[0],arguments[1]);
		}else {
			super(arguments[0],arguments[1],arguments[2]);
		}


        this.sudu = (this.attr.sudu)*G.beiShu;
        this.zsdu = (this.sudu/(3/G.beiShu)).toFixed(2);
        this.zjdu = this.zsdu;


        
        p(this.attr.sudu+' + '+G.beiShu+' + '+this.sudu);

        this.currPos = 0;
        this.nextPos = 1;
        this.attr.zjd= 180;
        
        this.wb = this.attr.width/2;
        this.hb = this.attr.height/2;

        this.paoDao = this.attr.t.paoDao;
        this.yxPOS   = this.attr.t.yxPOS[0];//[this.paoDao[1][0]-this.attr.t.hDu,this.paoDao[1][1]+this.attr.t.hDu];  //圆心点
        
        this.attr.x = this.paoDao[this.currPos][0]-this.wb;
        this.attr.y = this.paoDao[this.currPos][1]-this.hb;

        this.xxtime = now_m();
        this.tiaoShu();
    }
    tiaoShu(){
        G.beiShu = 4;
        p(this.attr.sudu+' - '+G.beiShu+' - '+this.sudu);
        this.sudu = this.attr.sudu*G.beiShu;
        this.zsdu = (this.attr.sudu/(3/G.beiShu)).toFixed(2);
        this.zjdu = this.zsdu;
    }
    getPos(){
        if (undefined===this.paoDao[this.currPos+1]){
            this.nextPos = 0;
        }else {
            this.nextPos = this.currPos+1;
        }
    }
    nextLine(){
        if (undefined===this.paoDao[this.currPos+1] || undefined===this.paoDao[this.currPos+2]){

            p(now_m()-this.xxtime);
            this.xxtime = now_m();

            this.attr.t.gg_jbi(this.attr.chuan);
            this.currPos = 0;
            this.nextPos = 1;
            return;
            //this.attr.y = this.paoDao[this.currPos][1]-this.hb-this.sudu;
        }else {
            this.currPos += 1;
            this.nextPos = this.currPos+1;
        }
        if (this.nextPos==1 || this.nextPos==5){
            this.yxPOS   = this.attr.t.yxPOS[0];
            if(this.nextPos==5){
                this.attr.zjd= 180;
            }
        }else if(this.nextPos==2){
            this.yxPOS   = this.attr.t.yxPOS[1];
            this.attr.zjd= 90;
        }else if(this.nextPos==3){
            this.yxPOS   = this.attr.t.yxPOS[2];
            this.attr.zjd= 0;
        }else if(this.nextPos==4){
            this.yxPOS   = this.attr.t.yxPOS[3];
            this.attr.zjd= 270;
        }

        //p(this.currPos+' - '+this.nextPos);
    }
	w(){
        if (this.paoDao[this.currPos][0] == this.paoDao[this.nextPos][0] && this.paoDao[this.currPos][1] > this.paoDao[this.nextPos][1]){   //上
            if (this.attr.y+this.attr.height/2<=this.paoDao[this.nextPos][1]){

                if(this.nextPos == 1){
                    this.attr.y = this.paoDao[this.nextPos][1];
                }else{
                    //this.attr.y -= this.sudu;
                }
                //p(3);
                this.nextLine();
                //return;
            }if((undefined !== this.paoDao[this.nextPos+1]) && this.attr.y+this.attr.height/2<=this.yxPOS[1]){   //进弧
                this.attr.zjd -= this.zjdu;
                let a  = -this.zsdu* (Math.PI / 180);
                let x  = this.attr.x;
                let y  = this.attr.y;
                let rx = (this.yxPOS[0]-this.wb);
                let ry = (this.yxPOS[1]-this.hb);
                this.attr.x= (x - rx)*Math.cos(a) - (y - ry)*Math.sin(a) + rx;
                this.attr.y= (x - rx)*Math.sin(a) + (y - ry)*Math.cos(a) + ry;

                //if(this.attr.zjd<=90){
                if(this.attr.x<this.yxPOS[0] || this.attr.zjd<=90){
                    //this.attr.y = this.paoDao[this.nextPos][1]-this.attr.height/2;
                    this.nextLine();
                }
                //p('右上弧度');
            }else {
                this.attr.y -= this.sudu;
            }
            //p('上'+this.attr.x);
        }else if (this.paoDao[this.currPos][0] == this.paoDao[this.nextPos][0] && this.paoDao[this.currPos][1] < this.paoDao[this.nextPos][1]){
            if(this.attr.y+this.attr.height/2>=this.paoDao[this.nextPos][1]-this.attr.t.hDu){   //弧度
                //p('左下弧度'); 
                this.attr.zjd -= this.zjdu;
                let a  = -this.zsdu* (Math.PI / 180);
                let x  = this.attr.x;
                let y  = this.attr.y;
                let rx = (this.yxPOS[0]-this.wb);
                let ry = (this.yxPOS[1]-this.hb);
                this.attr.x= (x - rx)*Math.cos(a) - (y - ry)*Math.sin(a) + rx;
                this.attr.y= (x - rx)*Math.sin(a) + (y - ry)*Math.cos(a) + ry;
                if(this.attr.x>this.yxPOS[0]){
                    this.attr.y = this.paoDao[this.nextPos][1]-this.attr.height/2;
                    this.nextLine();
                }
            }else {
                this.attr.y += this.sudu;
            }
            //p('下');
        }else if (this.paoDao[this.currPos][0] > this.paoDao[this.nextPos][0] && this.paoDao[this.currPos][1] == this.paoDao[this.nextPos][1]){
            
            if(this.attr.x+this.attr.width/2<=this.paoDao[this.nextPos][0]+this.attr.t.hDu){   //弧度
                //p('左上弧度');
                //this.attr.x  -= this.sudu;

                this.attr.zjd -= this.zjdu;
                let a  = -this.zsdu* (Math.PI / 180);
                let x  = this.attr.x;
                let y  = this.attr.y;
                let rx = (this.yxPOS[0]-this.wb);
                let ry = (this.yxPOS[1]-this.hb);

                this.attr.x= (x - rx)*Math.cos(a) - (y - ry)*Math.sin(a) + rx;
                this.attr.y= (x - rx)*Math.sin(a) + (y - ry)*Math.cos(a) + ry;

                if(this.attr.y>this.yxPOS[1] || this.attr.zjd<=0){
                    this.attr.x = this.paoDao[this.nextPos][0]-this.attr.width/2;
                    this.nextLine();
                    //p(this.attr.x + ' - '+this.attr.y);
                    //p(this.nextPos);
                }
            }else {
                this.attr.x -= this.sudu;
            }
            
            //p('左');
        }else if (this.paoDao[this.currPos][0] < this.paoDao[this.nextPos][0] && this.paoDao[this.currPos][1] == this.paoDao[this.nextPos][1]){
            
            if (this.attr.x+this.attr.width/2>this.paoDao[this.nextPos][0]-this.attr.t.hDu){

                //p('右下弧度');
                this.attr.zjd -= this.zjdu;
                let a  = -this.zsdu* (Math.PI / 180);
                let x  = this.attr.x;
                let y  = this.attr.y;
                let rx = (this.yxPOS[0]-this.wb);
                let ry = (this.yxPOS[1]-this.hb);

                this.attr.x= (x - rx)*Math.cos(a) - (y - ry)*Math.sin(a) + rx;
                this.attr.y= (x - rx)*Math.sin(a) + (y - ry)*Math.cos(a) + ry;

                if(this.attr.zjd<=180){
                //if(this.attr.y<this.yxPOS[1]){
                    //this.attr.x = this.paoDao[this.nextPos][0]-this.attr.width/2;
                    this.nextLine();                    
                }
            }else {
                this.attr.x += this.sudu;
            }
            //p('右');
        }
        //this.attr.y += 1;
		super.w();
	}
}