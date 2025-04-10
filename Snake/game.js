const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restartButton");

const snakeSize = 10;
const canvasSize = 400;
let snake = [{ x: 150, y: 150 }];
let direction = 'RIGHT';
let food = { x: 0, y: 0 };
let score = 0;
let gameInterval;

function createFood() {
    food.x = Math.floor(Math.random() * (canvasSize / snakeSize)) * snakeSize;
    food.y = Math.floor(Math.random() * (canvasSize / snakeSize)) * snakeSize;
}

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });
}

function drawFood() {
    ctx.fillStyle = '#FF6347';
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function moveSnake() {
    let head = { ...snake[0] };

    switch (direction) {
        case 'UP': head.y -= snakeSize; break;
        case 'DOWN': head.y += snakeSize; break;
        case 'LEFT': head.x -= snakeSize; break;
        case 'RIGHT': head.x += snakeSize; break;
    }

    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        createFood();
    } else {
        snake.pop();
    }

    // Check for collisions with walls or self
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || isCollision(head)) {
        resetGame();
    }

    scoreDisplay.textContent = `Score: ${score}`;
}

function isCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

function resetGame() {
    clearInterval(gameInterval);
    alert(`Game Over! Your final score is: ${score}`);
    score = 0;
    snake = [{ x: 150, y: 150 }];
    direction = 'RIGHT';
    createFood();
    scoreDisplay.textContent = `Score: ${score}`;
    startGame();
}

function startGame() {
    gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    moveSnake();
    drawSnake();
    drawFood();
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== 'RIGHT') direction = 'LEFT';
    if (key === 38 && direction !== 'DOWN') direction = 'UP';
    if (key === 39 && direction !== 'LEFT') direction = 'RIGHT';
    if (key === 40 && direction !== 'UP') direction = 'DOWN';
}

function restartGame() {
    resetGame();
}

document.addEventListener('keydown', changeDirection);
restartButton.addEventListener('click', restartGame);

createFood();
startGame();
