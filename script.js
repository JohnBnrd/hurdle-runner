const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const groundHeight = 40;
const runnerWidth = 40;
const runnerHeight = 50;
const runnerX = 100;
const groundY = canvas.height - groundHeight;
const runnerY = groundY - runnerHeight;
// Track
ctx.fillStyle = "tomato";
ctx.fillRect(0, groundY, canvas.width, groundHeight);

// Runner
ctx.fillStyle = "black";
ctx.fillRect(runnerX, runnerY, runnerWidth, runnerHeight);

// Add Hurdles
const hurdleHeight = 50;
let hurdleWidth = 20;
let hurdleSpeed = 0.90;
let hurdleX = canvas.width - hurdleWidth;
let hurdleY = groundY - hurdleHeight;


function gameLoop() {
    
    ctx.clearRect(0, 0 , canvas.width, canvas.height); // 1. Clear
    
    hurdleX = hurdleX - hurdleSpeed;
    ctx.fillStyle = "red";            
    ctx.fillRect(hurdleX, hurdleY, hurdleWidth, hurdleHeight);  // 2. Update

    ctx.fillStyle = "tomato"; 
    ctx.fillRect(0, groundY, canvas.width, groundHeight); // 3. Draw

    ctx.fillStyle = "black";
    ctx.fillRect(runnerX, runnerY, runnerWidth, runnerHeight); // 3. Draw 

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
