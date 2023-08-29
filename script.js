const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const countElement = document.getElementById('count');
const timeCounter = document.getElementById('time-counter');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const lastStartTimeElement = document.getElementById('last-start-time');

let count = 0;
let startTime = null;
let countInterval = null; // To store the interval reference
const increment = 0.00092708;

function updateCounter() {
  const now = new Date().getTime();
  const timePassed = now - startTime;

  const days = Math.floor(timePassed / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timePassed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timePassed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timePassed % (1000 * 60)) / 1000);

  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}

function startCountup() {
  startTime = new Date().getTime();
  lastStartTimeElement.textContent = `Last Start: ${new Date(startTime).toLocaleString()}`;

  countInterval = setInterval(() => {
    count += increment;
    countElement.textContent = count.toFixed(8);
    updateCounter();
  }, 1000);

  startButton.disabled = true;
  resetButton.disabled = false;
}

function resetCountup() {
  clearInterval(countInterval);
  count = 0;
  countElement.textContent = count.toFixed(8);
  daysElement.textContent = '0';
  hoursElement.textContent = '0';
  minutesElement.textContent = '0';
  secondsElement.textContent = '0';
  lastStartTimeElement.textContent = 'Last Start: Not started yet';
  startButton.disabled = false;
  resetButton.disabled = true;
  countInterval = null; // Clear the interval reference
}

startButton.addEventListener('click', startCountup);
resetButton.addEventListener('click', resetCountup);
