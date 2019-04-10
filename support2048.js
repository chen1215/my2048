function getPosTop(x,y) {
    return padding*(x+1)+cellWidth*x;
}
function getPosLeft(x,y) {
    return padding*(y+1)+cellWidth*y;
}
// 设置数字相应背景颜色
function getNumberBackgoundColor(num) {
    switch (num) {
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
    return "balck";
}
// 设置数字颜色
function getNumberColor(num) {
    if(num<=4){
        return "#776e65";
    }
    else{
        return "white";
    }
}
//设置数字字体大小
function getNumberSize(num){
    if(num<=512){
        return "60px";
    }
    else{
        return "40px";
    }

}

function nospace() {
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]===0){
                return false;
            }
        }
    }
    return true;
}
function nomove(board) {
    if(canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board)){
        return false;
    }
    return true;
}
function canMoveLeft(board) {
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            //对当前格子有数字的情况考虑是否能向左移动
            if(board[i][j]!==0){
                //左边有格子的值为空或者当前格子的值和左边格子的值相等
                if(board[i][j-1]===0 || board[i][j]===board[i][j-1]){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveUp(board) {
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!==0){
                if(board[i-1][j]===0 || board[i][j]===board[i-1][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveDown(board) {
    for(var i=2;i>=0;i--){
        for(var j=0;j<4;j++){
            if(board[i][j]!==0){
                if(board[i+1][j]===0 || board[i][j]===board[i+1][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveRight(board) {
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            //对当前格子有数字的情况考虑是否能向左移动
            if(board[i][j]!==0){
                //左边有格子的值为空或者当前格子的值和左边格子的值相等
                if(board[i][j+1]===0 || board[i][j]===board[i][j+1]){
                    return true;
                }
            }
        }
    }
    return false;
}
function noBlockHorizontal(row,col1,col2,board) {
    for(var i=col1+1;i<col2;i++){
        if(board[row][i]!==0){
            return false;
        }
    }
    return true;
}
function noBlockVertical(col,row1,row2,board) {
    for(var i=row1+1;i<row2;i++){
        if(board[i][col]!==0){
            return false;
        }
    }
    return true;
}