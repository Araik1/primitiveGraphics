window.onload = function(){ 
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	var WIDTH_POINT = 2;
	ctx.lineWidth = WIDTH_POINT;

    var isFirstClick = true;
    //var x1, y1;

   
    ctx.translate(canvas.width / 2, canvas.height / 2);
	
canvas.onclick = function(event){
		var x = event.offsetX;
		var y = event.offsetY;

		
        if(isFirstClick)
        {      
              x1 = x - canvas.width / 2;
              y1 = y - canvas.height / 2; 

		      ctx.fillRect(x1, y1, WIDTH_POINT, WIDTH_POINT);
              isFirstClick = !isFirstClick;
        }
        else
        {
            x2 = x - canvas.width / 2;
            y2 = y - canvas.height / 2; 

            ctx.fillRect(x2, y2, WIDTH_POINT, WIDTH_POINT);
            //drawLineBrezenhem(ctx, x1, y1, x2, y2); 
            drawLineCDA(ctx, x1, y1, x2, y2); 
            x1 = x2;
            y1 = y2;
        }
 }
	
    function drawLineCDA(contex, x1, y1, x2, y2)
    {
        var n;
        if(Math.abs(x1 - x2) > Math.abs(y1 - y2))
        {
            n = Math.abs(x1 - x2);
        }
        else
        {
            n = Math.abs(y1 - y2); 
        }

        var dx = (x2 -x1), 
            dy = (y2 - y1);

        var x = x1,
            y = y1;

        for(let i = 0; i < n; i++)
        {
            x = x + dx / n;
            y = y + dy / n;
            contex.fillRect(x, y, WIDTH_POINT, WIDTH_POINT);
        }
    }


    function drawLineBrezenhem(contex, x0, y0, x1, y1)
    {
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);

        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;

        var err = dx - dy;
        
        while (true) 
        {
            contex.fillRect(x0, y0, WIDTH_POINT, WIDTH_POINT);

            if ((x0 == x1) && (y0 == y1)) break;

            var e2 = 2 * err;

            if (e2 >-dy)
            { 
                err -= dy; 
                x0  += sx;
            }
            if (e2 < dx)
            { 
                err += dx; 
                y0  += sy; 
            }
        }

    }
}
