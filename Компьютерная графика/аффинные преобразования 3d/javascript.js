window.onload = function(){ 


var canvas = document.getElementById('canvas');
var canvas_context = canvas.getContext('2d');

canvas_context.translate(canvas.width / 2, canvas.height / 2);
 
var arr_t = [
// Передняя стенка
[   {x:-100, y:-100, z:-100},
    {x:100, y:-100, z:-100},
    {x:100, y:100, z:-100},
    {x:-100, y:100, z:-100}],
// Правая стенка
[   {x:100, y:-100, z:-100},
    {x:100, y:-100, z:100},
    {x:100, y:100, z:100},
    {x:100, y:100, z:-100}],
// Левая стенка
[   {x:-100, y:-100, z:-100},
    {x:-100, y:-100, z:100},
    {x:-100, y:100, z:100},
    {x:-100, y:100, z:-100}],
// Задняя стенка
[   {x:-100, y:-100, z:100},
    {x:100, y:-100, z:100},
    {x:100, y:100, z:100},
    {x:-100, y:100, z:100}]];
 

var t0 = {x:0, y:0, z:0};
var deg = 0;

var arr_tt = [];
for (var i = 0; i < arr_t.length; i++) {
    arr_tt[i] = arr_t[i].slice();
}

var arrProj;
 
function repaint() {
    clearScreen(canvas, canvas_context, "#02416c");

    for (var i = 0; i < arr_t.length; i++) {
        for (var j = 0; j < arr_t[0].length; j++) {
            arr_tt[i][j] = rotateOnDegreeZ(t0, arr_t[i][j], deg);
            arr_tt[i][j] = rotateOnDegreeX(t0, arr_tt[i][j], deg);
        }
    }
 
    arrProj = getParallelProjection(arr_tt);
 
    canvas_context.lineWidth = 2; 
    strokeFigure(canvas_context, arrProj, "#e34708");

    deg += 1;
}

function getParallelProjection(arr) {
 
    var arr_new = [];
 
    for (var i = 0; i < arr.length; i++) {
        arr_new[i] = [];
        for (var j = 0; j < arr[0].length; j++) {
            arr_new[i][j] = {};
            arr_new[i][j].x = arr[i][j].x;
            arr_new[i][j].y = arr[i][j].y + arr[i][j].z / 4;
        }
    }
 
    return arr_new;
}
 
function clearScreen(canvas, context, color) {
    context.fillStyle = color;
 
    context.beginPath();
    context.fillRect(-canvas.width / 2, -canvas.height / 2,
                       canvas.width, canvas.height);
    context.closePath();
    context.fill();
}
 

function strokeFigure(context, arr, color) {
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = 3;
    for (var i = 0; i < arr.length; i++) {
        context.beginPath();
        for (var j = 0; j < arr[0].length; j++) {

            if (j == 0) {
                context.moveTo(arr[i][j].x, arr[i][j].y);
            } else {
                context.lineTo(arr[i][j].x, arr[i][j].y);
            }
        }
        context.closePath();
        context.stroke();
    }
}
 
 function rotateOnDegreeX(t0, t, deg) {
 
    var t_new = {};
 
    var rad = (Math.PI / 180) * deg;
 
    t_new.x = t.x;
    t_new.y = t0.y+(t.y-t0.y)*Math.cos(rad)-(t.z-t0.z)*Math.sin(rad);
    t_new.z = t0.y+(t.y-t0.y)*Math.sin(rad)+(t.z-t0.z)*Math.cos(rad);

    return t_new;
}

function rotateOnDegreeY(t0, t, deg) {
 
    var t_new = {};
 
    var rad = (Math.PI / 180) * deg;

    t_new.x = t0.x+(t.x-t0.x)*Math.cos(rad)-(t.z-t0.z)*Math.sin(rad);
    t_new.y = t.y;
    t_new.z = t0.z+(t.x-t0.x)*Math.sin(rad)+(t.z-t0.z)*Math.cos(rad);
 
    return t_new;
}

function rotateOnDegreeZ(t0, t, deg) {
 
    var t_new = {};
 
    var rad = (Math.PI / 180) * deg;
 
    t_new.x = t0.x+(t.x-t0.x)*Math.cos(rad)-(t.y-t0.y)*Math.sin(rad);
    t_new.y = t0.x+(t.x-t0.x)*Math.sin(rad)+(t.y-t0.y)*Math.cos(rad);
    t_new.z = t.z;
 
    return t_new;
}
 repaint();

 	function start() 
 	{
 		if(document.getElementById('start').innerHTML == "start")
		{	
			t = setInterval(repaint, 30);
			document.getElementById('start').innerHTML = "stop";
			
		}
		else{
		  	clearInterval(t);
			document.getElementById('start').innerHTML = "start";	
		}
 	}
	    
	document.getElementById('start').onclick = start;
	
		
}
