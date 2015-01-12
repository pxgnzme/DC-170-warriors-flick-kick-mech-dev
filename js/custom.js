// VERSION 1.01
// LIBRARY HAMMER.JS

/*var myElement = document.getElementById('gamecanvas');

var hammertime = new Hammer(myElement);

hammertime.on('pan', function(ev) {
    console.log(ev);
});*/

var ball,doc;

var distToPosts = 700;

var factor = 20;

var myElement = document.getElementById('myElement');

var mc = new Hammer(myElement);

$(document).ready(function() {

	ball = {

		speed:180,
		angle:50,
		gravity:30

	};

	doc = {

		bottom: $(document).height(),
		right: $(document).width()

	}; 	

	setupHammer();

});

function setupHammer(){

	mc.get("swipe").set({ direction: Hammer.DIRECTION_ALL, velocity:0});

// listen to events...
/*mc.on("swipe", function(ev) {
    myElement.textContent ="Angle :> "+Math.round(ev.angle) +" : Speed :> "+ev.velocity+" : SpeedX :> "+ev.velocityX+" : SpeedY :> "+ev.velocityY+" distance :> "+ev.distance;
});*/

	mc.on("swipe", function(ev) {
	    myElement.textContent ="Speed :> "+ev.velocity;

	    if(ev.velocity < 0){

	    	var velocityFactor = ev.velocity*-1;

	    }

	    if (velocityFactor < 7.5){

	    	velocityFactor = 7.5;

	    }else if(velocityFactor > 10){

	    	velocityFactor = 10;

	    }

	    ball.speed = velocityFactor*factor;

	    getTrad();

	   //tracePath();

	});

}



// create a simple instance
// by default, it only adds horizontal recognizers




//tradCalc();

/*function tradCalc(){

	var range = (Math.pow(ball.speed,2) * Math.sin((ball.angle * (Math.PI/180))*2))/ ball.gravity;

	alert(range);

}*/

function getTrad(){

	$('.trace').remove();

	var vX = ball.speed * Math.cos(ball.angle * Math.PI/180);
	$.logThis("Velocity X :> "+vX);
	
	var vY = ball.speed * Math.sin(ball.angle * Math.PI/180);
	$.logThis("Velocity Y :> "+vY);

	var timeOfFlight = distToPosts/vX;
	$.logThis("time of flight :> "+timeOfFlight);

	var hAtX = ((distToPosts * vY)/vX) - (0.5 * ball.gravity * (Math.pow(distToPosts,2)/Math.pow(vX,2)));
	$.logThis("height at posts :> "+hAtX);

	$('body').append('<div class="trace" style="bottom: '+hAtX+'px; left: 700px;"></div>');

	if(hAtX > 200){
		alert("you kicked it over");
	}


}

function offscreen(x, y) {

	var offscreen = false;

	if(x > doc.right){

		offscreen = true;
	
	};
	
	if(x < 0){

		offscreen = true;

	}

	if(y > doc.bottom){

		offscreen = true;

	}

	if(y < 0){

		offscreen = true;

	}

	return offscreen;

} 

function tracePath(){

	$('.trace').remove();

	var trace = {

		x: 0,
		y: doc.bottom,
		time:0

	}

	//var trace_offscreen = false;
	var trace_offscreen = false;

	while(!trace_offscreen) {

		x = ball.speed * Math.cos(ball.angle * Math.PI/180) * trace.time + trace.x;

		y = ball.speed * Math.sin(ball.angle * Math.PI/180) * trace.time -0.5 * ball.gravity * Math.pow(trace.time,2);

		y = trace.y - y;

		trace_offscreen = offscreen(x, y);

		if(!trace_offscreen){

			console.log(y);

			$('body').append('<div class="trace" style="top: '+y+'px; left: '+x+'px;"></div>');

			trace.time += 0.5;

		}

		

	} 

}



// =====================================================================================================
// ADDITIONAL FUNCTIONS
// =====================================================================================================
// validate email

function validateEmail(email){ 

	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
	
	if(!reg.test(email)){ 
	
		return false;
	
	}else{
		
		return true;
		
	} 

} 

function getUniqueTime() {
	var time = new Date().getTime();
	while (time == new Date().getTime());
	return new Date().getTime();
}


// CONSOLE LOG FUNCTION ---------------------------------------------
// taken from http://www.nodans.com/index.cfm/2010/7/12/consolelog-throws-error-on-Internet-Explorer-IE

jQuery.logThis = function(text){
  
   if((window['console'] !== undefined)){
     
        console.log(text);
    
   }

}

