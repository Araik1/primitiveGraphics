window.onload = function(){ 
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	var WIDTH_POINT = 2;
	ctx.lineWidth = WIDTH_POINT;

    var masPointX = [];
    var masPointY = [];

    var t = 0;
 	var x0 = 0;
 	var y0 = 0;
 	var deg = 0;

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
	
	function repaint() {

    fillFigure(ctx, newMasPointX, newMasPointY, "white", true);
    for (var i = 0; i < masPointX.length; i++) {
        newMasPointX[i] = rotateOnDegreeX(x0, y0, masPointX[i], masPointY[i], deg);
        newMasPointY[i] = rotateOnDegreeY(x0, y0, masPointX[i], masPointY[i], deg);
    }
    fillFigure(ctx, newMasPointX, newMasPointY, "black", false);
 
    deg += 1;
}

function rotateOnDegreeX(x0, y0, x, y, deg) {
 
    var rad = (Math.PI / 180) * deg;
    return (x0 + (x - x0) * Math.cos(rad) - (y - y0) * Math.sin(rad));
}

function rotateOnDegreeY(x0, y0, x, y, deg) {
 
    var rad = (Math.PI / 180) * deg;
    return (y0 + (x - x0) * Math.sin(rad) + (y - y0) * Math.cos(rad));
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
 		if(document.getElementById('start').innerHTML == "start")
		{	
			t = setInterval(repaint, 10);
			document.getElementById('start').innerHTML = "stop";
			
		}
		else{
		  	clearInterval(t);
			document.getElementById('start').innerHTML = "start";	
		}
 	}
	    
	document.getElementById('start').onclick = start;
	
		
}
