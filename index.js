const board = Array(9).fill(null)
let currentPlayer = "X"
let gameOver = false;
let xScore = 0;
let oScore = 0;

const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");


const items = document.querySelectorAll(".item")
const statusEl = document.getElementById("status")


function checkWin(currentPlayer) {
    if (board[0] === currentPlayer && board[1] === currentPlayer && board[2] === currentPlayer) {
        return true;
    }
    if (board[3] === currentPlayer && board[4] === currentPlayer && board[5] === currentPlayer) {
        return true;
    }
    if (board[6] === currentPlayer && board[7] === currentPlayer && board[8] === currentPlayer) {
        return true;
    }
    if (board[0] === currentPlayer && board[3] === currentPlayer && board[6] === currentPlayer) {
        return true;
    }
    if (board[1] === currentPlayer && board[4] === currentPlayer && board[7] === currentPlayer) {
        return true;
    }
    if (board[2] === currentPlayer && board[5] === currentPlayer && board[8] === currentPlayer) {
        return true;
    }
    if (board[0] === currentPlayer && board[4] === currentPlayer && board[8] === currentPlayer) {
        return true;
    }
    if (board[2] === currentPlayer && board[4] === currentPlayer && board[6] === currentPlayer) {
        return true;
    }
    return false;
}

function updateStatusColor(isWin = false) {
    statusEl.classList.remove("x-turn", "o-turn", "winner");
    
    if (isWin) {
        statusEl.classList.add("winner");
    } else if (currentPlayer === "X") {
        statusEl.classList.add("x-turn");
    } else {
        statusEl.classList.add("o-turn");
    }
}

updateStatusColor();

items.forEach(item => {
    item.addEventListener("click", () => {
        if (gameOver) return;
        const index = item.getAttribute("data-index")
        if (board[index] === null) {
            board[index] = currentPlayer
            item.textContent = currentPlayer;
            item.classList.add(currentPlayer.toLowerCase());
            if (checkWin(currentPlayer)) {
                statusEl.textContent = `Player ${currentPlayer} wins!`
                gameOver = true;

                // Update Score Logic
                if (currentPlayer === "X") {
                    xScore++;
                    scoreXEl.textContent = xScore;
                } else {
                    oScore++;
                    scoreOEl.textContent = oScore;
                }

                updateStatusColor(true);
                return;
            }
            if (board.every(cell => cell !== null)) {
                statusEl.textContent = "It's a tie!";
                return;
            }
            currentPlayer = currentPlayer === "X" ? "O" : "X"
            statusEl.textContent = `Player ${currentPlayer}'s turn`
            updateStatusColor();
        }
    })
})

document.getElementById("reset").addEventListener("click", () => {
    board.fill(null);
    currentPlayer = "X";
    items.forEach(item => item.textContent = "");
    statusEl.textContent = "Player X's turn";
    updateStatusColor();
    gameOver = false;
});