// define html element
const board = document.getElementById("game-board");
const instructionText = document.getElementById('instruction-text');

// define game variables
const gridSize = 20;
let snake = [{x: 10, y: 12}]
let food = generateFood();
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200; //in ms
let gameStarted = false;

function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
}
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    })
}

// snake or food cubes 
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// set position of snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

//testing drawfunc
//draw();

//draw food func
function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

//generate food
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return {x, y};
}

//moving snake
function move() {
    const head = {...snake[0]};
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        increaseSpeed();
        clearInterval();
        gameInterval = setInterval(() => {
            move();
            // checkCollision();
            draw();
        }, gameSpeedDelay);
    }
    else {
        snake.pop();
    }
}
//test moving
// setInterval(() => {
//     move();
//     draw();
// }, 200)

//start game func
function startGame() {
    gameStarted = true; //keep track of running game
    instructionText.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        //checkCollision();
        draw();
    }, gameSpeedDelay)
}

// kepress
function handleKeyPress(event) {
    if ((!gameStarted && event.code === 'Space') || !gameStarted && event.key === ' ') {
        startGame();
    }
    else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
    // console.log(gameSpeedDelay);
    // if (gameSpeedDelay > 150) {
    //     gameSpeedDelay -= 5;
    // }
}

// https://www.youtube.com/watch?v=uyhzCBEGaBY 1:16:46