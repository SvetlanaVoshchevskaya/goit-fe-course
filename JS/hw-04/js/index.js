'use strict';
const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  cheese: 40
};

const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1
};

function Cashier(name, productDatabase) {
  this.name = name;
  this.productDatabase = productDatabase;
  this.customerMoney = 0;
  this.getCustomerMoney = function(value) {
    return (this.customerMoney = value);
  };
  this.countTotalPrice = function(order) {
    let result = 0;
    for (let element in order) {
      result += this.productDatabase[element] * order[element];
    }
    return result;
  };
  this.countChange = function(totalPrice) {
    if (this.customerMoney >= totalPrice) {
      return this.customerMoney - totalPrice;
    } else {
      return null;
    }
  };
  this.onSuccess = function(change) {
    if (change !== null) {
      alert(`Спасибо за покупку, ваша сдача ${change}`);
    } else {
      alert('Очень жаль, вам не хватает денег на покупки');
    }
  };
  this.reset = function() {
    return (this.customerMoney = 0);
  };
}

// const mango = new Cashier('Mango', products);
// const totalPrice = mango.countTotalPrice(order);

// console.log(mango.name); // Mango
// console.log(mango.productDatabase); // ссылка на базу данных продуктов (объект products)
// console.log(mango.customerMoney); // 0
// console.log(totalPrice); // 110
// mango.getCustomerMoney(300);
// console.log(mango.customerMoney); // 300
// const change = mango.countChange(totalPrice);
// console.log(change); // 190
// mango.onSuccess(change);
// mango.reset();
// console.log(mango.customerMoney); // 0
