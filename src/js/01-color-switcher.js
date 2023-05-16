const CHANGE_COLOR_DELAY = 1000;
let idInt = null;

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.btnStop.disabled = true;
refs.btnStart.addEventListener('click', changeColorStart);
refs.btnStop.addEventListener('click', changeColorStop);

function changeColorStart() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  idInt = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, CHANGE_COLOR_DELAY);
}

function changeColorStop() {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  clearInterval(idInt);
}

function ChangeColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}