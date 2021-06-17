//這裡是在建立一個向下的shape

class Piece{
    //建構元(裡面變數是其他js檔的進來的變數) 
    constructor(shape,ctx){
        //建構原理面的變數令他等於新的變數===> var shape = this.shape(大概就是這樣的意思)
        this.shape = shape
        this.ctx = ctx
        //設定方塊出來的座標在哪裡
        this.y = 0
        this.x = Math.floor(Col / 2)
    }
    //繪製shape
    renderPiece(){
        //繪製出新的shape
        // 製作出新的的方塊
        this.shape.map((row,i)=>{
            //繪製出此方塊的顏色
            //這邊的cell 會去抓gamemode.js的 renderGame()的 cell
            row.map((cell,j)=>{
                if(cell>0){
                    //繪製shape出來
                    //繪製出的方塊會去抓constants.js的Colors的顏色並繪製在上面
                    this.ctx.fillStyle = Colors[cell]
                    //設定方塊大小
                    this.ctx.fillRect(this.x + j , this.y + i, 1 ,1)
                }
            })
        })
    }
}