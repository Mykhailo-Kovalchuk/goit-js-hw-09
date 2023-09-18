const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.body;

let intervalId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };


const hendler = () => {
    btnStart.disabled = true;
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

btnStart.addEventListener('click', hendler);

btnStop.addEventListener('click', () => {
        clearInterval(intervalId);
        btnStart.disabled = false;
    });

