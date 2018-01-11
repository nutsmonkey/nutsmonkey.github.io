// JavaScript Document
//defining all variable
var amount1 =0, amount2=0, amount3=0, mutes =1;
var canvas;
var my_context;
var lastX, lastY;
var mousePressed = false;
//function that's called on load
function init() {
	//set the video sound to a 5%
	document.getElementById("Background").volume = 0.05;
	load();
	//canvas
	canvas = document.getElementById("myCanvas");
	my_context = canvas.getContext("2d");
		//Event Listeners for mouse down
	canvas.addEventListener("mousedown",(function(e){
	mousePressed = true;
	console.log("draw funct called");
})
);
	//event listener for when mouse is up
	canvas.addEventListener("mouseup",(function(e){
	mousePressed = false;
	console.log("draw funct stopped");
})
);
	//tells when the mouse leaves the canvas to prevent it think the mouse is still held down
	canvas.addEventListener("mouseleave",(function(e){
	mousePressed = false;
	console.log("left");
})
);
	//event for when mouse moves
	canvas.addEventListener("mousemove",(function(e){
	Draw(e.clientX, e.clientY, mousePressed);
	console.log("moving on canvas");
})
);
	// event for when mouse click
	canvas.addEventListener("click",(function(e){
	Draw(e.clientX, e.clientY, true);
	console.log("draw");
})
);
	//clear canvas
	document.getElementById('clear').addEventListener('click', function() {
        my_context.clearRect(0, 0, canvas.width, canvas.height);
      }, false);
}
//draw function
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
//toggles mute of video on and off when a button is pressed
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
//An alert to state no payment available when payment is clicked
function Payment(){
	alert("Payment is unavailable at the Moment");
}
//called upon whenever all local variables need to be saved
function save(){
	localStorage.setItem("Item1", amount1);
    localStorage.setItem("Item2", amount2);
    localStorage.setItem("Item3", amount3);
	localStorage.setItem("IsMute", mutes);
	localStorage.setItem("canvas", canvas.toDataURL());
	
}
//called upon wheneve the site is loaded so that any saved variables can be set to what they were
function load(){
	amount1 = localStorage.getItem("Item1");
    amount2 = localStorage.getItem("Item2");
    amount3 = localStorage.getItem("Item3");
	mutes = localStorage.getItem("IsMute");
	//sets the variables when they are first made
	if(amount1 == "undefined" || amount1 == null){
		amount1 = 0;
	}
	if(amount2 == "undefined" || amount2 == null){
		amount2 = 0;
	}
	if(amount3 == "undefined" || amount3 == null){
		amount3 = 0;
	}
	//sets the mute button to mute if on mute
	if(mutes == 1){
		document.getElementById("Background").volume = 0.0;
	   document.getElementById("Mute").innerHTML = "Unmute Sound";
	   }
	//buttons for minusing and plusing all the items
	document.getElementById("MFTS").innerHTML ='<button onClick = "add('+-1+')" type="button">-</button>' + "March For the Sun(£4.74): " + amount1 + '<button onClick = "add('+1+')" type="button">+</button>';
	document.getElementById("ST").innerHTML ='<button onClick = "add('+-2+')" type="button">-</button>' + "Self Titled(£7.59): " + amount2 + '<button onClick = "add('+2+')" type="button">+</button>';
	document.getElementById("RR").innerHTML = '<button onClick = "add('+-3+')" type="button">-</button>' + "Reverse. Reform.(£3.95): " + amount3 + '<button onClick = "add('+3+')" type="button">+</button>';
	document.getElementById("Total").innerHTML = "Total: £" + (amount1*474 + amount2*759 + amount3*395)/100;
	//calc total cost^
}
//loads the saved signature when called
function Loadsig(){
	my_context.clearRect(0, 0, canvas.width, canvas.height);
	var image = new Image();
	image.src = localStorage.getItem("canvas");
	image.onload = function () {
		my_context.drawImage(image, 0, 0, canvas.width, canvas.height);
	};
}
//adds and minuses the correct item when called
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