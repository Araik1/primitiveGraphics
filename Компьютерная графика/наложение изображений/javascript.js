window.onload = function(){ 
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	var WIDTH_POINT = 2;
	ctx.lineWidth = WIDTH_POINT;


  //ctx.translate(canvas.width / 2, canvas.height / 2);

	
  canvas.onclick = function(event){
		
  }


   
  function start(){
    var control = document.getElementById("start").addEventListener("change", function(event) {
    
    var img = new Image();
    img.src = document.getElementById('start').files[0].name;

    console.log(document.getElementById('start'));
    img.onload = function() {
         
        ctx.drawImage(img, 0, 0);
        ctx.drawImage(img, 100, 100);
    }
  
 
}, false);

}
	document.getElementById('start').onclick = start;
}
