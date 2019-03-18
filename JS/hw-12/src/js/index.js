'use strict';

const template = document.querySelector('#js-card-template').innerHTML.trim();
const input = document.querySelector('.link-input');
const form = document.querySelector('.js-forms');
const content = document.querySelector('.content');

let arrayToStorage = localStorage.getItem('marks')
  ? JSON.parse(localStorage.getItem('marks'))
  : [];

const getValue = event => {
  event.preventDefault();
  let text = input.value;
  let objtamplate = {
    id: Date.now(),
    content: text
  };
  if (arrayToStorage.length === 0) {
    saveToStorage(objtamplate);
  } else if (arrayToStorage.length > 0) {
    resultCheck(text, objtamplate);
  }
  input.value = '';
};

const resultCheck = (value, obj) => {
  const check = checkElementInArr(arrayToStorage, value);
  if (!check) {
    saveToStorage(obj);
  } else {
    alert('bookmark already exist');
    return;
  }
};
const saveToStorage = obj => {
  arrayToStorage.push(obj);
  createBookmark(obj);
  localStorage.setItem('marks', JSON.stringify(arrayToStorage));
};

const createBookmark = item => {
  const source = Handlebars.compile(template);
  const markup = source(item);
  content.insertAdjacentHTML('afterbegin', markup);
};

const checkElementInArr = (bookmarkArray, text) =>
  bookmarkArray.some(item => item.content === text);

const drawingFromStorage = () => {
  arrayToStorage
    ? arrayToStorage.forEach(item => createBookmark(item))
    : localStorage.setItem('marks', JSON.stringify([]));
};

const deleteBookmarks = () => {
  const deleteBtn = event.target;
  const id = deleteBtn.parentNode.dataset.id;
  if (deleteBtn.nodeName === 'BUTTON') {
    deleteBtn.parentNode.remove();
  }
  const newArr = arrayToStorage.filter(el => el.id !== Number(id));
  localStorage.setItem('marks', JSON.stringify(newArr));
};

window.addEventListener('DOMContentLoaded', drawingFromStorage);
form.addEventListener('submit', getValue);
content.addEventListener('click', deleteBookmarks);
