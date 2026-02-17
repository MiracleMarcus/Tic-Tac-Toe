const board = Array(9).fill(null)
let currentPlayer = "X"
let gameOver = false;
let xScore = 0;
let oScore = 0;

const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");
const items = document.querySelectorAll(".item")
const statusEl = document.getElementById("status")


function checkWin(player) {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // cols
        [0,4,8],[2,4,6]          // diagonals
    ];
    return wins.some(([a,b,c]) => board[a] === player && board[b] === player && board[c] === player);
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
    items.forEach(item => {
        item.textContent = "";
        item.classList.remove("x", "o");
    });
    statusEl.textContent = "Player X's turn";
    updateStatusColor();
    gameOver = false;
});