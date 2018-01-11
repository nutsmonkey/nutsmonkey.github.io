// JavaScript Document
var amount1 =0, amount2=0, amount3=0, mutes =1;
var canvas;
var my_context;
var lastX, lastY;
var mousePressed = false;
function init() {
	document.getElementById("Background").volume = 0.05;
	load();
	//canvas
	canvas = document.getElementById("myCanvas");
	my_context = canvas.getContext("2d");
		//Event Listeners
	canvas.addEventListener("mousedown",(function(e){
	mousePressed = true;
	console.log("draw funct called");
})
);
	
	canvas.addEventListener("mouseup",(function(e){
	mousePressed = false;
	console.log("draw funct stopped");
})
);
	
	canvas.addEventListener("mouseleave",(function(e){
	mousePressed = false;
	console.log("left");
})
);
	
	canvas.addEventListener("mousemove",(function(e){
	Draw(e.clientX, e.clientY, mousePressed);
	console.log("moving on canvas");
})
);
	
	canvas.addEventListener("click",(function(e){
	Draw(e.clientX, e.clientY, true);
	console.log("draw");
})
);
	document.getElementById('clear').addEventListener('click', function() {
        my_context.clearRect(0, 0, canvas.width, canvas.height);
      }, false);
}
function Draw(x, y, isDown) {
    if (isDown) {
        //check if image is to draw on canvas
		my_context.beginPath();
		//my_context.strokeStyle = "black";
		my_context.lineWidth = 3;
		my_context.lineJoin = "round";
		my_context.moveTo(lastX,lastY);
		my_context.lineTo(x-canvas.offsetLeft,y-canvas.offsetTop);
		my_context.closePath();
		my_context.stroke();
    }
	//must upate lastx and y to use for move to and line to
    lastX = x-canvas.offsetLeft;
    lastY = y-canvas.offsetTop;
}
function mute(){
	if(mutes == 0){
		document.getElementById("Background").volume = 0.0;
		mutes = 1;
		document.getElementById("Mute").innerHTML = "Unmute Sound";
		save();
	   }
	 else{
	   document.getElementById("Background").volume = 0.05;
		 mutes = 0;
		 document.getElementById("Mute").innerHTML = "Mute Sound";
		 save();
	   }
}
function Payment(){
	alert("Payment is unavailable at the Moment");
}
function save(){
	localStorage.setItem("Item1", amount1);
    localStorage.setItem("Item2", amount2);
    localStorage.setItem("Item3", amount3);
	localStorage.setItem("IsMute", mutes);
	localStorage.setItem("canvas", canvas.toDataURL());
	
}
function load(){
	amount1 = localStorage.getItem("Item1");
    amount2 = localStorage.getItem("Item2");
    amount3 = localStorage.getItem("Item3");
	mutes = localStorage.getItem("IsMute");
	if(amount1 == "undefined" || amount1 == null){
		amount1 = 0;
	}
	if(amount2 == "undefined" || amount2 == null){
		amount2 = 0;
	}
	if(amount3 == "undefined" || amount3 == null){
		amount3 = 0;
	}
	if(mutes == 1){
		document.getElementById("Background").volume = 0.0;
	   document.getElementById("Mute").innerHTML = "Unmute Sound";
	   }
	document.getElementById("MFTS").innerHTML ='<button onClick = "add('+-1+')" type="button">-</button>' + "March For the Sun(£4.74): " + amount1 + '<button onClick = "add('+1+')" type="button">+</button>';
	document.getElementById("ST").innerHTML ='<button onClick = "add('+-2+')" type="button">-</button>' + "Self Titled(£7.59): " + amount2 + '<button onClick = "add('+2+')" type="button">+</button>';
	document.getElementById("RR").innerHTML = '<button onClick = "add('+-3+')" type="button">-</button>' + "Reverse. Reform.(£3.95): " + amount3 + '<button onClick = "add('+3+')" type="button">+</button>';
	document.getElementById("Total").innerHTML = "Total: £" + (amount1*474 + amount2*759 + amount3*395)/100;
	
}
function Loadsig(){
	my_context.clearRect(0, 0, canvas.width, canvas.height);
	var image = new Image();
	image.src = localStorage.getItem("canvas");
	image.onload = function () {
		my_context.drawImage(image, 0, 0, canvas.width, canvas.height);
	};
}
function add(value){
	switch(value) {
    case 1:
			amount1++;
			save();
			load();
			console.log(amount1);
        break;
	case -1:
			if(amount1!=0){
			amount1--;
			save();
			load();
			}
			console.log(amount2);
        break;
    case 2:
			amount2++;
			save();
			load();
			console.log(amount2);
        break;
	case -2:
			if(amount2!=0){
			amount2--;
			save();
			load();
			}
			console.log(amount2);
        break;
	case -3:
			if(amount3!=0){
			amount3--;
			save();
			load();
			}
			console.log(amount2);
        break;
    default:
			amount3++;
			save();
			load();
			console.log(amount3);
		break;
	
}
}

window.addEventListener("load",init,false);