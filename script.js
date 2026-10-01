const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const groundHeight = 40;
const runnerWidth = 40;
const runnerHeight = 50;
const runnerX = 100;
const groundY = canvas.height - groundHeight;
const runnerGroundY = groundY - runnerHeight;
let runnerY = runnerGroundY;
let runnerSpeedY = 0;
const gravity = 0.6;
const jumpPower = -12;

// Track
ctx.fillStyle = "tomato";
ctx.fillRect(0, groundY, canvas.width, groundHeight);

// Runner
ctx.fillStyle = "black";
ctx.fillRect(runnerX, runnerY, runnerWidth, runnerHeight);

// Add Hurdles
const hurdleHeight = 50;
let hurdleWidth = 20;
let hurdleSpeed = 5;
let hurdleX = canvas.width;
let hurdleY = groundY - hurdleHeight;


function gameLoop() {
    // 1. Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 2. Update
    hurdleX = hurdleX - hurdleSpeed;
    if(hurdleX + hurdleWidth <= 0){
        hurdleX = canvas.width;
    }
    runnerSpeedY = runnerSpeedY + gravity;
    runnerY = runnerY + runnerSpeedY;
    if (runnerY >= runnerGroundY ) {
        runnerY = runnerGroundY;
        runnerSpeedY = 0;
    }


    // 3. Draw hurdle
    ctx.fillStyle = "red";          
    ctx.fillRect(hurdleX, hurdleY, hurdleWidth, hurdleHeight); 
    // 3. Draw track
    ctx.fillStyle = "tomato"; 
    ctx.fillRect(0, groundY, canvas.width, groundHeight); 
    // 3. Draw runner
    ctx.fillStyle = "black"; 
    ctx.fillRect(runnerX, runnerY, runnerWidth, runnerHeight); 

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && runnerY >= runnerGroundY ) {
        event.preventDefault();
        runnerSpeedY = jumpPower;
    }

});