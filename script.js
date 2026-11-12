const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status'); // Alterado para querySelector já que é uma classe no HTML
const restartBtn = document.querySelector('.botao');  // Ajustado para selecionar pela classe correta

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true; // Mantido em inglês para combinar com o resto da lógica

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

iniciarGame();

function iniciarGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked)); // Nome corrigido para cellClicked
    restartBtn.addEventListener('click', restartGame);                   // Nome corrigido para restartGame
    statusText.textContent = `Vez do Jogador: ${currentPlayer}`;
}

function cellClicked() {
    const cellIndex = this.getAttribute("data-index");

    // Se a célula já estiver preenchida ou o jogo acabou, não faz nada
    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `Vez do jogador: ${currentPlayer}`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Jogador ${currentPlayer} venceu! 🎉`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Empate! 🤝`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Vez do jogador: ${currentPlayer}`;
    running = true;
    cells.forEach(cell => cell.textContent = "");
}