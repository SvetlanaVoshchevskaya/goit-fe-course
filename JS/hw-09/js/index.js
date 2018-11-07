'use strict';

const btnStart = document.querySelector('.js-start');
const timeClock = document.querySelector('.js-time');
const btnReset = document.querySelector('.js-reset');
const btnlap = document.querySelector('.js-take-lap');
const ul = document.querySelector('.js-laps');

const arr = [];

const timer = {
  startTime: null,
  deltaTime: null,
  pauseTime: null,
  id: null,

  isActive: false,
  startClock(upDate) {
    if (!this.isActive) {
      this.isActive = true;
      this.startTime = Date.now();
      this.id = setInterval(() => {
        let currentTime = Date.now();
        this.deltaTime = currentTime - this.startTime + this.pauseTime;
        upDate(this.deltaTime);
      }, 100);

      if (this.isActive === true) {
        pause(this.pauseTime);
        this.pauseTime = this.deltaTime;
        this.isActive = true;
      }
    } else {
      this.startTime = this.deltaTime + Date.now();
      onContinue(this.deltaTime);
      clearInterval(this.id);
      this.isActive = false;
    }
  },
  resetClock(upDate) {
    this.isActive = false;
    clearInterval(this.id);
    this.startTime = null;
    this.id = null;
    this.pauseTime = null;
    this.deltaTime = null;
    upDate(this.deltaTime);
    onStart(this.deltaTime);
  },
  onLap() {
    arr.push(this.deltaTime);
    onArr();
  }
};

let time = timer.startTime;

function getFormattedTime(time) {
  const setMin = Math.floor((time / 1000 / 60) % 60);
  const Min = setMin >= 10 ? setMin : `0${setMin}`;
  const setSec = Math.floor((time / 1000) % 60);
  const Sec = setSec >= 10 ? setSec : `0${setSec}`;
  const setMillisec = Math.floor((time / 100) % 10);
  return `${Min}:${Sec}.${setMillisec}`;
}
function upDateClock(time) {
  timeClock.textContent = getFormattedTime(time);
}
function pause() {
  btnStart.textContent = 'Pause';
}
function onContinue() {
  btnStart.textContent = 'Continue..';
}
function onStart() {
  btnStart.textContent = 'Start';
}
function onArr() {
  const li = document.createElement('li');
  for (let el of arr) {
    li.textContent = el;
    ul.append(li);
  }
}
btnStart.addEventListener(
  'click',
  timer.startClock.bind(timer, upDateClock, pause, onContinue, onStart)
);
btnReset.addEventListener('click', timer.resetClock.bind(timer, upDateClock));
btnlap.addEventListener('click', timer.onLap.bind(timer, onArr));
