"use strict";

const template = document.querySelector("#js-card-template").innerHTML.trim();
const input = document.querySelector(".link-input");
const form = document.querySelector(".js-forms");
const content = document.querySelector(".content");

let arrayToStorage = JSON.parse(localStorage.getItem('marks')) || [];

function getValue() {
  event.preventDefault();
  let text = input.value;
  let objtoarray = {
    id: Date.now(),
    content: text
  };
  if (arrayToStorage.length === 0) {
    saveToStorage(objtoarray);
  } else if (arrayToStorage.length > 0) {
    const check = checkElement(text);
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
  const source = Handlebars.compile(template);
  const markup = source(item);
  content.insertAdjacentHTML("afterbegin", markup);
}
function checkElement(text) {
  arrayToStorage.forEach(item => {console.log(item.content === text)
    if (item.content === text) {
      alert('Exist');
      return;
    }
  });
}
function painFromStorage() {
  if (arrayToStorage) {
    for (let el of arrayToStorage) {
      createForm(el);
    }
  } else {
    localStorage.setItem('marks', JSON.stringify([]));
  }
}

function deleteBookmarks(event) {
  let deleteBtn = event.target;
  let id = deleteBtn.parentNode.dataset.id;
  if (deleteBtn.nodeName === 'BUTTON') {
    deleteBtn.parentNode.remove();
  }
 
  let newArr = arrayToStorage.filter(el => el.id !== Number(id));
  localStorage.setItem('marks', JSON.stringify(newArr));
}

window.addEventListener('DOMContentLoaded',painFromStorage)
form.addEventListener("submit", getValue);
content.addEventListener("click", deleteBookmarks);