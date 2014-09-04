window.onload=init;
var ctx;
var canvas;

var score=0;

var vector={
	x: 0,
	y: 0
}

var waterX=(Math.random()*790)+5;
var waterY=0;

var foodX=(Math.random()*790)+5;
var foodY=0;

var zombieX=Math.random()*800;
var zombieY=500;

var zombieArmX=4;
var zombieArmX2=-4;
var zombieArmY=-10;

var zombieLegX=3;
var zombieLegX2=-3

var fallingVelocity=1;

//keyboard keys
var pressed=false;
var up=false;
var right=false;
var left=false;

function init(){
	document.onkeydown=handleKeyDown;
	document.onkeyup=handleKeyUp;
	canvas=document.querySelector("canvas");
	ctx=canvas.getContext("2d");
	animate();
}

//handle keypresses
function handleKeyDown(evt){
	evt=evt||window.event;
	switch(evt.keyCode){
		case 37:
			left=true;
			break;
		case 38:
			up=true;
			break;
		case 39:
			right=true;
			break;
	}
}
function handleKeyUp(evt){
	evt=evt||window.event;
	switch (evt.keyCode){
		case 37:
			left=false;
			break;
		case 38:
			up=false;
			break;
		case 39:
			right=false;
			break;
	}
}

function animate(){
	requestAnimationFrame(animate);
	drawScene();
	falling();
	moveZombie();
	checkBounds();
	//console.log(score);
}

function checkBounds(){

	if(zombieX>804){
		zombieX=-4;
	}
	else if(zombieX<-4){
		zombieX=804;
	}
}

function drawScene(){
	ctx.clearRect(0, 0, 1000, 640);
	drawZombie();
	drawWater();
	drawFood();
	drawDisplay();
}

function drawDisplay(){
	ctx.beginPath();
	ctx.fillText("Score: "+score,700,20);
	ctx.fillStyle="#0b0";	
	ctx.font = "15px lcd";
	ctx.closePath();	
}

//draws the water
function drawWater(){
	ctx.save();
	ctx.translate(waterX,waterY);
	ctx.beginPath();
	ctx.arc(0,-5,10,0,2*Math.PI);
	ctx.strokeStyle="#00f";
	ctx.fillStyle="#00f";
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}

//draws the food
function drawFood(){
	ctx.save();
	ctx.translate(foodX,foodY);
	ctx.beginPath();
	ctx.arc(0,-5,10,0,2*Math.PI);
	ctx.strokeStyle="#ff4";
	ctx.fillStyle="#ff4";
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}

//makes water and food fall down
function falling(){
	if(waterY>510){
		waterY=0;
		waterX=Math.random()*800;
	}
	else if(waterY<=zombieY&&waterY>=zombieY-23&&(waterX>zombieX-10&&waterX<zombieX+10)){
		waterY=0;
		waterX=Math.random()*800;
		score++;
	}
	waterY+=fallingVelocity;

	if(foodY>510){
		foodY=0;
		foodX=Math.random()*800;
	}
	else if(foodY<=zombieY&&foodY>=zombieY-23&&(foodX>zombieX-10&&foodX<zombieX+10)){
		foodY=0;
		foodX=Math.random()*800;
		score--;
	}
	foodY+=fallingVelocity;
}

//draws zombie
function drawZombie(){
	ctx.save();
	ctx.translate(zombieX,zombieY);
	//head
	ctx.beginPath();
	ctx.arc(0,-23,3,0,2*Math.PI);
	ctx.strokeStyle="#fff";
	ctx.fillStyle="#fff";
	ctx.fill();
	ctx.stroke();
	ctx.closePath();

	//body
	ctx.beginPath();
	ctx.moveTo(0,-20);
	ctx.lineTo(0,-10);
	ctx.strokeStyle="#fff"
	ctx.stroke();
	ctx.closePath();

	//arms
	ctx.beginPath();
	ctx.moveTo(0,-17);
	ctx.lineTo(zombieArmX,zombieArmY);
	ctx.moveTo(0,-17);
	ctx.lineTo(zombieArmX2,zombieArmY);
	ctx.strokeStyle="#fff"
	ctx.stroke();
	ctx.closePath();

	//legs
	ctx.beginPath();
	ctx.moveTo(zombieLegX2,0);
	ctx.lineTo(0,-10);
	ctx.lineTo(zombieLegX,0);
	ctx.strokeStyle="#fff";
	ctx.stroke();
	ctx.closePath();

	ctx.restore();
}

function moveZombie(){
	if(left){
		zombieArmX=-8
		zombieArmX2=-8
		zombieArmY=-17;

		if(vector.x<=1.5){
			vector.x+=0.2;
		}

		zombieX-=vector.x;

		if(zombieLegX<3){
			if(pressed==false){
				zombieLegX+=0.2;
				zombieLegX2-=0.2;
				if(zombieLegX==3){
					pressed=true;
				}
			}
			else if(pressed==true&&zombieLegX>-3){
				zombieLegX-=0.2;
				zombieLegX2+=0.2;
			}
		}

		if(pressed==false){
			if(zombieY>=496){
				vector.y=0.5;
				zombieY-=vector.y;
			}
			else{
				pressed=true;
			}
		}

		else if(pressed==true){
			if(zombieY<500){
				vector.y=0.5;
				zombieY+=vector.y;
			}
			else{
				pressed=false;
			}	
		}
	}

	if(right){
		zombieArmX=8;
		zombieArmX2=8
		zombieArmY=-17;

		if(vector.x<=1.5){
			vector.x+=0.2;
		}
		zombieX+=vector.x;

		if(zombieLegX<3){
			if(pressed==false){
				zombieLegX+=0.2;
				zombieLegX2-=0.2;
				if(zombieLegX==3){
					pressed=true;
				}
			}
			else if(pressed==true&&zombieLegX>-3){
				zombieLegX-=0.2;
				zombieLegX2+=0.2;
			}
		}

		if(pressed==false){
			if(zombieY>=496){
				vector.y=0.5;
				zombieY-=vector.y;
			}
			else{
				pressed=true;
			}
		}

		else if(pressed==true){
			if(zombieY<500){
				vector.y=0.5;
				zombieY+=vector.y;
			}
			else{
				pressed=false;
			}	
		}
	}

	else if(!right&&!left){
		zombieArmX=4
		zombieArmX2=-4
		zombieArmY=-10;
		zombieLegX=-3;
		zombieLegX2=3;

		vector.x=0;
		if(zombieY<500){
			vector.y=2;
			zombieY+=vector.y;
		}
		else{
			pressed=false;
		}
	}
}