// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 512;
document.body.appendChild(canvas);

var rndNumber1 = 0;
var rndNumber2 = 0;
var RndNumber1 = function() {
	rndNumber1 = Math.round((Math.random() * 5));
}
var RndNumber2 = function() {
	rndNumber2 = Math.round((Math.random() * 5));
}
var startTimer1 = new Date().getTime() + (rndNumber1 * 1000);
var startTimer2 = new Date().getTime() + (rndNumber2 * 1000);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/bg3.png";

// player image
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
	playerReady = true;
};
playerImage.src = "images/p1.png";

// enemy image
var enemyReady = false;
var enemyImage = new Image();
enemyImage.onload = function () {
	enemyReady = true;
};
enemyImage.src = "images/p1.png";

// enemy image
var enemyReady2 = false;
var enemyImage2 = new Image();
enemyImage2.onload = function () {
	enemyReady2 = true;
};
enemyImage2.src = "images/p1.png";

// edificio
var buildingReady = false;
var buildingImage = new Image();
buildingImage.onload = function () {
	buildingReady = true;
};
buildingImage.src = "images/b_180.png";

// Game objects
var player = {
	speed: 128 // movement in pixels per second
};
var enemy = {
	speed: 50
};
var enemy2 = {
	speed: 50
};
var score = 0;

// 1RA linea de coliders RED
var cross1 = {x:-17,y:-34,type:"cross"}; // f_derecha (p1)
var cross2 = {x:-17,y:134,type:"cross"}; // f_derecha (p1) f_arriba (p4)
var cross3 = {x:-17,y:305,type:"cross"}; // f_derecha (p1) f_arriba (p4)
var cross4 = {x:-17,y:475,type:"cross"}; // f_arriba (p4)
// 2DA linea de coliders RED
var cross5 = {x:102,y:51,type:"cross"};
var cross6 = {x:102,y:221,type:"cross"};
var cross7 = {x:102,y:391,type:"cross"};
// 3RA linea de coliders RED
var cross8 = {x:222,y:-34,type:"cross"}; // f_derecha (p1) f_abajo (p2)
var cross9 = {x:222,y:134,type:"cross"};
var cross10 = {x:222,y:305,type:"cross"};
var cross11 = {x:222,y:475,type:"cross"}; // f_arriba (p4) f_izquierda (p3)
// 4TA linea de coliders RED
var cross12 = {x:341,y:51,type:"cross"};
var cross13 = {x:341,y:221,type:"cross"};
var cross14 = {x:341,y:391,type:"cross"};
// 5TA linea de coliders RED
var cross15 = {x:462,y:-34,type:"cross"}; // f_abajo (p2)
var cross16 = {x:462,y:134,type:"cross"}; // f_abajo (p2) f_izquierda (p3)
var cross17 = {x:462,y:305,type:"cross"}; // f_abajo (p2) f_izquierda (p3)
var cross18 = {x:462,y:475,type:"cross"}; //f_izquierda (p3)

var crossesP1 = [cross1];
var crossesP1P4 = [cross2,cross3];
var crossesP4 = [cross4];

var crossesP1P2 = [cross8];
var crossesP4P3 = [cross11];

var crossesP2 = [cross15];
var crossesP2P3 = [cross16,cross17];
var crossesP3 = [cross18];

var crossesFree = [cross5, cross6, cross7, cross9, cross10, cross12, cross13, cross14];

// Handle keyboard controls
var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// RandomNumber
var Random = function(min, max) {
	return Math.floor(Math.random() * max) + min;
};
// Reset the game when the player catches a enemy
var reset = function () {
	player.x = 222;
	player.y = 305;

	var rnd = Random(0,crossesFree.length);
	enemy.x = crossesFree[rnd].x;
	enemy.y = crossesFree[rnd].y;
	rnd = Random(0,crossesFree.length);
	enemy2.x = crossesFree[rnd].x;
	enemy2.y = crossesFree[rnd].y;

	score = 0;
};
var resetM1 = function() {
	enemy.x = 32 + (Math.random() * (canvas.width - 64));
	enemy.y = 32 + (Math.random() * (canvas.height - 64));
}
var resetM2 = function() {
	enemy2.x = 32 + (Math.random() * (canvas.width - 64));
	enemy2.y = 32 + (Math.random() * (canvas.height - 64));
}

var changeDirM1 = true;
var changeAxisM1 = false;
var changeDirM2 = true;
var changeAxisM2 = false;

var p1=true;
var p2=true;
var p3=true;
var p4=true;

