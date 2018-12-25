'use strict';
let userInput;
const numbers = [];
let total = 0;

do {
  userInput = prompt('Введите число');
  if (userInput !== null && !isNaN(userInput)) {
    numbers.push(+userInput);
  } else if (isNaN(userInput)) {
    alert('Было введено не число, попробуйте еще раз');
  }
} while (userInput !== null);

if (numbers.length > 0) {
  for (let value of numbers) {
    total += value;
  }
  alert(`Общая сумма чисел равна ${total}`);
}

console.log(numbers);
