//所有的主要監控程式
class GameModel {
    //建構元(裡面變數是其他js檔的進來的變數)
    constructor(ctx){
         //建構原理面的變數令他等於新的變數===> var shape = this.shape(大概就是這樣的意思)
         //主要是讓上下ctx 要可以互抓 才可以方便把抓到的值跳至其他js檔運作
        this.ctx = ctx;
        this.fallingpiece =null //piece
        //製作畫布 這裡的grid 會將 makeStartgrid() 作完的畫布(遊戲畫面)回傳至他身上
        this.grid = this.makeStartgrid()
    }
    //製作遊戲畫面
    makeStartgrid(){
        //畫布用陣列方式來呈現
        let grid = []
        //製作矩陣的高 (Row是constants.js檔裡的值)
        for(var i = 0;i<Row;i++){
            //繪製出陣列[]
            grid.push([])
            //製作矩陣的寬 (Col是constants.js檔裡的值)
            for(var j = 0;j<Col;j++){
                //會在繪製出得陣列[]中加入0 
                grid[grid.length - 1].push(0)
            }
        }
        //回傳繪製出的矩陣
        return grid;

        //這裡的結果大概是這樣
        // [0,0,0,0,0,0,0,0,0,0]
        // [0,0,0,0,0,0,0,0,0,0]
        // [0,0,0,0,0,0,0,0,0,0]
        // [0,0,0,0,0,0,0,0,0,0]
        // [0,0,0,0,0,0,0,0,0,0]
        // [0,0,0,0,0,0,0,0,0,0]
        // [0,0,0,0,0,0,0,0,0,0]
        // [0,0,0,0,0,0,0,0,0,0]
        // [0,0,0,0,0,0,0,0,0,0]
        // [0,0,0,0,0,0,0,0,0,0]

        //會有20個[0,0,0,0,0,0,0,0,0,0]
        //這個就是我們用矩陣作出的遊戲畫面
        
    }
//碰撞處裡給 x y 座標 確定下降的shape是否跟畫布的邊框或其他方塊有觸碰
    collision(x,y){
        //宣告shape 的到piece.js的方塊
        const shape = this.fallingpiece.shape
        //用for 判斷方塊寬度
        for(let i = 0; i < shape.length; i++){
            //用for 判斷方塊長度
            for(let j = 0; j < shape.length; j++){
                //如果shape的長寬>0 (就是constants.js 宣告的Shapes裡的方塊)
                if(shape[i][j]>0){
                    //宣告p q組合成新形狀
                    //例：正方形+向右45度且相反的L
                    // [4][4][2]
                    // [4][4][2][2][2]
                    let p = x + j
                    let q = y + i
                    //判定形狀是否在畫布內
                    if( p >= 0 && p < Col && q < Row){
                       // 目前shape在邊界內 且目前格子有其他shape占用
                        if(this.grid[q][p] > 0){
                            return true
                            }
                        }else{
                            return true
                    } 
                }
            }
        }
        return false
    }

//渲染處裡
    renderGame(){
        //這兩個for迴圈抓畫布的長寬
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length; j++){
                //宣告一個cell得到新的grid的長寬
                let cell = this.grid[i][j]
                //cell的位置會決定piece.js 的ctx方塊的顏色要是啥
                this.ctx.fillStyle = Colors[cell]
                this.ctx.fillRect(j,i,1,1)
            }
        }
        //如果上面宣告的fallingpiece抓到值
        if(this.fallingpiece !== null){
            //就讓他取得piece.js產生的新方塊
            this.fallingpiece.renderPiece();
        }

    }

//自動向下
    movedown(){
        //防止沒有方塊產生 這裡宣告一個保險 讓他可以產生新方塊出來 
        if(this.fallingpiece === null){
            this.renderGame();
            return
            // 讓下降的shape可以固定下降
        }else if(this.collision(this.fallingpiece.x, this.fallingpiece.y + 1)){
            //宣告心的shape x y 抓取方塊跟他的x y座標
            const shape = this.fallingpiece.shape
            const x = this.fallingpiece.x
            const y = this.fallingpiece.y
            //製作出新的的方塊
            shape.map((row,i)=>{
               // 這邊的cell 會去抓gamemode.js的 renderGame()的 cell
                row.map((cell,j)=>{
                    //宣告出新的x y座標
                    let p = x + j
                    let q = y + i
                    //判斷上 下 左 右 高度 如果符合 就讓grid方塊的位置下降至目前shape的位置
                    if(p >= 0 && p < Col && q < Row && cell > 0){
                        this.grid[q][p] = shape[i][j]
                    }
                })
            })
            //如果觸碰到頂部就結束
            if(this.fallingpiece.y ===0){
                
                alert("GG game over")
                //直接重整網頁 達到 重新開始的效果
                window.location.reload("index.html")
                //開始遊戲
                this.grid = this.makeStartgrid()
            
            }
            //並讓fallingpiece先沒有存取方塊
            this.fallingpiece =null
        }else{
            //fallingpiece存取的方塊位置下降
            this.fallingpiece.y += 1
        }
        //產生新的方塊
        this.renderGame()
        
    }
    //做左右方向的方塊移動
    move(right){
        if(this.fallingpiece ===null){
            return
        }
        //抓目前fallingpiece的x y座標
        let x = this.fallingpiece.x
        let y = this.fallingpiece.y

        if(right){
            //向右
            if(!this.collision(x+1,y)){
                //x 向右
                this.fallingpiece.x +=1
            }
        }else{
            //向左
            if(!this.collision(x-1,y)){
                //x 向左
                this.fallingpiece.x -=1
            }
        }
        //產生新的方塊
        this.renderGame()
    }
//方塊旋轉
    rotate(){
        // 如果 fallingpiece 有抓到方塊
        if(this.fallingpiece !== null){
            //宣告新的shape 取得 fallingpiece 方塊
            let shape = this.fallingpiece.shape
            //抓取方塊的長寬
            for(let y = 0; y < shape.length; ++y){
                for(let x = 0; x < y; ++x){
                    //旋轉目前方塊的x y 變成旋轉的形狀
                    [this.fallingpiece.shape[x][y], this.fallingpiece.shape[y][x]] =  
                    [this.fallingpiece.shape[y][x], this.fallingpiece.shape[x][y]]
                }
            }
            //另 fallingpiece.shape 的方塊 重新定義
            this.fallingpiece.shape.forEach((row => row.reverse()))
        }
        //產生新的方塊
        this.renderGame()
    }

}