window.onload = function(){ 
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	var WIDTH_POINT = 2;
	ctx.lineWidth = WIDTH_POINT;
    
    
    ctx.translate(canvas.width / 2, canvas.height / 2);
	
    var points = [[0, 0], 
                  [0, 0], 
                  [0, 0]];

    function drawGrid(context, w, h, step, c){
      context.strokeStyle = c;
      context.fillStyle = c;
      context.lineWidth = 1;

      context.beginPath();
      for (var x = -w / 2 + step; x < w; x += step) {
        context.moveTo(x, -w);
        context.lineTo(x, w);
      }

      for (var y = -h / 2 + step; y < h; y += step) {
        context.moveTo(-h, y);
        context.lineTo(h, y);
      }
      context.closePath();

      context.stroke();
    }

    function drawCoordinateAxis(context, w, h, step, c){
      context.strokeStyle = c;
      context.fillStyle = "black";
      context.lineWidth = 2;
      context.font = "12px sans-serif";

      context.beginPath();
      
        context.moveTo(0 - w / 2, 0);
        context.lineTo(0 + w / 2, 0);
        context.moveTo(0, 0 - h / 2);
        context.lineTo(0, 0 + h / 2);
  


        for (var x = -w / 2; x < w; x += step) {
          context.moveTo(x, 0 - 5);
          context.lineTo(x, 0 + 5);
          context.fillText(x, x, 0 + 15);
        }
  
        for (var y = -h / 2; y < h ; y += step) {
          context.moveTo(0 - 5, y);
          context.lineTo(0 + 5, y);
          context.fillText(y * -1, 0 + 15, y);
        }

      context.closePath();
      context.stroke();
    }

    function foo(x0, y0, x1, y1, y){
      return Math.round( (y - y0) * (x1 - x0) / (y1 - y0) + x0 );
    }

    function sort(p1){
      for (var i = p1.length - 1; i > 0; i--) {
        for (var j = 0; j < i; j++) {
          if(p1[j][1] > p1[j + 1][1]){
            [ p1[j][0], p1[j + 1][0] ] = [ p1[j + 1][0], p1[j][0] ];
            [ p1[j][1], p1[j + 1][1] ] = [ p1[j + 1][1], p1[j][1] ];
          }
        }
      }

      return p1;
    }

    function Triangle(context, p, c) {
      context.strokeStyle = c;
      context.fillStyle = c;
      
      p = sort(p);
      
      context.beginPath();
      for(var i = p[0][1]; i < p[1][1]; i++){
        context.moveTo(foo(p[0][0], p[0][1], p[1][0], p[1][1], i), i);
        context.lineTo(foo(p[0][0], p[0][1], p[2][0], p[2][1], i), i);
      }

      for(var i = p[1][1]; i < p[2][1]; i++){
        context.moveTo(foo(p[1][0], p[1][1], p[2][0], p[2][1], i), i);
        context.lineTo(foo(p[0][0], p[0][1], p[2][0], p[2][1], i), i);
      }

      context.closePath();
      context.stroke();
    }
    function randColor(x){
        switch(x) {
            case 1: 
                return "yellow";
            case 2:
                return "pink";
            case 3:
                return "green";
            case 4:
                return "blue";
            case 5:
                return "red";             
        }
    }
    
    drawGrid(ctx, canvas.width, canvas.height, 30, "gray");
    drawCoordinateAxis(ctx, canvas.width, canvas.height, 30, "red");
    function draw()
    {
        points[0][0] = document.getElementById("x1").value * (1);
        points[0][1] = document.getElementById("y1").value * (-1);

        points[1][0] = document.getElementById("x2").value * (1);
        points[1][1] = document.getElementById("y2").value * (-1);

        points[2][0] = document.getElementById("x3").value * (1);
        points[2][1] = document.getElementById("y3").value * (-1);



        Triangle(ctx, points, randColor(1 + Math.floor(Math.random() * (5 + 1 - 1))));
    }

    document.getElementById('draw').onclick = draw;
}
