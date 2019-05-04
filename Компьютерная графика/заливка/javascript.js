window.onload = function(){ 
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	var WIDTH_POINT = 2;
	ctx.lineWidth = WIDTH_POINT;

    var flag = false;
    var fillX, fillY;
    var c;

    var masPointX = [];
    var masPointY = [];


	var newMasPointX = [];
    var newMasPointY = [];
    ctx.translate(canvas.width / 2, canvas.height / 2);

	
    canvas.onclick = function(event){
		
        if(!flag){
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
        else{
            fillX = event.offsetX;
            fillY = event.offsetY;
            fillX = fillX - canvas.width / 2;
            fillY = fillY - canvas.height / 2; 



            c = randColor(1 + Math.floor(Math.random() * (5 + 1 - 1)));

            //fillZatravka(ctx, c, fillX, fillY, false);
            fillPostrochnoDown(ctx, c, fillX, fillY);
        }
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
    
    function isWhite(context, x, y){
    var imgData = context.getImageData(x + canvas.width / 2, y + canvas.height / 2, WIDTH_POINT, WIDTH_POINT).data;

    return (imgData[0] == 255 && imgData[1] == 255 && imgData[2] == 255 && imgData[3] == 255) ? true : false;
    }

    function fillPostrochnoUp(context, color, x, y){
        context.strokeStyle = color;
        context.fillStyle = color;


    }

    function fillPostrochnoDown(context, color, x, y){
        context.strokeStyle = color;
        context.fillStyle = color;
        
        var stack = [];
        stack.push(x);
        stack.push(y);

        while(stack.length != 0){

            var tmpY = stack.pop();
            var tmpX = stack.pop();

           if(isWhite(context, tmpX, tmpY)){ 

                context.fillRect(tmpX, tmpY, WIDTH_POINT, WIDTH_POINT);

  var xy: mypoint;
  var time_x, x_, y_, x_right, x_left: integer;
  
  x_ := x;
  y_ := y;
  xy.x := x_;
  xy.y := y_;
  
    time_x := xy.x;
    xy.x := xy.x + 1;
    
    while (GetPixel(xy.x, xy.y) = c) do
    begin
      if (PointInZone(xy.x, xy.y)) then
      begin
        PutPixel(xy.x, xy.y, clblue);
        xy.x := xy.x + 1;
      end
      else break;
    end;    
    x_right := xy.x - 1;
    
    xy.x := time_x;
    xy.x := xy.x - 1;
    while (GetPixel(xy.x, xy.y) = c) do
    begin
      if (PointInZone(xy.x, xy.y)) then
      begin
        PutPixel(xy.x, xy.y, clblue);
        xy.x := xy.x - 1;
      end
      else break;
    end;
    x_left := xy.x + 1;
    
    var flag: boolean;
    
    //xy.x := time_x;
    xy.x := x_left;
    xy.y := xy.y + 1;
    while xy.x < x_right do
    begin
      flag := false;
      while (GetPixel(xy.x, xy.y) = c) and (GetPixel(xy.x, xy.y) <> clblue) and (xy.x < x_right)do
      begin
        if (flag = false) then flag := true;
        xy.x := xy.x + 1;
      end;
      if (flag) then
      begin
        if (xy.x = x_right) and (GetPixel(xy.x, xy.y) = c) and (GetPixel(xy.x, xy.y) <> clblue) then
          begin
            var temp: mypoint;
            temp.x := xy.x;
            temp.y := xy.y;
            s.Push(temp);
          end
         else
          begin
            var temp: mypoint;
            temp.x := xy.x - 1;
            temp.y := xy.y;
            s.Push(temp);
          end;
         flag := false;
      end;
      //x_vxod := xy.x;
      x := xy.x;
      while ((GetPixel(xy.x, xy.y) <> c) or (GetPixel(xy.x, xy.y) = clblue)) and (xy.x < x_right)do
      begin
        xy.x := xy.x + 1;
      end;
      if xy.x = x then xy.x := xy.x + 1;
    end;
    xy.y := xy.y - 1;
  end;
  string_algoritm_up(x_, y_-1);
end;
    }

    function fillZatravka(context, color, x, y, type){
        context.strokeStyle = color;
        context.fillStyle = color;

        var stack = [];
        stack.push(x);
        stack.push(y);

        while(stack.length != 0){

            var tmpY = stack.pop();
            var tmpX = stack.pop();

           if(isWhite(context, tmpX, tmpY)){ 

                context.fillRect(tmpX, tmpY, WIDTH_POINT, WIDTH_POINT);
                if(type){
                    stack.push(tmpX);
                    stack.push(tmpY - WIDTH_POINT);
 
                    stack.push(tmpX - WIDTH_POINT);
                    stack.push(tmpY);

                    stack.push(tmpX + WIDTH_POINT);
                    stack.push(tmpY);

                    stack.push(tmpX);
                    stack.push(tmpY + WIDTH_POINT);
                }
                else {
                    stack.push(tmpX - WIDTH_POINT);
                    stack.push(tmpY- WIDTH_POINT);

                    stack.push(tmpX - WIDTH_POINT);
                    stack.push(tmpY + WIDTH_POINT);

                    stack.push(tmpX + WIDTH_POINT);
                    stack.push(tmpY - WIDTH_POINT);

                    stack.push(tmpX + WIDTH_POINT);
                    stack.push(tmpY + WIDTH_POINT);
                }
           }
        }
    }

    function start(){
        flag = !flag;
    }

	document.getElementById('start').onclick = start;
}
