const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const groundHeight = 40;
const groundY = canvas.height - groundHeight;

const runnerWidth = 40;
const runnerHeight = 50;
const runnerX = 100;
const runnerGroundY = groundY - runnerHeight;
let runnerY = runnerGroundY;
let runnerSpeedY = 0;

const gravity = 0.6;
const jumpPower = -12;

let isGameOver = false;
let score = 0;

// Hurdles
const hurdleHeight = 50;
const hurdleWidth = 20;
const hurdleInitialSpeed = 5;
const hurdleAcceleration = 0.5;
const hurdleY = groundY - hurdleHeight;
const hurdleMaxSpeed = 60;
let hurdleSpeed = hurdleInitialSpeed;
let hurdleX = canvas.width;

function gameLoop() {
  // 1. Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Update
  if (!isGameOver) {
    score += 1;

    hurdleX = hurdleX - hurdleSpeed;
    if (hurdleX + hurdleWidth <= 0) {
      hurdleX = canvas.width;

      if (hurdleSpeed < hurdleMaxSpeed) {
        hurdleSpeed += hurdleAcceleration;
      }
    }

    runnerSpeedY = runnerSpeedY + gravity;
    runnerY = runnerY + runnerSpeedY;
    if (runnerY >= runnerGroundY) {
      runnerY = runnerGroundY;
      runnerSpeedY = 0;
    }

    if (
      runnerX + runnerWidth >= hurdleX &&
      runnerX <= hurdleX + hurdleWidth &&
      runnerY + runnerHeight >= hurdleY &&
      runnerY <= hurdleY + hurdleHeight
    ) {
      isGameOver = true;
    }
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

  // Score
  ctx.fillStyle = "green";
  ctx.textAlign = "left";
  ctx.font = "15px Arial";
  ctx.fillText("Score: " + score, 10, 20);

  // Game Over
  if (isGameOver) {
    ctx.fillStyle = "red";
    ctx.font = "32px Arial";
    ctx.textAlign = "center";

    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

    ctx.font = "15px Arial";
    ctx.fillText(
      "Press Space to restart",
      canvas.width / 2,
      canvas.height / 2 + 40,
    );
  }
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

function resetGame() {
  runnerY = runnerGroundY;
  runnerSpeedY = 0;
  hurdleX = canvas.width;
  isGameOver = false;
  score = 0;
  hurdleSpeed = hurdleInitialSpeed;
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault();

    if (isGameOver) {
      resetGame();
    } else if (runnerY === runnerGroundY) {
      runnerSpeedY = jumpPower;
    }
  }
});
