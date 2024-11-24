const output = document.getElementById("output");
const throttleOutput = document.getElementById("throttle");

// function throttle(callback, delay = 2000) {
//   let shouldWait = false;
//   let waitingArgs;

//   const timerFunction = () => {
//     if (!waitingArgs) {
//       shouldWait = false;
//     } else {
//       callback(...waitingArgs);
//       waitingArgs = null;
//       setTimeout(timerFunction, delay);
//     }
//   };

//   return (...args) => {
//     if (shouldWait) {
//       waitingArgs = args;
//       return;
//     }

//     callback(...args);
//     shouldWait = true;

//     setTimeout(timerFunction, delay);
//   };
// }

function throttle(callback, delay = 1000) {
  let timerId = null;
  let updatedArgs = [];
  let hasFirst = true;

  return function (...args) {
    updatedArgs = args;

    if (timerId) return;

    const myThis = this;

    if (hasFirst) {
      hasFirst = false;
      callback.apply(myThis, updatedArgs);
      return;
    }

    timerId = setTimeout(() => {
      timerId = null;
      callback.apply(myThis, updatedArgs);
    }, delay);
  };
}
const throttleUpdateText = throttle(function (text) {
  throttleOutput.innerText = `Throttle value : ${text}`;
  console.log(this, "thisthisthisthis");
}, 800);

document.getElementById("demo").addEventListener("keyup", (event) => {
  console.log(event.target.value);
  const anObj = { name: "barkat" };
  throttleUpdateText.call(anObj, event.target.value);
  output.innerText = `Normal value : ${event.target.value}`;
});
