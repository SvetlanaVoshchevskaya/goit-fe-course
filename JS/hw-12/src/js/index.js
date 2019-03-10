"use strict";

const template = document.querySelector("#js-card-template").innerHTML.trim();
const input = document.querySelector(".link-input");
const form = document.querySelector(".js-forms");
const content = document.querySelector(".content");

function getValue() {
  event.preventDefault();
  const text = input.value;
  let obj = {
    id: Date.now(),
    content: text
  };
  createForm(obj);
  saveToStorage(obj);
  input.value = '';
}

function saveToStorage(obj) {
  let arrayToStorage = JSON.parse(localStorage.getItem('marks'));
  arrayToStorage.push(obj);
  localStorage.setItem('marks', JSON.stringify(arrayToStorage));
 }

function createForm(item) {
  const source = Handlebars.compile(template);
  const markup = source(item);
  content.insertAdjacentHTML("afterbegin", markup);
}

function painFromStorage() {
  let result = JSON.parse(localStorage.getItem('marks'))
  if (result) {
    for (let el of result) {
      createForm(el);
    }
      }
      else {localStorage.setItem('marks',JSON.stringify([]))}
}

function deleteBookmarks(event) {
  let deleteBtn = event.target;
  let id = deleteBtn.parentNode.dataset.id;
  if (deleteBtn.nodeName === "BUTTON") {
    deleteBtn.parentNode.remove();
  }
  let result = JSON.parse(localStorage.getItem('marks'));
  let newArr = result.filter(el => el.id !== Number(id));
  localStorage.setItem('marks', JSON.stringify(newArr));

}

window.addEventListener('DOMContentLoaded',painFromStorage)
form.addEventListener("submit", getValue);
content.addEventListener("click", deleteBookmarks);