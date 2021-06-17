//宣告區(可共用給其他js檔的)

//方塊墜落時間
const Game_clock =1000
//方塊大小
const Block_side_length=30
//畫面長寬
const Row =20
const Col = 10
//分數
const Score_worth = 10


//建立Shapes形狀
const Shapes = [
    [],
    //長方形
    [
        [0,0,0,0],  
        [1,1,1,1],  
        [0,0,0,0],  
        [0,0,0,0],  
    ],
    //向右45度且相反的L
    [
        [2,0,0],   
        [2,2,2],  
        [0,0,0],  
    ],
    [
    //向右45度的L
        [0,0,3],   
        [3,3,3],  
        [0,0,0],  
    ],
    //正方形
    [
        [4,4],    
        [4,4],  
    ],
    //相反z
    [
        [0,5,5],   
        [5,5,0],  
        [0,0,0],  
    ],
    //向上T
    [
        [0,6,0],   
        [6,6,6],  
        [0,0,0],  
    ],
    //正z
    [
        [7,7,0],   
        [0,7,7],  
        [0,0,0],  
    ],
]
//設定形狀顏色(會按照 Shapes 的建立順序設定顏色 如:長方形 = #000000)
const Colors =[
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#F000FF",


]