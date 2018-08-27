'use strict';

let userInput;
const numbers = [];
let total = 0;

do {
  userInput = prompt('Введите число');
  let numberUserInp = Number(userInput);
  if (numberUserInp !== null) {
    numbers.push(numberUserInp);
  }
} while (userInput !== null);
// console.log(numbers);

let length = numbers.length;
for (let value of numbers) {
  if (value < length) {
    total += numbers[value];
  }
}
alert(`Общая сумма чисел равна ${total}`);
