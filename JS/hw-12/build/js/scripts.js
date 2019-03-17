"use strict";

var template = document.querySelector("#js-card-template").innerHTML.trim();
var input = document.querySelector(".link-input");
var form = document.querySelector(".js-forms");
var content = document.querySelector(".content");
var arrayToStorage = JSON.parse(localStorage.getItem('marks')) || [];

function getValue() {
  event.preventDefault();
  var text = input.value;
  var objtoarray = {
    id: Date.now(),
    content: text
  };

  if (arrayToStorage.length === 0) {
    saveToStorage(objtoarray);
  } else if (arrayToStorage.length > 0) {
    var check = checkElement(text);

    if (!check) {
      saveToStorage(objtoarray);
    } else {
      return;
    }
  }

  input.value = '';
}

function saveToStorage(obj) {
  arrayToStorage.push(obj);
  createForm(obj);
  localStorage.setItem('marks', JSON.stringify(arrayToStorage));
}

function createForm(item) {
  var source = Handlebars.compile(template);
  var markup = source(item);
  content.insertAdjacentHTML("afterbegin", markup);
}

function checkElement(text) {
  arrayToStorage.forEach(function (item) {
    console.log(item.content === text);

    if (item.content === text) {
      alert('Exist');
      return;
    }
  });
}

function painFromStorage() {
  if (arrayToStorage) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = arrayToStorage[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var el = _step.value;
        createForm(el);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else {
    localStorage.setItem('marks', JSON.stringify([]));
  }
}

function deleteBookmarks(event) {
  var deleteBtn = event.target;
  var id = deleteBtn.parentNode.dataset.id;

  if (deleteBtn.nodeName === 'BUTTON') {
    deleteBtn.parentNode.remove();
  }

  var newArr = arrayToStorage.filter(function (el) {
    return el.id !== Number(id);
  });
  localStorage.setItem('marks', JSON.stringify(newArr));
}

window.addEventListener('DOMContentLoaded', painFromStorage);
form.addEventListener("submit", getValue);
content.addEventListener("click", deleteBookmarks);