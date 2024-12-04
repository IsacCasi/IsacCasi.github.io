// Verificar se é um par
const totalPairs = cards.length / 2;
const correctSound = document.getElementById('correct-sound');
const fallSound = document.getElementById('fall-sound');
function checkMatch() {
    let Match = firstCard.dataset.name === secondCard.dataset.name;

    if (Match) {

        disableCards();
        correctCount++;
        correctElement.textContent = correctCount;
        correctSound.play();

    } else {
        unflipCards();
        wrongCount++;
        wrongElement.textContent = wrongCount;
        fallSound.play();
    }

    attemptsLeft--;
    attemptsElement.textContent = attemptsLeft;

    if (attemptsLeft === 0 && correctCount < totalPairs) {
        setTimeout(() => {
            displayGameOverMessage();
        }, 1000);
    }
}

// Desabilitar cards que são pares
// function disableCards() {
//     firstCard.classList.add('matched');
//     secondCard.classList.add('matched');
//     resetBoard();
// }

// // Desvirar os cards se não forem pares
// function unflipCards() {
//     lockBoard = true;
//     setTimeout(() => {
//         firstCard.classList.remove('flipped');
//         secondCard.classList.remove('flipped');
//         resetBoard();
//     }, 1500);
// }