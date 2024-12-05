const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let wrongCount = 0;
const totalPairs = cards.length / 2;

var modal = document.getElementById("modal");
var result_msg = document.getElementById("result");


// AUDIOS
const correctSound = document.getElementById('correct-sound');
const fallSound = document.getElementById('fall-sound');
const attemptsElement = document.getElementById('attempts');
const correctElement = document.getElementById('correct');
const wrongElement = document.getElementById('wrong');

// JOGADOR
const nomeJogador = localStorage.getItem('nomeJogador');
let jogador = document.getElementById("jogador");

jogador.innerHTML = "Olá " + nomeJogador + ", DIVIRTA-SE!!!";

// get and sets

function getAttempts() {
    let attempts = document.getElementById('attempts').textContent;
    attempts = parseInt(attempts);
    return attempts;
}

function setAttempts(newAttempts) {
    document.getElementById('attempts').textContent = newAttempts;
}

function getWin() {
    // Verifica se todas as cartas estão marcadas como 'flipped' (ou 'matched', conforme a implementação)
    const matchedCards = document.querySelectorAll('.card.flipped'); // ou .matched, dependendo da sua classe para cartas pareadas
    return matchedCards.length / 2;  // Retorna o número de pares
}

// Diminuir quando erra
function subtractAttempts() {
    let attempts = getAttempts();
    attempts--;
    if (attempts == 0) {
        gameOver('lose');
    }
    setAttempts(attempts);
}

// Embaralhamento das cartas
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

// Função para virar o card
function flipCard() {
    if (lockBoard) return; // Não permitir virar mais de duas cartas
    if (this === firstCard) return; // Impedir duplo clique na mesma carta

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        // Primeira carta virada
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Segunda carta virada
    secondCard = this;
    lockBoard = true; // Bloquear o tabuleiro até verificar o par
    checkMatch();
}

// Verificar se as cartas formam um par
function checkMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();

    if (isMatch) {
        correctSound.play();
        subtractAttempts();
        correctElement.textContent = getWin();

        if (getWin() === totalPairs) {
            gameOver('win');  // Verifica se todos os pares foram encontrados
        }

    } else {
        unflipCards();
        wrongCount++;
        wrongElement.textContent = wrongCount;
        fallSound.play();
        subtractAttempts();
    }
}

// Desabilitar cartas viradas (par encontrado)
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Desvirar cartas (par não encontrado)
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Resetar o tabuleiro para a próxima jogada
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Função para finalizar o jogo
function gameOver(result) {
    
    setTimeout(() => {
        if (result === 'win') {
            result_msg.innerHTML = 'Parabéns ' + localStorage.getItem("nomeJogador") + ' !!! <br> Você encontrou todos os pares e ganhou o jogo!';
        } else if (result === 'lose') {
            result_msg.innerHTML = 'Fim de jogo' + localStorage.getItem("nomeJogador") + '! <br> Você esgotou suas tentativas.';
        }
        
        modal.style.display = "block"
    }, 500);  // Exibe o alerta com um pequeno atraso para permitir que a última carta vire completamente


}

cards.forEach(card => card.addEventListener('click', flipCard));


// Desativar o botão direito do mouse
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Bloquear teclas específicas (como F12 para inspecionar)
document.addEventListener('keydown'), function (e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
    }
}

function menuPagina() {

    location.href = "/menuAxie.html";
}

// NOME JOGADOR



