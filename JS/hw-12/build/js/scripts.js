"use strict";

var template = document.querySelector("#js-card-template").innerHTML.trim();
var input = document.querySelector(".link-input");
var form = document.querySelector(".js-forms");
var content = document.querySelector(".content");

function getValue() {
  event.preventDefault();
  var text = input.value;
  var obj = {
    id: Date.now(),
    content: text
  };
  createForm(obj);
  saveToStorage(obj);
  input.value = '';
}

function saveToStorage(obj) {
  var arrayToStorage = JSON.parse(localStorage.getItem('marks'));
  arrayToStorage.push(obj);
  localStorage.setItem('marks', JSON.stringify(arrayToStorage));
}

function createForm(item) {
  var source = Handlebars.compile(template);
  var markup = source(item);
  content.insertAdjacentHTML("afterbegin", markup);
}

function painFromStorage() {
  var result = JSON.parse(localStorage.getItem('marks'));

  if (result) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = result[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

  if (deleteBtn.nodeName === "BUTTON") {
    deleteBtn.parentNode.remove();
  }

  var result = JSON.parse(localStorage.getItem('marks'));
  var newArr = result.filter(function (el) {
    return el.id !== Number(id);
  });
  localStorage.setItem('marks', JSON.stringify(newArr));
}

window.addEventListener('DOMContentLoaded', painFromStorage);
form.addEventListener("submit", getValue);
content.addEventListener("click", deleteBookmarks);