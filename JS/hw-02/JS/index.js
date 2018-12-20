'use strict';
let userInput;
const numbers = [];
let total = 0;

do {
  userInput = prompt('Введите число');
  if (userInput !== null && userInput !== isNaN) {
    numbers.push(+userInput);
  }
} while (userInput !== null);

for (let value of numbers) {
  total += value;
}
if (numbers.length !== 0) {
  alert(`Общая сумма чисел равна ${total}`);
}
