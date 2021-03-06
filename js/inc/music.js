let instance

/**
 * 统一的音效管理器
 */
export default class Music {
    constructor() {
        if (instance)
            return instance

        instance = this
        //this.click = new Audio()
        //this.click.loop = true
        //this.click.src = 'img/click.mp3'

        //this.connect = new Audio()
        //this.connect.src = 'img/connect.mp3'
    }

    ck(b) {
        if(!b)return;
        if (undefined === this.click){
            this.click = new Audio()
            this.click.src = 'img/click.mp3'
        }
        console.log(this.click);
        this.click.currentTime = 0
        this.click.play()
    }

    con(b) {
        if (!b) return;
        if (undefined === this.connect) {
            this.connect = new Audio()
            this.connect.src = 'img/connect.mp3'
        } 
        this.connect.currentTime = 0
        this.connect.play()
    }
}