// Update game objects con deltatime para consistencia
var diagonalMove = 1.42;
var update = function (modifier) {
	//PLAYER MOVEMENT
	if (38 in keysDown && p4) { // up arrow 
		//moves up
		if(player.y <= -20) { player.y = -20; }
		player.y -= player.speed * modifier;
		//moves 4
		if(player.x >=450) { player.x = 450; }
		player.x += player.speed * diagonalMove * modifier;
		playerImage.src = "images/p4.png";
		colliderBool = false;
		p1=false;
		p3=false;
	}else if (40 in keysDown && p2) { // down arrow
		//moves down
		if(player.y >=450) { player.y = 450; }
		player.y += player.speed * modifier;
		//moves left
		if(player.x <= -20) { player.x = -20; }
		player.x -= player.speed * diagonalMove * modifier;
		playerImage.src = "images/p2.png";
		colliderBool = false;
		p1=false;
		p3=false;
	}else if (37 in keysDown && p3) { // left arrow
		//moves left
		if(player.x <= -20) { player.x = -20; }
		player.x -= player.speed * diagonalMove * modifier;
		//moves up
		if(player.y <= -20) { player.y = -20; }
		player.y -= player.speed * modifier;
		playerImage.src = "images/p3.png";
		colliderBool = false;
		p2=false;
		p4=false;
	}else if (39 in keysDown && p1) { // right arrow
		//moves right
		if(player.x >= 450) { player.x = 450; }
		player.x += player.speed * diagonalMove * modifier;
		//moves down
		if(player.y >= 450) { player.y = 450; }
		player.y += player.speed * modifier;
		playerImage.src = "images/p1.png";
		colliderBool = false;
		p2=false;
		p4=false;
	}else if (82 in keysDown) { reset(); }

	//CHANGE DIRECTION
	//enemy1
	if(!changeAxisM1) {
		if(changeDirM1) {
			enemy.x += (enemy.speed / .5) * diagonalMove * modifier;
			enemy.y += (enemy.speed / .5) * modifier;
			enemyImage.src = "images/p1.png";
		}
		else {
			enemy.x -= (enemy.speed / .5) * diagonalMove * modifier;
			enemy.y -= (enemy.speed / .5) * modifier;
			enemyImage.src = "images/p3.png";
		}
		if(enemy.x >= 470) changeDirM1 = false;
		else if(enemy.x <= -15) changeDirM1 = true;
	} else {
		if(changeDirM1) {
			enemy.y += (enemy.speed / .5) * modifier;
			enemy.x -= (enemy.speed / .5) * diagonalMove * modifier;
			enemyImage.src = "images/p2.png";
		}
		else {
			enemy.y -= (enemy.speed / .5) * modifier;
			enemy.x += (enemy.speed / .5) * diagonalMove * modifier;
			enemyImage.src = "images/p4.png";
		}
		if(enemy.y >= 470) changeDirM1 = false;
		else if(enemy.y <= -15) changeDirM1 = true;
	}

	//enemy2
	if(!changeAxisM2) {
		if(changeDirM2) {
			enemy2.x += (enemy2.speed / .5) * diagonalMove * modifier;
			enemy2.y += (enemy2.speed / .5) * modifier;
			enemyImage2.src = "images/p1.png";
		}
		else {
			enemy2.x -= (enemy2.speed / .5) * diagonalMove * modifier;
			enemy2.y -= (enemy2.speed / .5) * modifier;
			enemyImage2.src = "images/p3.png";
		}
		if(enemy2.y >= 400) changeDirM2 = false;
		else if(enemy2.y <= 0) changeDirM2 = true;
	} else {
		if(changeDirM2) {
			enemy2.y += (enemy2.speed / .5) * modifier;
			enemy2.x -= (enemy2.speed / .5) * diagonalMove * modifier;
			enemyImage2.src = "images/p2.png";
		}
		else {
			enemy2.y -= (enemy2.speed / .5) * modifier;
			enemy2.x += (enemy2.speed / .5) * diagonalMove * modifier;
			enemyImage2.src = "images/p4.png";

		}
		if(enemy2.x >= 400) changeDirM2 = false;
		else if(enemy2.x <= 0) changeDirM2 = true;
	}


	// COLLISION WITH CAR 1
	if (
		player.x <= (enemy.x + 32)
		&& enemy.x <= (player.x + 32)
		&& player.y <= (enemy.y + 32)
		&& enemy.y <= (player.y + 32)
	) {
		++score;
		resetM1(); // TODO: reset particular para cada monstruo sin afectar al player
	}
	// COLLISION WITH CAR 2
	if(
		player.x <= (enemy2.x + 32)
		&& enemy2.x <= (player.x + 32)
		&& player.y <= (enemy2.y + 32)
		&& enemy2.y <= (player.y + 32)
	) {
		++score;
		resetM2();
	}

	CrossChoices();

};

