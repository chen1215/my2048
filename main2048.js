var board= new Array();
var score=0;
var hasConflicted = new Array();//解决出现2 2 4 8向左移动直接变成16的问题
var containerWidth;
var cellWidth;
var padding;
$(document).ready(function () {
    newgame();
})

function newgame() {
    // 初始化棋盘格
    containerWidth=$("#container").width();
    cellWidth=$(".cell").width();
    padding=(containerWidth-cellWidth*4)/5;
    init();
    // 在随机的两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}
function init() {
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var eachCell=$("#cell-"+i+"-"+j);
            eachCell.css({"top":getPosTop(i,j),"left":getPosLeft(i,j)});
        }
    }

    for(var i=0;i<4;i++){
        board[i]=new Array();
        hasConflicted[i] = new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score=0;
}
function updateBoardView() {
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var numberCell='<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>'
            $("#container").append(numberCell);
            var theNumberCell=$("#number-cell-"+i+"-"+j)

            if(board[i][j]===0){
                theNumberCell.css({"width":"0px","height":"0px"});
                theNumberCell.css({"top":getPosTop(i,j)+50,"left":getPosLeft(i,j)+50})
            }else{
                theNumberCell.css({"width":"100px","height":"100px"});
                theNumberCell.css({"top":getPosTop(i,j),"left":getPosLeft(i,j)})
                theNumberCell.css({"background":getNumberBackgoundColor(board[i][j]),"fontSize":getNumberSize(board[i][j]),"color":getNumberColor(board[i][j])});
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j]=false;
        }
    }
}

function generateOneNumber() {
    if(nospace(board)){
        return false;
    }
    // 随机一个可用的位置
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    //生成随机位置的优化
    while(true){
        if(board[randx][randy]===0){
            break;
        }
        randx=parseInt(Math.floor(Math.random()*4));
        randy=parseInt(Math.floor(Math.random()*4));
    }
    // 随机一个数字,2或者4
    var randNumber=Math.random()<0.5?2:4;
    // 将数字显示到位置上
    board[randx][randy]=randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
}
$(document).keydown(function (event) {
    switch (event.keyCode){
        case 37://左
            //判断能否向上移动
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameOver()",300);
            }
            break;
        case 38://上
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameOver()",300);
            }
            break;
        case 39://右
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameOver()",300);
            }
            break;
        case 40://下
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameOver()",300);
            }
            break;
        default:
            break;

    }
})
function isgameOver() {
    //没有空间生成随机数且不能移动
    if(nospace(board) && nomove(board)){
        gameover();
    }
}
function gameover() {
    alert("游戏结束");
}
//注意往哪边移，就要从哪边开始判断
function moveLeft() {
    // 判断是否能行向左移动
    if(!canMoveLeft(board)){
        return false;
    }
    //moveLeft
    for(var i=0;i<4;i++){
        //从最左边可以移动的第一列开始判断
        for(var j=1;j<4;j++){
            //j->k，判断1.落脚点是否为空；2.落脚点值是否与当前值相等；3.当前值与落脚点之间不能有障碍物
            if(board[i][j]!==0){
                //对应判断落脚点，应该从最左边开始判断
                for(var k=0;k<j;k++){
                    if(board[i][k]===0 && noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]===board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        //add score
                        score+=board[i][k];
                        updateScore(score);

                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveUp() {
    // 判断是否能行向上移动
    if(!canMoveUp(board)){
        return false;
    }
    //moveUp
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            //i->k，判断1.落脚点是否为空；2.落脚点值是否与当前值相等；3.当前值与落脚点之间不能有障碍物
            if(board[i][j]!==0){
                for(var k=0;k<i;k++){
                    if(board[k][j]===0 && noBlockVertical(j,k,i,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]===board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        //add
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveRight() {
    // 判断是否能行向上移动
    if(!canMoveRight(board)){
        return false;
    }
    //moveRight
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            //i->k，判断1.落脚点是否为空；2.落脚点值是否与当前值相等；3.当前值与落脚点之间不能有障碍物
            if(board[i][j]!==0){
                //注意这里判断落脚点要从最右边开始判断
                for(var k=3;k>j;k--){
                    if(board[i][k]===0 && noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]===board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score);

                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveDown() {
    // 判断是否能行向上移动
    if(!canMoveDown(board)){
        return false;
    }
    //moveDown
    for(var i=2;i>=0;i--){
        for(var j=0;j<4;j++){
            //i->k，判断1.落脚点是否为空；2.落脚点值是否与当前值相等；3.当前值与落脚点之间不能有障碍物
            if(board[i][j]!==0){
                for(var k=3;k>i;k--){
                    if(board[k][j]===0 && noBlockVertical(j,k,i,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]===board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        //add
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j];
                        updateScore(score);

                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}