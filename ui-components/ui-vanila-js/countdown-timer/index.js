const hourInput = document.querySelector("#hour");
const minuteInput = document.querySelector("#minute");
const secondInput = document.querySelector("#second");
const startBtn = document.querySelector(".countdownTimer__action--start");
const resetBtn = document.querySelector(".countdownTimer__action--Reset");

const calculateTime = (totalInSecond) => {
  const second = parseInt(totalInSecond % 60, 10);
  const minute = parseInt((totalInSecond / 60) % 60, 10);
  const hr = parseInt((totalInSecond / 60 / 60) % 60, 10);

  secondInput.value = second > 9 ? second : "0" + second;
  minuteInput.value = minute > 9 ? minute : "0" + minute;
  hourInput.value = hr > 9 ? hr : "0" + hr;
};
let timer;

const startTimer = (totalInSecond) => {
  calculateTime(totalInSecond);

  timer = setInterval(() => {
    if (totalInSecond <= 0) {
      resetTimer();
      return;
    }
    totalInSecond -= 1;
    calculateTime(totalInSecond);
  }, 1000);
};

startBtn.addEventListener("click", (event) => {
  const hrInSecond = parseInt(hourInput.value) * 60 * 60;
  const minInSecond = parseInt(minuteInput.value) * 60;
  const secInSecond = parseInt(secondInput.value);
  if (hrInSecond < 1 && minInSecond < 1 && secInSecond < 1) {
    return;
  }
  let totalInSecond = hrInSecond + minInSecond + secInSecond;
  console.log(totalInSecond, "totalInSecond");
  if (timer) {
    clearInterval(timer);
    timer = undefined;
    startBtn.textContent = "Continue";
    return;
  }
  startTimer(totalInSecond);
  startBtn.textContent = "Pause";
  resetBtn.disabled = false;
});
function resetTimer() {
  if (timer) {
    clearInterval(timer);
    timer = undefined;

    startBtn.textContent = "Start";
    secondInput.value = 0;
    minuteInput.value = 0;
    hourInput.value = 0;
    resetBtn.disabled = true;
    return;
  }
}
resetBtn.addEventListener("click", (event) => {
  resetTimer();
});
