let board = [['', '', ''], ['', '', ''], ['', '', '']];
let currentPlayer = 'X';
let prompt = document.getElementById('prompt');
let reset = document.getElementById('reset');


function setup() {
    createCanvas(300, 300);
}

function draw() {
    background(255);
    drawBoard();
    let result = checkResult();
    reset.style.display = result !== null ? 'block' : 'none';
    if (result !== null) {
        if (result === 'X') {
            prompt.innerHTML = 'X wins!';
        } else if (result === 'O') {
            prompt.innerHTML = 'O wins! (AI)';
        } else if (result === 'tie') {
            prompt.innerHTML = "It's a tie!";
        }

    } else if (currentPlayer === 'O') {
        makeAIMove();
    }
}

function drawBoard() {

    prompt.innerHTML = currentPlayer === 'X' ? "Your turn (X)" : "";

    let w = width / 3;
    let h = height / 3;
    strokeWeight(4);
    for (let i = 1; i < 3; i++) {
        let pos = i * w;
        line(pos, 0, pos, height);
        line(0, pos, width, pos);
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = w * j + w / 2;
            let y = h * i + h / 2;
            let spot = board[i][j];
            textSize(32);
            textAlign(CENTER, CENTER);
            if (spot === 'X') {
                drawX(x, y, w, h);
            } else if (spot === 'O') {
                drawO(x, y, w, h);
            }
        }
    }
}

function drawX(x, y, w, h) {
    let offset = w / 4;
    line(x - offset, y - offset, x + offset, y + offset);
    line(x + offset, y - offset, x - offset, y + offset);
}

function drawO(x, y, w, h) {
    noFill();
    ellipse(x, y, w / 2, h / 2);
}

function makeAIMove() {
    if (checkResult()) return;

    makeRandomMove();
}

function makeRandomMove() {
    let i = floor(random(3));
    let j = floor(random(3));
    if (board[i][j] === '') {
        board[i][j] = currentPlayer;
        currentPlayer = 'X';
    } else {
        makeRandomMove();
    }
}

function checkResult() {
    for (let i = 0; i < 3; i++) {
        if (checkRowWin(i)) return board[i][0];
        if (checkColumnWin(i)) return board[0][i];
    }
    if (checkDiagonalWin()) return board[0][0];
    if (checkAntiDiagonalWin()) return board[2][0];
    if (checkTie()) return 'tie';
    return null;
}

function checkRowWin(row) {
    return (
        board[row][0] !== '' &&
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2]
    );
}

function checkColumnWin(column) {
    return (
        board[0][column] !== '' &&
        board[0][column] === board[1][column] &&
        board[1][column] === board[2][column]
    );
}

function checkDiagonalWin() {
    return (
        board[0][0] !== '' &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]
    );
}

function checkAntiDiagonalWin() {
    return (
        board[2][0] !== '' &&
        board[2][0] === board[1][1] &&
        board[1][1] === board[0][2]
    );
}

function checkTie() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

function resetGame() {
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    currentPlayer = 'X';
    prompt.innerHTML = "X's turn";
}

function mousePressed() {

    if (checkResult()) return;


    if (currentPlayer === 'X') {
        let i = floor(mouseY / (height / 3));
        let j = floor(mouseX / (width / 3));
        if (board[i][j] === '') {
            board[i][j] = currentPlayer;
            currentPlayer = 'O';
        }
    }
}
