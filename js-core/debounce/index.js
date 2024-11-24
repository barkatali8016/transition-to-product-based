const output = document.getElementById("output");

function debouncing(callback, delay = 2000) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const debounce = debouncing((value) => {
  output.innerText = `Debounce value : ${value}`;
}, 2000);

document.getElementById("demo").addEventListener("keyup", (event) => {
  console.log(event.target.value);
  debounce(event.target.value);
});
