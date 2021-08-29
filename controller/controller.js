const content = document.querySelector(".content");
const container = document.querySelector(".container");
const cross = document.querySelector(".cross");
const circle = document.querySelector(".circle");
const endGame = document.querySelector(".endGame");
let strEnd = endGame.children[0];

function cloneElement() {
    if (content.lastElementChild.classList[0] == "cross") {
        return circle.cloneNode();
    } else {
        return cross.cloneNode();
    }
}

function whichBlock(element, x, y) {
    let firstColumnX = Math.round(screen.width / 3);
    let firstColumnY = Math.round(screen.height / 3);

    let secondColumnX = Math.round((screen.width / 3) * 2);
    let secondColumnY = Math.round((screen.height / 3) * 2);

    if (y <= firstColumnY) {
        if (x <= firstColumnX && fillBlock(1, element)) {
            // Block 1:1
            element.classList.add("block-1");
        } else if (x <= secondColumnX && fillBlock(2, element)) {
            // Block 2:1
            element.classList.add("block-2");
        } else if (fillBlock(3, element)) {
            // Block 3:1
            element.classList.add("block-3");
        }
    } else if (y <= secondColumnY) {
        if (x <= firstColumnX && fillBlock(4, element)) {
            // Block 1:2
            element.classList.add("block-4");
        } else if (x <= secondColumnX && fillBlock(5, element)) {
            // Block 2:2
            element.classList.add("block-5");
        } else if (fillBlock(6, element)) {
            // Block 3:2
            element.classList.add("block-6");
        }
    } else {
        if (x <= firstColumnX && fillBlock(7, element)) {
            // Block 1:3
            element.classList.add("block-7");
        } else if (x <= secondColumnX && fillBlock(8, element)) {
            // Block 2:3
            element.classList.add("block-8");
        } else if (fillBlock(9, element)) {
            // Block 3:3
            element.classList.add("block-9");
        }
    }
}

function fillBlock(blockN, element) {
    let block = document.querySelectorAll(`.block-${blockN}`);
    if (block.length != 1) {
        element.classList.remove("hidden");
        return true;
    } else {
        element.remove();
        return false;
    }
}

function drawGame() {
    let block;
    let cont = 0;
    for (let i = 1; i < 10; i++) {
        block = document.querySelectorAll(`.block-${i}`);
        if (block.length == 1) {
            cont++;
        }
    }

    if (cont == 9) {
        endGame.classList.remove("hidden");
        strEnd.textContent = "O jogo empatou!";
    }
}

function checkLine(contCirc, contCross, block) {
    for (let i = 0; i < 3; i++) {
        contCirc = 0;
        contCross = 0;
        for (let j = i * 3 + 1; j <= i * 3 + 3; j++) {
            block = document.querySelectorAll(`.block-${j}`);
            if (block.length != 0) {
                if (block[0].classList[0] == "circle") {
                    contCirc++;
                } else {
                    contCross++;
                }
            }
        }
        if (contCirc == 3) {
            return "vermelho";
        } else if (contCross == 3) {
            return "verde";
        }
    }
    return 0;
}

function checkColumn(contCirc, contCross, block) {
    for (let i = 1; i < 4; i++) {
        contCirc = 0;
        contCross = 0;
        for (let j = i; j <= i + 6; j += 3) {
            block = document.querySelectorAll(`.block-${j}`);
            if (block.length != 0) {
                if (block[0].classList[0] == "circle") {
                    contCirc++;
                } else {
                    contCross++;
                }
            }
        }
        if (contCirc == 3) {
            return "vermelho";
        } else if (contCross == 3) {
            return "verde";
        }
    }
    return 0;
}

function checkDiagonal(contCirc, contCross, block) {
    for (let i = 0; i < 2; i++) {
        contCirc = 0;
        contCross = 0;
        for (let j = 1; j < 10; j += 2) {
            if (i == 1 && j == 1) {
                j += 2;
            }
            block = document.querySelectorAll(`.block-${j}`);
            if (block.length != 0) {
                if (block[0].classList[0] == "circle") {
                    contCirc++;
                } else {
                    contCross++;
                }
            }
            if (i == 0) {
                j += 2;
            }
        }
        if (contCirc == 3) {
            return "vermelho";
        } else if (contCross == 3) {
            return "verde";
        }
    }
    return 0;
}

function whoWin() {
    let contCirc;
    let contCross;
    let block;

    let result = {
        line: checkLine(contCirc, contCross, block),
        column: checkColumn(contCirc, contCross, block),
        diagonal: checkDiagonal(contCirc, contCross, block),
    };

    if (result.line != 0) {
        return result.line;
    } else if (result.column != 0) {
        return result.column;
    } else if (result.diagonal != 0) {
        return result.diagonal;
    } else {
        return 0;
    }
}

screen.addEventListener("click", function (e) {
    let gameResult;
    content.appendChild(cloneElement());
    whichBlock(content.lastElementChild, e.offsetX, e.offsetY);
    gameResult = whoWin();
    if (gameResult != 0) {
        strEnd.textContent = `O jogador ${gameResult} ganhou!`;
        endGame.classList.remove("hidden");
    } else {
        drawGame();
    }
});

endGame.children[2].addEventListener("click", () => {
    window.location.reload();
});
