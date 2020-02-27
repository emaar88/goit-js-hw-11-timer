class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.isActive = false;
    this.timerId = null;
    this.selector = selector;
    this.delta = targetDate;
    this.startBtn = document.querySelector('button[data-action="start"]');
    this.stopBtn = document.querySelector('button[data-action="stop"]');
    this.secs = document.querySelector('span[data-value="secs"]');
    this.mins = document.querySelector('span[data-value="mins"]');
    this.hours = document.querySelector('span[data-value="hours"]');
    this.days = document.querySelector('span[data-value="days"]');
    this.action = this.action.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }
  action() {
    const time = this.delta - Date.now();
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    this.secs.textContent = secs < 10 ? `0${secs}` : secs;
    this.mins.textContent = mins < 10 ? `0${mins}` : mins;
    this.hours.textContent = hours < 10 ? `0${hours}` : hours;
    this.days.textContent = days < 10 ? `0${days}` : days;
  }

  start() {
    if (!this.isActive) {
      this.isActive = true;
      this.timerId = setInterval(this.action, 10);
      this.dateStart = Date.now();
    }
  }
  stop() {
    clearInterval(this.timerId);
    this.isActive = false;
  }

  init() {
    window.addEventListener("DOMContentLoaded", this.start);
    this.startBtn.addEventListener("click", this.start);
    this.stopBtn.addEventListener("click", this.stop);
  }
}

const watch = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2020")
});

watch.init();
