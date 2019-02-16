var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var gameOverSound = document.getElementById("gameOver");
var x = canvas.width;
var y = canvas.height;
var dy = [2, 2.2, 2.4, 2.6, 2.8];
var floorHeight = 10;
var charWidth = 40;
var charHeight = 40;
var rockWidth = 25;
var rockHeight = 25;
var wallWidth = 5;
var rockFall = [0,0,0,0,0];
var rockStart = [getRandomX(), getRandomX(), getRandomX(), getRandomX(), getRandomX()];
var charX = (canvas.width - charWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var score = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//document.addEventListener("mousemove", mouseMoveHandler, false);

function drawFloor() {
    ctx.beginPath();
    ctx.rect(0, y - floorHeight, canvas.width, floorHeight);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function drawChar() {
    ctx.beginPath();
    ctx.rect(charX, canvas.height - floorHeight - 2 - charHeight, charWidth, charHeight);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function drawWalls() {
    ctx.beginPath();
    ctx.rect(0, 0, wallWidth, canvas.height);
    ctx.rect(canvas.width - wallWidth, 0, wallWidth, canvas.height);
    ctx.fillStyle = "#661010";
    ctx.fill();
    ctx.closePath();

}

function drawRock1() {
    ctx.beginPath();
    ctx.rect(rockStart[0], rockFall[0], rockWidth, rockHeight);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.closePath();
}

function drawRock2() {
    ctx.beginPath();
    ctx.rect(rockStart[1], rockFall[1], rockWidth, rockHeight);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.closePath();
}

function drawRock3() {
    ctx.beginPath();
    ctx.rect(rockStart[2], rockFall[2], rockWidth, rockHeight);
    ctx.fillStyle = '#00FF00';
    ctx.fill();
    ctx.closePath();
}

function drawRock4() {
    ctx.beginPath();
    ctx.rect(rockStart[3], rockFall[3], rockWidth, rockHeight);
    ctx.fillStyle = '#0000FF';
    ctx.fill();
    ctx.closePath();
}

function drawRock5() {
    ctx.beginPath();
    ctx.rect(rockStart[4], rockFall[4], rockWidth, rockHeight);
    ctx.fillStyle = '#FF00FF';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "17px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawGameOver() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("GAME OVER!", 250, 250);
}

function move () {
    if (rightPressed && charX < canvas.width - charWidth - wallWidth - 4) {
        charX += 8;
    }
    else if (leftPressed && charX > 0 + wallWidth + 4) {
        charX -= 8;
    }
}

function scoreCalc() {
    for (var i = 0; i < rockFall.length; i++) {
        rockFall[i] += dy[i];

        if(rockFall[i] + rockHeight >= canvas.height - floorHeight) {
            rockStart[i] = getRandomX();
            rockFall[i] = 0;
            score += 5;
        }
        
        if(score % 50 === 0 && score > 0) {
            dy[i] += 0.05;
        }
        
    }
} 

function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFloor();
    drawWalls();
    drawChar();
    drawScore();
    drawRock1();
    drawRock2();
    drawRock3();
    drawRock4();
    drawRock5();
    move();
    scoreCalc();

    for (var i = 0; i < rockFall.length; i++) {
        if(rockFall[i] + rockHeight >= canvas.height - floorHeight - charHeight - 2) {
            if(rockStart[i] + rockWidth >= charX && rockStart[i] <= charX + charWidth) {
                gameOverSound.play();
                drawGameOver();
                return;       
            }  
        }
           
        
    }
    
     requestAnimationFrame(draw);
}


function getRandomX() {
    return Math.floor( Math.random() * (canvas.width - rockWidth )) + 1;
  }

  function reloadPage() {
    document.location.reload();d  
    }

function keyDownHandler(e) {
    if(e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = true;
    }
    else if(e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = false;
    }
    else if(e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = false;
    }
}

document.addEventListener('touchstart', handleTouchEvent1, false);
document.addEventListener('touchmove', handleTouchEvent, false);
document.addEventListener('touchend', handleTouchEvent, false);
document.addEventListener('touchcancel', handleTouchEvent, false);

function handleTouchEvent(e) {
    if (e.touches.length === 0 ) return;
    e.preventDefault();
    e.stopPropagation();
    var touch = e.touches[0];
    charX = touch.pageX - charWidth;
}

function handleTouchEvent1(e) {
    if (e.touches.length === 0 ) return;
    gameOverSound.play();
    gameOverSound.pause();
}

draw();




