window.onload = function(){ 
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	var WIDTH_POINT = 2;
	ctx.lineWidth = WIDTH_POINT;
    
    var radA = 0;
    var radB = 0;
    var x0 = 0;
    var y0 = 0;
    
    ctx.translate(canvas.width / 2, canvas.height / 2);
	

    function drawEllipse(context, x, y, a, b, color)
    {
        context.strokeStyle = color;

        var a_sqr = a * a;  
        var b_sqr = b * b;   
        var row = b;
        var col = 0;
        var two_a_sqr = a_sqr << 1;     //2*a^2
        var two_b_sqr = b_sqr << 1;     //2*b^2
        var four_a_sqr = a_sqr << 2;    //4*a^2
        var four_b_sqr = b_sqr << 2;    //4*b^2
        var d = two_a_sqr * ((row - 1) * (row)) + a_sqr + two_b_sqr * (1 - a_sqr);
        while (a_sqr * row > b_sqr * col)
        {
          context.fillRect(x + col, y + row, WIDTH_POINT, WIDTH_POINT);
          context.fillRect(x + col, y - row, WIDTH_POINT, WIDTH_POINT);
          context.fillRect(x - col, y + row, WIDTH_POINT, WIDTH_POINT);
          context.fillRect(x - col, y - row, WIDTH_POINT, WIDTH_POINT);
          if (d >= 0)
          {
            row = row - 1;
            d = d - four_a_sqr * row;
          }
          d = d + two_b_sqr * (3 + col * 2);
          col = col + 1;
        }
        d = two_b_sqr * (col + 1) * col + two_a_sqr * (row * (row - 2) + 1) + (1 - two_a_sqr) * b_sqr;
        while ( row + 1 != 0)
        {
            context.fillRect(x + col, y + row, WIDTH_POINT, WIDTH_POINT);
            context.fillRect(x + col, y - row, WIDTH_POINT, WIDTH_POINT);
            context.fillRect(x - col, y + row, WIDTH_POINT, WIDTH_POINT);
            context.fillRect(x - col, y - row, WIDTH_POINT, WIDTH_POINT);;
            if(d <= 0)
            {
                col = col + 1;
                d = d + four_b_sqr * col;
            }
            row = row - 1;
            d = d + two_a_sqr * (3 - (row << 1 ));
         }

    }

    function draw()
    {
        radA = document.getElementById("inp1").value;
        radB = document.getElementById("inp2").value;

        drawEllipse(ctx, x0, y0, radA, radB, "black");
    }

    document.getElementById('draw').onclick = draw;
}
