//Function Declaration
function square(num) {
  return num * num;
}
console.log(square(5));

//Function Expression
let add = function (a, b) {
  return a + b;
};
console.log(add(5, 4));

//Arrow Function
let substr = (a, b) => {
  return a - b;
};
console.log(substr(5, 3));
