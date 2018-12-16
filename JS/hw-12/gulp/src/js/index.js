'use strict';
const template = document.querySelector('#js-card');
const input = document.querySelector('[type="text"]');
const form =document.querySelector ('.js-forms') 

function getValue() {
  event.preventDefault();
  const text = input.value;
  console.log(text);
  input.value ='';
}

form.addEventListener('submit',getValue)