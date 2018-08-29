'use strict';
let userInput;
const numbers = [];
let total = 0;

do {
  userInput = prompt('Введите число');
  let numberUserInp  = Number(userInput);
  if (numberUserInp !== null && numberUserInp  !== isNaN) {
    numbers.push(numberUserInp);
    
  }
} while (userInput !== null);

for (let value  of numbers) {
  total += value;
}
alert(`Общая сумма чисел равна ${total}`);
