let mordida = new Audio('mordida.mp3');
let placar = document.getElementById("titulo");
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let tamanho = 32;
let pontuacao = 0;
let cobrinha = [];
criarCobrinha();
let direcao = "d";
let comida = {
    x: posicaoAleatoria(),
    y: posicaoAleatoria()
}
function posicaoAleatoria() {
    return Math.floor(Math.random() * 15 + 1) * tamanho;
}

function criarBG() {
    context.fillStyle = "tan";
    context.fillRect(0, 0, 16 * tamanho, 16 * tamanho);
    placar.innerHTML = "Jogo da Cobrinha => "+pontuacao+" pontos";
}

function criarCobrinha() {
    cobrinha = [];
    cobrinha[0] = {
        x: 8 * tamanho,
        y: 8 * tamanho
    }
}

function pintarCobrinha() {
    for (i = 0; i < cobrinha.length; i++) {
        context.fillStyle = "green";
        context.fillRect(cobrinha[i].x, cobrinha[i].y, tamanho, tamanho);
    }
}

function criarComida() {
    comida.x = posicaoAleatoria();
    comida.y = posicaoAleatoria();
}

function adicionarComida() {
    context.fillStyle = "red";
    context.fillRect(comida.x, comida.y, tamanho, tamanho);
}

document.addEventListener('keydown', movimento);

function movimento(event) {
    if (event.keyCode == 37 && direcao != "d") direcao = "e";
    if (event.keyCode == 38 && direcao != "b") direcao = "c";
    if (event.keyCode == 39 && direcao != "e") direcao = "d";
    if (event.keyCode == 40 && direcao != "c") direcao = "b";
}

function comer(){
    pontuacao++;
    criarComida();
    mordida.play();
}
function finalJogo() {
    clearInterval(jogo);
    let resposta = window.confirm("Fim de jogo! Você fez "+pontuacao+" pontos. Reiniciar ?")
    if (resposta) {
        criarCobrinha();
        jogo = setInterval(iniciarJogo, 200);
        pontuacao = 0;
    }

}

function iniciarJogo() {
    if (cobrinha[0].x < 0 && direcao == "e") cobrinha[0].x = 16 * tamanho;
    if (cobrinha[0].y < 0 && direcao == "c") cobrinha[0].y = 16 * tamanho;
    if (cobrinha[0].x > 15 * tamanho && direcao == "d") cobrinha[0].x = 0;
    if (cobrinha[0].y > 15 * tamanho && direcao == "b") cobrinha[0].y = 0;

    for (posicao = 3; posicao < cobrinha.length; posicao++) {
        if (cobrinha[0].x == cobrinha[posicao].x && cobrinha[0].y == cobrinha[posicao].y) {
            finalJogo();
        }
    }
    criarBG();
    pintarCobrinha();
    adicionarComida();

    let cobrinhaX = cobrinha[0].x;
    let cobrinhaY = cobrinha[0].y;

    if (direcao == 'd') cobrinhaX += tamanho;
    if (direcao == 'e') cobrinhaX -= tamanho;
    if (direcao == 'c') cobrinhaY -= tamanho;
    if (direcao == 'b') cobrinhaY += tamanho;

    if (cobrinhaX != comida.x || cobrinhaY != comida.y) {
        cobrinha.pop();
    } else {
        comer();
    }

    let novaCabeca = {
        x: cobrinhaX,
        y: cobrinhaY
    }

    cobrinha.unshift(novaCabeca);
}

alert("Vamos começar!");
let jogo = setInterval(iniciarJogo, 200);
