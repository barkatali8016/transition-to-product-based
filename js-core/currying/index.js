console.clear();
Promise.resolve(42).then((v) => console.log(v));
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}
console.log("Hello");
const module = {
  x: 42,
  getX: () => {
    return this.x;
  },
};
console.log(module.getX());
