let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "rigth";

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

document.addEventListener('keydown', update);

function update(event){
    if (event.keyCode == 37 && direction != "r") direction = "l";
    if (event.keyCode == 38 && direction != "d") direction = "u";
    if (event.keyCode == 39 && direction != "l") direction = "r";
    if (event.keyCode == 40 && direction != "u") direction = "d";
}

function iniciarJogo(){
    if (snake[0].x < 0 && direction == "l") snake[0].x = 16 * box;
    if (snake[0].y < 0 && direction == "u") snake[0].y = 16 * box;
    if (snake[0].x > 15 * box && direction == "r") snake[0].x = 0;
    if (snake[0].y > 15 * box && direction == "d") snake[0].y = 0;

    criarBG();
    criarCobrinha();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'r') snakeX += box;
    if (direction == 'l') snakeX -= box;
    if (direction == 'u') snakeY -= box;
    if (direction == 'd') snakeY += box;

    snake.pop();

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo,200);
