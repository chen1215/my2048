function showNumberWithAnimation(x,y,num) {
    var numberCell=$("#number-cell-"+x+"-"+y);
    numberCell.css({"background":getNumberBackgoundColor(num),"fontSize":getNumberSize(num),"color":getNumberColor(num)});
    numberCell.text(num);
    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(x,y),
        left:getPosLeft(x,y)
    },50)
}
function showMoveAnimation(fromx,fromy,tox,toy) {
    var numberCell=$("#number-cell-"+fromx+"-"+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    })

}
function updateScore(score) {
    $("#score").text(score);
}