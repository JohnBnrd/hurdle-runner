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

// Add Hurdles
const hurdleHeight = 50;
const hurdleWidth = 20;
const hurdleSpeed = 5;
let hurdleX = canvas.width;
const hurdleY = groundY - hurdleHeight;

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
    if (runnerX + runnerWidth >= hurdleX && 
    runnerX <= hurdleX + hurdleWidth &&
    runnerY + runnerHeight >= hurdleY &&
    runnerY <= hurdleY + hurdleHeight)
    {
    console.log("Collision !");
    }
    
    // 3. Draw
    // Hurdle
    ctx.fillStyle = "red";          
    ctx.fillRect(hurdleX, hurdleY, hurdleWidth, hurdleHeight); 
    
    // Track
    ctx.fillStyle = "tomato"; 
    ctx.fillRect(0, groundY, canvas.width, groundHeight); 
    
    // Runner
    ctx.fillStyle = "black"; 
    ctx.fillRect(runnerX, runnerY, runnerWidth, runnerHeight); 
    
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        event.preventDefault();
        if (runnerY >= runnerGroundY){
            runnerSpeedY = jumpPower;
        }
    }
});