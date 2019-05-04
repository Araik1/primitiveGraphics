window.onload = function(){ 
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    var WIDTH_POINT = 2;
    ctx.lineWidth = WIDTH_POINT;

    var masPointX = [];
    var masPointY = [];

    var newMasPointX = [];
    var newMasPointY = [];
    ctx.translate(canvas.width / 2, canvas.height / 2);
    
canvas.onclick = function(event){
        var x = event.offsetX;
        var y = event.offsetY;
        x = x - canvas.width / 2;
        y = y - canvas.height / 2; 

        ctx.fillRect(x, y, WIDTH_POINT, WIDTH_POINT);

        masPointX.push(x);
        masPointY.push(y);
        fillFigure(ctx, newMasPointX, newMasPointY, "white", true);
        fillFigure(ctx, masPointX, masPointY, "black", false);

 }
    

function fillFigure(context, arrX, arrY, color, fill) {
    context.strokeStyle = color;
    context.fillStyle = color;
 
    context.beginPath();
    for (var i = 0; i < arrX.length; i++) {
 
        if (i == 0) {
            context.moveTo(arrX[i], arrY[i]);
        } else {
            context.lineTo(arrX[i], arrY[i]);
        }
    }
    context.closePath();
 
    if (fill) {
        context.beginPath();
         context.fillRect(-canvas.width / 2, -canvas.height / 2,
                            canvas.width, canvas.height);
        context.closePath();
        context.fill();
    }
    context.stroke();
}

    function start() 
    {
        
    }
        
    document.getElementById('start').onclick = start;
    
        
}
