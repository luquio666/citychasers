// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 512;
document.body.appendChild(canvas);

var rndNumber1 = 0;
var rndNumber2 = 0;
var RndNumber1 = function () {
	rndNumber1 = Math.round((Math.random() * 5) + 1);
};
var RndNumber2 = function () {
	rndNumber2 = Math.round((Math.random() * 5) + 1);
};
var startTimer1 = new Date().getTime() + (rndNumber1 * 1000);
var startTimer2 = new Date().getTime() + (rndNumber2 * 1000);
var coinTimer = new Date().getTime() + (0.5 * 1000);
var coinSN = 1;

//points to set triangle collider
var triPointSelected = 1;
var px1 = 255;
var py1 = 132;

var px2 = 210;
var py2 = 188;

var px3 = 317;
var py3 = 201;

var tspeed = 2;
var tbool = false;



// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/blocks.png";

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
enemyImage2.src = "images/t1.png";

// edificio1
var b1Ready = false;
var b1Image = new Image();
b1Image.onload = function () {
	b1Ready = true;
};
b1Image.src = "images/b1.png";
// edificio2
var b2Ready = false;
var b2Image = new Image();
b2Image.onload = function () {
	b2Ready = true;
};
b2Image.src = "images/b2.png";
// edificio3
var b3Ready = false;
var b3Image = new Image();
b3Image.onload = function () {
	b3Ready = true;
};
b3Image.src = "images/b3.png";


// plaza1
var pl1Ready = false;
var pl1Image = new Image();
pl1Image.onload = function () {
	pl1Ready = true;
};
pl1Image.src = "images/pl1.png";

// plaza2
var pl2Ready = false;
var pl2Image = new Image();
pl2Image.onload = function () {
	pl2Ready = true;
};
pl2Image.src = "images/pl2.png";

// arboles
var tReady = false;
var tImage = new Image();
tImage.onload = function () {
	tReady = true;
};
tImage.src = "images/t.png";


