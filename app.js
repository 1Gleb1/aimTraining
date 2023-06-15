const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const restart = document.querySelector("#restart");

const colors = ["#8ef6e4", "#9896f1", "#d59bf6", "#edb1f1"];
let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = +event.target.getAttribute("data-time");
    selectTime = time;
  }
  screens[1].classList.add("up");

  startGame();
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) current = "0" + current;
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
  timeEl.parentNode.classList.add("hide");
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const { width, height } = board.getBoundingClientRect();
  const size = getRandomNumber(15, 60);
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = `#${getRandomNumber(100000, 999999)}`;

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = color;
  circle.style.boxShadow = "0 0 2px #fff, 0 0 5px #fff";

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
