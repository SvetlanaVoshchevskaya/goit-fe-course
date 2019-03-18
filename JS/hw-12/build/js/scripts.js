'use strict';

var template = document.querySelector('#js-card-template').innerHTML.trim();
var input = document.querySelector('.link-input');
var form = document.querySelector('.js-forms');
var content = document.querySelector('.content');
var arrayToStorage = localStorage.getItem('marks') ? JSON.parse(localStorage.getItem('marks')) : [];

var getValue = function getValue(event) {
  event.preventDefault();
  var text = input.value;
  var objtamplate = {
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

var resultCheck = function resultCheck(value, obj) {
  var check = checkElementInArr(arrayToStorage, value);

  if (!check) {
    saveToStorage(obj);
  } else {
    alert('bookmark already exist');
    return;
  }
};

var saveToStorage = function saveToStorage(obj) {
  arrayToStorage.push(obj);
  createBookmark(obj);
  localStorage.setItem('marks', JSON.stringify(arrayToStorage));
};

var createBookmark = function createBookmark(item) {
  var source = Handlebars.compile(template);
  var markup = source(item);
  content.insertAdjacentHTML('afterbegin', markup);
};

var checkElementInArr = function checkElementInArr(bookmarkArray, text) {
  return bookmarkArray.some(function (item) {
    return item.content === text;
  });
};

var drawingFromStorage = function drawingFromStorage() {
  arrayToStorage ? arrayToStorage.forEach(function (item) {
    return createBookmark(item);
  }) : localStorage.setItem('marks', JSON.stringify([]));
};

var deleteBookmarks = function deleteBookmarks() {
  var deleteBtn = event.target;
  var id = deleteBtn.parentNode.dataset.id;

  if (deleteBtn.nodeName === 'BUTTON') {
    deleteBtn.parentNode.remove();
  }

  var newArr = arrayToStorage.filter(function (el) {
    return el.id !== Number(id);
  });
  localStorage.setItem('marks', JSON.stringify(newArr));
};

window.addEventListener('DOMContentLoaded', drawingFromStorage);
form.addEventListener('submit', getValue);
content.addEventListener('click', deleteBookmarks);