var coinReady = false;
var coinImage = new Image();
coinImage.onload = function () {
	coinReady = true;
};
coinImage.src = "images/c1.png"; //c2 c3 c4

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

	resetM1();
	resetM2();

	score = 0;
};
var resetM1 = function() {
	var rnd = Random(0,crossesFree.length);
	enemy.x = crossesFree[rnd].x;
	enemy.y = crossesFree[rnd].y;
}
var resetM2 = function() {
	var rnd = Random(0,crossesFree.length);
	enemy2.x = crossesFree[rnd].x;
	enemy2.y = crossesFree[rnd].y;
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
	} else if (40 in keysDown && p2) { // down arrow
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

    //TRIANGLE MOVE POINTS
    if (49 in keysDown) triPointSelected = 1;
    if (50 in keysDown) triPointSelected = 2;
    if (51 in keysDown) triPointSelected = 3;
    
    if (87 in keysDown) { //W
        if(triPointSelected == 1) py1 -= tspeed;
        if(triPointSelected == 2) py2 -= tspeed;
        if(triPointSelected == 3) py3 -= tspeed;
    } else if (65 in keysDown) { // A
        if(triPointSelected == 1) px1 -= tspeed;
        if(triPointSelected == 2) px2 -= tspeed;
        if(triPointSelected == 3) px3 -= tspeed;
    } else if (83 in keysDown) { // S
        if(triPointSelected == 1) py1 += tspeed;
        if(triPointSelected == 2) py2 += tspeed;
        if(triPointSelected == 3) py3 += tspeed;
    } else if (68 in keysDown) { // D
        if(triPointSelected == 1) px1 += tspeed;
        if(triPointSelected == 2) px2 += tspeed;
        if(triPointSelected == 3) px3 += tspeed;
    } 
    
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
			enemyImage2.src = "images/t1.png";
		}
		else {
			enemy2.x -= (enemy2.speed / .5) * diagonalMove * modifier;
			enemy2.y -= (enemy2.speed / .5) * modifier;
			enemyImage2.src = "images/t3.png";
		}
		if(enemy2.y >= 400) changeDirM2 = false;
		else if(enemy2.y <= 0) changeDirM2 = true;
	} else {
		if(changeDirM2) {
			enemy2.y += (enemy2.speed / .5) * modifier;
			enemy2.x -= (enemy2.speed / .5) * diagonalMove * modifier;
			enemyImage2.src = "images/t2.png";
		}
		else {
			enemy2.y -= (enemy2.speed / .5) * modifier;
			enemy2.x += (enemy2.speed / .5) * diagonalMove * modifier;
			enemyImage2.src = "images/t4.png";

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
    TBool();
    
}

function isTouching(player,obj) {
	if(	
		player.x <= (obj.x + 16)
		&& obj.x <= (player.x + 16)
		&& player.y <= (obj.y + 16)
		&& obj.y <= (player.y + 16))
		{ return true; }
		else { return false; }
}

//----------------------------
//   POINT TO TRIANGLE
//----------------------------
var TBool = function () {
        if (AB()*BC()>0 && BC()*CA()>0) tbool = true;
        else tbool = false;
    }
function AB() {
    return (eval((player.y-py1)*(px2-px1)-(player.x-px1)*(py2-py1)))
}
function BC() {
    return (eval((player.y-py2)*(px3-px2)-(player.x-px2)*(py3-py2)))
}
function CA() {
return (eval((player.y-py3)*(px1-px3)-(player.x-px3)*(py1-py3)))
}
//----------------------------


var colliderBool = false;
// Dibuja en pantalla los elementos agregados al canvas
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	//dibuja la moneda
	ctx.drawImage(coinImage,245,148); 
	ctx.drawImage(coinImage,305,185); 
	ctx.drawImage(coinImage,363,230); 

	if (playerReady) {
		ctx.drawImage(playerImage, player.x, player.y);
	}
	if (enemyReady) {
		ctx.drawImage(enemyImage, enemy.x, enemy.y);
	}
	if (enemyReady2) {
		ctx.drawImage(enemyImage2, enemy2.x, enemy2.y);
	}
	if (b1Ready) { //RED BUILDING
		ctx.drawImage(b1Image,83,55);
		ctx.drawImage(b1Image,-37,-30);
		ctx.drawImage(b1Image,203,-30);
		ctx.drawImage(b1Image,83,-115);
	}
	if (b2Ready) { //BLACK BUILDING
		ctx.drawImage(b2Image,323,55);
		ctx.drawImage(b2Image,443,-30);
		ctx.drawImage(b2Image,323,-115);
		ctx.drawImage(b2Image,443,140);
	}
	if (b3Ready) { //ORANGE BUILDINGS
		ctx.drawImage(b3Image,323,395);
		ctx.drawImage(b3Image,83,395);
		ctx.drawImage(b3Image,-37,310);
		ctx.drawImage(b3Image,443,310);
	}
	if (pl1Ready) { //
		ctx.drawImage(pl1Image,205,210);
	}
	if (pl2Ready) { //
		ctx.drawImage(pl2Image,-17,210);
	}
	if (tReady) { //
		ctx.drawImage(tImage,97,285);
		ctx.drawImage(tImage,337,285);
		ctx.drawImage(tImage,217,370);
	}

	//render of triangle points
    ctx.fillRect(px1,py1,5,5);
    ctx.fillRect(px2,py2,5,5);
    ctx.fillRect(px3,py3,5,5);

	var endTimer = new Date().getTime();
	//var timer1 = Math.round((startTimer1 - endTimer)/1000);
	//var timer2 = Math.round((startTimer2 - endTimer)/1000);
	var timer3 = Math.round((coinTimer - endTimer)/1000);
	/*if(timer1 <= 0) {
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
	}*/

	if(timer3 <= 0) {
		coinTimer = new Date().getTime() + (0.6 * 1000);
		coinSN++;
		if(coinSN > 4) coinSN = 1;
		if(coinSN === 1) { coinImage.src = "images/c1.png"; }
		else if(coinSN === 2) { coinImage.src = "images/c2.png"; }
		else if(coinSN === 3) { coinImage.src = "images/c3.png"; }
		else if(coinSN === 4) { coinImage.src = "images/c4.png"; }
	}

	// Score
	ctx.fillStyle = "green";
	ctx.font = "16px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + score, 32, 32);
	/*ctx.fillText("p1: " + p1, 32,64);
	ctx.fillText("p2: " + p2, 32,96);
	ctx.fillText("p3: " + p3, 32,128);
	ctx.fillText("p4: " + p4, 32,160);*/
    
    //MUESTRO LA POSICION DE CADA PUNTA DEL TRIANGULO
    ctx.fillText("Point1 _ X: " + px1 + " Y: " + py1, 32,64);
	ctx.fillText("Point2 _ X: " + px2 + " Y: " + py2, 32,96);
	ctx.fillText("Point3 _ X: " + px3 + " Y: " + py3, 32,128);
	ctx.fillText("triangle collision?: " + tbool,32,160);
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

