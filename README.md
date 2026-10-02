# Hurdle Runner

A 2D browser game where a sprinter jumps over incoming hurdles. The race gets faster with every hurdle cleared: how long can you last?

Built from scratch in vanilla JavaScript with the HTML Canvas API, without any game engine.

## Play online

Coming soon.

## How to play

- Press **Space** to jump over the hurdles
- Touching a hurdle ends the race
- Press **Space** again to restart after a game over

## Features

- Game loop running with `requestAnimationFrame`
- Jump physics with gravity and landing detection
- Collision detection between the runner and the hurdles
- Score that increases as long as the runner survives
- Progressive difficulty: the hurdles speed up after each one, up to a maximum speed
- Game over screen with instant restart

## Built with

- HTML5 Canvas
- JavaScript (ES6), no libraries or frameworks

## Run locally

Clone the repository, then open `index.html` in your browser.

## What I learned

## What I learned

- **Game loop architecture:** How to structure each frame into three steps (clear, update, draw) inside a game loop driven by requestAnimationFrame, ensuring smooth animations.
- **2D Collision detection:** How AABB (Axis-Aligned Bounding Box) collision detection works by checking horizontal and vertical overlap simultaneously on both axes.
- **Jump physics and gravity:** How to simulate physical movement using speed, acceleration, and ground detection variables (`runnerY`, `runnerSpeedY`, `gravity`).
- **State management & resetting:** How to manage global game states (`isGameOver`) and reset all dynamic variables cleanly without re-declaring them with `let`.
