class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector(".timer__part--minutes"),
      seconds: root.querySelector(".timer__part--seconds"),
      control: root.querySelector(".timer__btn--control"),
      reset: root.querySelector(".timer__btn--reset"),
      skip: root.querySelector(".timer__btn--skip"),
      intervalTime: root.querySelector(".intervalTime"),
      ellapsedMin: root.querySelector(".ellapsedMin"),
      ellapsedSec: root.querySelector(".ellapsedSec"),
      bell: document.querySelector(".bell"),
      finalBell: document.querySelector(".finalBell"),
      body: document.querySelector("body"),
    };

    this.interval = null;
    this.remainingSeconds = 0;
    this.remainingIntervalTime = 0;
    this.intervalTime = 0;
    this.ellapsedTime = 0;
    this.running = false;

    this.el.control.addEventListener("click", () => {
      this.startStop();
    });

    this.el.reset.addEventListener("click", () => {
      this.input();
    });

    this.el.skip.addEventListener("click", () => {
      this.skip();
    });

    this.el.body.addEventListener("keypress", (e) => {
      if (e.key === "f") {
        this.skip();
      } else if (e.key === "s") {
        this.startStop();
      } else if (e.key === "i") {
        this.input();
      }
    });
  }

  startStop() {
    if (this.interval === null) {
      this.start();
      this.el.bell.play();
    } else {
      this.stop();
    }
  }

  input() {
    const inputMinutes = prompt("Enter number of minutes:");
    this.intervalTime = prompt("Enter interval time:");
    this.stop();
    this.remainingSeconds = inputMinutes * 60;
    this.remainingIntervalTime = this.intervalTime;
    this.ellapsedTime = 0;
    this.updateInterfaceTime();
  }

  skip() {
    this.remainingSeconds = this.remainingSeconds - this.remainingIntervalTime;
    this.remainingIntervalTime = this.intervalTime;
    this.updateInterfaceTime();
    this.el.bell.play();
  }
  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    const ellapsedMin = Math.floor(this.ellapsedTime / 60);
    const ellapsedSec = this.ellapsedTime % 60;

    const remainingIntervalTime = this.remainingIntervalTime;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    this.el.intervalTime.textContent = remainingIntervalTime
      .toString()
      .padStart(2, "0");
    this.el.ellapsedMin.textContent = ellapsedMin.toString().padStart(2, "0");
    this.el.ellapsedSec.textContent = ellapsedSec.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timer__btn--start");
      this.el.control.classList.remove("timer__btn--stop");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("timer__btn--stop");
      this.el.control.classList.remove("timer__btn--start");
    }
  }

  start() {
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.remainingIntervalTime--;
      this.ellapsedTime++;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
        this.el.finalBell.play();
      }
      if (this.remainingIntervalTime === 0) {
        this.el.bell.play();
        this.remainingIntervalTime = this.intervalTime;
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  stop() {
    clearInterval(this.interval);

    this.interval = null;

    this.updateInterfaceControls();
  }

  static getHTML() {
    return `
        <div class="remainingTime">
          <span class="timer__part timer__part--minutes">00</span>
          <span class="timer__part">:</span>
          <span class="timer__part timer__part--seconds">00</span>
        </div>
        <div class="intervalTimeContainer">
          <span class="intervalTime">0</span>
        </div>
        <div class="ellapsedTime">
          <span class="ellapsedMin">00</span>:<span class="ellapsedSec"
            >00</span
          >
        </div>
        <div class="controls">
          <button
            type="button"
            class="timer__btn timer__btn--control timer__btn--start"
          >
            <span class="material-icons">play_arrow</span>
          </button>
          <button type="button" class="timer__btn timer__btn--reset">
            <span class="material-icons">timer</span>
          </button>
          <button type="button" class="timer__btn timer__btn--skip">
            <span class="material-icons" id="skip">skip_next</span>
          </button>
        </div>
		`;
  }
}

new Timer(document.querySelector(".timer"));
