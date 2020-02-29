class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.isActive = false;
    this.timerId = null;
    this.selector = selector;
    this.delta = targetDate;
    this.action = this.action.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.markup = null;
  }
  createMarkup() {
    console.log(this.selector);
    const markup = document.querySelector(this.selector);
    markup.insertAdjacentHTML(
      "beforeend",
      `<div class="field">
        <span class="value" data-value="days">11</span>
        <span class="label">Days</span>
      </div>

      <div class="field">
        <span class="value" data-value="hours">11</span>
        <span class="label">Hours</span>
      </div>

      <div class="field">
        <span class="value" data-value="mins">11</span>
        <span class="label">Minutes</span>
      </div>

      <div class="field">
        <span class="value" data-value="secs">11</span>
        <span class="label">Seconds</span>
      </div>`
    );
    markup.insertAdjacentHTML(
      "afterend",
      `<div class="buttons">
    <button type="button" data-action="start">Start</button>
    <button type="button" data-action="stop">Stop</button>
  </div>`
    );

    this.secs = document.querySelector('span[data-value="secs"]');
    this.mins = document.querySelector('span[data-value="mins"]');
    this.hours = document.querySelector('span[data-value="hours"]');
    this.days = document.querySelector('span[data-value="days"]');
    this.startBtn = document.querySelector('button[data-action="start"]');
    this.stopBtn = document.querySelector('button[data-action="stop"]');
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
watch.createMarkup();
watch.init();
