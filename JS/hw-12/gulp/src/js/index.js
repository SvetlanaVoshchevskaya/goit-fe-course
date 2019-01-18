'use strict';

const template = document.querySelector('#js-card');
const input = document.querySelector('[type="text"]');
const form = document.querySelector('.js-forms');
const content = document.querySelector('.content');

function getValue() {
  event.preventDefault();
  const text = input.value;
  let obj = { id: Date.now(), content: text };
  createForm(obj);
  saveToStorage(obj);
  input.value = '';
}

function createForm(item) {
  const div = document.createElement('div');
  const p = document.createElement('p');
  const button = document.createElement('button');
  button.textContent = 'Удалить';
  p.textContent = item.content;
  div.setAttribute('data-bookmarks', item.id);
  div.append(p, button);
  content.append(div);
}

function saveToStorage(obj) {
  let result = localStorage.getItem('newBmarks');
  result.push(obj);
  localStorage.setItem('newBmarks', JSON.stringify(result));
}

function paintFromStorage() {
  let result = JSON.parse(localStorage.getItem('newBmarks'));
  console.log(result)
  if (result) {
    for (let el of result) {
      createForm(el);
    }
  } else {
    localStorage.setItem('newBmarks', JSON.stringify([]));
  }
}



window.addEventListener('DOMContentLoaded', paintFromStorage);
form.addEventListener('submit', getValue);
