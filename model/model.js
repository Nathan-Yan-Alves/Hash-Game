const screen = document.querySelector("#screen");
const ctx = screen.getContext("2d");

function hash() {
    ctx.lineWidth = 5;
    ctx.lineStyle = "Black";
    ctx.fillStyle = "Beige";

    ctx.beginPath();
    ctx.fillRect(0, 0, 500, 500);

    ctx.beginPath();
    ctx.moveTo(screen.width / 3, 0);
    ctx.lineTo(screen.width / 3, screen.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo((screen.width / 3) * 2, 0);
    ctx.lineTo((screen.width / 3) * 2, screen.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, screen.height / 3);
    ctx.lineTo(screen.width, screen.height / 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, (screen.height / 3) * 2);
    ctx.lineTo(screen.width, (screen.height / 3) * 2);
    ctx.stroke();
}

hash();
