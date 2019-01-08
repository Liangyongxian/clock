var dom = document.getElementById("clock");
var ctx = dom.getContext('2d');
var height = ctx.canvas.height;
var width = ctx.canvas.width;
var r = width / 2;
var rem = width / 200;

function drawBackground() {
    ctx.save();
    ctx.translate(r, r);
    ctx.beginPath();
    ctx.lineWidth = 10 * rem;
    ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI);
    ctx.stroke();

    
    var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];

    hourNumbers.forEach(function (num, i) {
        var rad = 2 * Math.PI / 12 * i;
        var x = Math.cos(rad) * (r - 30*rem);
        var y = Math.sin(rad) * (r - 30*rem);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = 18*rem+"px Arial";
        ctx.fillText(num, x, y);
    });

    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 18*rem);
        var y = Math.sin(rad) * (r - 18*rem);
        ctx.beginPath();
        if (i % 5 === 0) {
            ctx.arc(x, y, 2*rem, 0, 2 * Math.PI, false);
            ctx.fillStyle = "#000";
        } else {
            ctx.fillStyle = "#ccc";
            ctx.arc(x, y, 2*rem, 0, 2 * Math.PI, false);
        }
        ctx.fill();
    }
}

function drawHour(hour, min) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 / 60 * min;
    var sum = rad + mrad;
    ctx.rotate(sum);
    ctx.lineWidth = 6*rem;
    ctx.lineCap = "round";
    ctx.moveTo(0, 10*rem);
    ctx.lineTo(0, -r / 2);
    ctx.stroke();
    ctx.restore();
}

function drawMin(min) {
    ctx.save();
    var mrad = 2 * Math.PI / 60 * min;
    ctx.beginPath();
    ctx.rotate(mrad);
    ctx.lineWidth = 3*rem;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -r + 30*rem);
    ctx.stroke();
    ctx.restore();
}

function drawSec(sec) {
    ctx.save();
    var srad = 2 * Math.PI / 60 * sec;
    ctx.beginPath();
    ctx.fillStyle = "#c14543"
    ctx.rotate(srad);
    ctx.lineWidth = 3*rem;
    ctx.moveTo(-2*rem, 20*rem);
    ctx.lineTo(2*rem, 20*rem);
    ctx.lineTo(1*rem, -r + 18*rem);
    ctx.lineTo(-1*rem, -r + 18*rem);
    ctx.fill();
    ctx.restore();
}

function drawDot() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.fillStyle = "#fff";
    ctx.arc(0, 0, 3*rem, 0, 2 * Math.PI);
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    drawBackground();
    drawHour(hour, min);
    drawMin(min);
    drawSec(sec);
    drawDot();
    ctx.restore();
}

draw();
setInterval(draw, 1000);










