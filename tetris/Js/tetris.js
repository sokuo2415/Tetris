
// 繪製畫布
let canvas = document.getElementById("game-canvas")
//繪製分數
let scoreboard = document.getElementById("scoreboard")
//繪製出一個方塊
let ctx = canvas.getContext("2d")

//設定ctx繪製出的方塊大小為30 30 (因為 constants.js 的 Block_side_length = 30)
ctx.scale(Block_side_length,Block_side_length) 
//model 每次都會抓取 gamemode.js的Class內的東西
let model = new GameModel(ctx)
//設定分數為0
let score = 0

//設定 newGameState() 遊戲狀態時間
//這邊會讓newGameState()的遊戲狀態一直重複跑
//除非碰到頭頂
// Game_clock遊戲更新畫面固定每秒更新一次
setInterval(()=>{
    newGameState()
}, Game_clock);

let newGameState = ()=>{
    fullSend()
    // 如果gamemode.js 的 fallingpiece 沒抓到方塊
    if(model.fallingpiece ===null){
        //設定亂數隨機產生數字
        const rand = Math.round(Math.random()*6) + 1
        //宣告Newpiece = 新的方塊
        const NewPiece = new Piece(Shapes[rand],ctx)
        //另 gamemode.js 的 fallingpiece = Newpiece的方塊
        model.fallingpiece = NewPiece
        //抓取自動向下方塊的動作
        model.movedown() 
    }else{
        //抓取自動向下方塊的動作
        model.movedown()
    }
}
//宣告fullSend測試row 是否有被填滿

const fullSend = ()=>{
   //宣告 allFilled 測試row 填滿後要做甚麼

    const allFilled = (row) =>{
        //另x 跑至row的長度
        //大概是這樣的概念
        //例:
        //x---->往這邊跑判斷
        // [0][0][0][0][0][0][0][0][0][0]
        for(let x of row){
            //row沒有被填滿
            if(x===0){
                return false
            }
        }
        //如果長這樣
        // [0][1][0][1][1][1][1][1][1][1]
        //就會跑到下面for迴圈判斷此行row是否都被填滿

        return true
    }
    for(let i = 0; i<model.grid.length; i++){
        //如果最底下的row都被填滿 或任意行row被填滿
        if(allFilled(model.grid[i])){
            //分數加分
            score += Score_worth
            //刪除被填滿的row
            model.grid.splice(i,1)
            //重新設定那行的row都為0
            model.grid.unshift([0,0,0,0,0,0,0,0,0,0])
        }
    }
    //更新分數
    scoreboard.innerHTML ="Score:" + String(score)
}
//抓取鍵盤按鍵
document.addEventListener("keydown",(e)=>{
    switch(e.keyCode){
        case 37: //左
            //抓取gamemode.js move的向左功能
            model.move(false)
            break
        case 39:  //右
         //抓取gamemode.js move的向右功能
            model.move(true)
            break
        case 38:  //上
         //抓取gamemode.js rotat的方塊旋轉功能
            model.rotate()
            break
        case 40:  //下
         //抓取gamemode.js movedown的加速下降功能
            model.movedown()
            break
    }
})