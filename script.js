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