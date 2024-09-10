const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');
const timerDisplay = document.getElementById('timer-display');
const timerLabel = document.getElementById('timer-label');

let workDuration = 25;
let breakDuration = 5;
let timer;
let isPaused = false;
let isWorking = true;
let remainingTime = workDuration * 60;

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer() {
  if (isPaused) {
    isPaused = false;
  } else {
    workDuration = parseInt(workDurationInput.value);
    breakDuration = parseInt(breakDurationInput.value);
    remainingTime = isWorking ? workDuration * 60 : breakDuration * 60;
  }

  timer = setInterval(updateTimer, 1000);
}

function pauseTimer() {
  isPaused = true;
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  isWorking = true;
  remainingTime = workDuration * 60;
  timerLabel.textContent = "Work";
  updateDisplay();
}

function updateTimer() {
  if (remainingTime <= 0) {
    isWorking = !isWorking;
    remainingTime = isWorking ? workDuration * 60 : breakDuration * 60;
    timerLabel.textContent = isWorking ? "Work" : "Break";
  } else {
    remainingTime--;
  }
  updateDisplay();
}

function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