function  isTouching(player,obj) {
	if(	
		player.x <= (obj.x + 16)
		&& obj.x <= (player.x + 16)
		&& player.y <= (obj.y + 16)
		&& obj.y <= (player.y + 16))
		{ return true; }
		else { return false; }
}



var colliderBool = false;
// Dibuja en pantalla los elementos agregados al canvas
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (playerReady) {
		ctx.drawImage(playerImage, player.x, player.y);
	}
	if (enemyReady) {
		ctx.drawImage(enemyImage, enemy.x, enemy.y);
	}
	if (enemyReady2) {
		ctx.drawImage(enemyImage2, enemy2.x, enemy2.y);
	}
	if (buildingReady) {
		//ctx.drawImage(buildingImage,46,16);
	}

	var endTimer = new Date().getTime();
	var timer1 = Math.round((startTimer1 - endTimer)/1000);
	var timer2 = Math.round((startTimer2 - endTimer)/1000);
	if(timer1 <= 0) {
		RndNumber1();
		startTimer1 = new Date().getTime() + (rndNumber1 * 1000);
		if(changeAxisM1) {
			changeAxisM1 = false;
		} else {
			changeAxisM1 = true;
		}
	}
	if(timer2 <= 0) {
		RndNumber2();
		startTimer2 = new Date().getTime() + (rndNumber2 * 1000);
		if(changeAxisM2) {
			changeAxisM2 = false;
		} else {
			changeAxisM2 = true;
		}
	}

	// Score
	ctx.fillStyle = "white";
	ctx.font = "16px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + score, 32, 32);
	ctx.fillText("p1: " + p1, 32,64);
	ctx.fillText("p2: " + p2, 32,96);
	ctx.fillText("p3: " + p3, 32,128);
	ctx.fillText("p4: " + p4, 32,160);
};

// base del juego. Update y Render
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};








var CrossChoices = function() {


	/*for (i=0;i<crossesP1.length ;i++ )
		{
			if (isTouching(player,crossesP1[i]))
			{
				colliderBool = true;
				p1=true;
				p2=false;
				p3=false;
				p4=false;
			}
		}
	for (i=0;i<crossesP1P4.length ;i++ )
		{
			if (isTouching(player,crossesP1P4[i]))
			{
				colliderBool = true;
				p1=true;
				p2=false;
				p3=false;
				p4=true;
			}
		}
	for (i=0;i<crossesP4.length ;i++ )
		{
			if (isTouching(player,crossesP4[i]))
			{
				colliderBool = true;
				p1=false;
				p2=false;
				p3=false;
				p4=true;
			}
		}
	for (i=0;i<crossesP1P2.length ;i++ )
		{
			if (isTouching(player,crossesP1P2[i]))
			{
				colliderBool = true;
				p1=true;
				p2=true;
				p3=false;
				p4=false;
			}
		}
	for (i=0;i<crossesP4P3.length ;i++ )
		{
			if (isTouching(player,crossesP4P3[i]))
			{
				colliderBool = true;
				p1=false;
				p2=false;
				p3=true;
				p4=true;
			}
		}
	for (i=0;i<crossesP2.length ;i++ )
		{
			if (isTouching(player,crossesP2[i]))
			{
				colliderBool = true;
				p1=false;
				p2=true;
				p3=false;
				p4=false
			}
		}
	for (i=0;i<crossesP2P3.length ;i++ )
		{
			if (isTouching(player,crossesP2P3[i]))
			{
				colliderBool = true;
				p1=false;
				p2=true;
				p3=true;
				p4=false;
			}
		}
	for (i=0;i<crossesP3.length ;i++ )
		{
			if (isTouching(player,crossesP3[i]))
			{
				colliderBool = true;
				p1=false;
				p2=false;
				p3=true;
				p4=false;
			}
		}
	*/
	for (i=0;i<crossesFree.length ;i++ )
		{
			if (isTouching(player,crossesFree[i]))
			{
				colliderBool = true;
				p1=true;
				p2=true;
				p3=true;
				p4=true;
			}
		}

};














// Cross-browser
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// inicio del juego en si
var then = Date.now();
reset();
main();

