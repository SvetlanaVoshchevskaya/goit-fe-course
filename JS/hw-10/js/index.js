'use strict';
const getAll = document.querySelector('.btnGetAll');
const formAdd = document.querySelector('.add_box');
const formDelete = document.querySelector('.delete_box');
const formChange = document.querySelector('.change_box');
const input = document.querySelector('.input');
const get = document.querySelector('.btnGet');
const add = document.querySelector('.btnAdd');
const post = document.querySelector('.btnPost');
const del = document.querySelector('.btnDel');
const div = document.querySelector('table>tbody');
const addform = document.q;

function createView(arr) {
  const result = arr.reduce(
    (acc, el) =>
      acc +
      `<tr> <td>${el.id}</td> <td>${el.name}</td><td>${
        el.age
      }</td> </tr>`,
    ''
  );
  div.innerHTML = result;
}

function showUser({ id, name, age }) {
  const data = `<tr> <td>${id}</td> <td>${name}</td> <td>${age}</td> </tr>`;
  div.innerHTML = data;
}

function getAllUser() {
  fetch('https://test-users-api.herokuapp.com/users')
    .then(respons => respons.json())
    .then(data => createView(data.data))
    .catch(err => console.log(err));
}

getAll.addEventListener('click', getAllUser);

function getUserById() {
  event.preventDefault();
  let id = input.value;
  input.value = '';
  fetch(`https://test-users-api.herokuapp.com/users/${id}`)
    .then(resp => resp.json())
    .then(data => showUser(data.data))
    .catch(err => console.log(err));
}

function showInform({ name, age }) {
  const data = alert(`Пользователь с именем ${name}и возрастом${age}добавлен`);
  return data;
}
function showDelete({ id }) {
  const data = alert(`Пользователь с именем ${id} удален`);
  return data;
}
get.addEventListener('click', getUserById);

function addUser() {
  event.preventDefault();
  const input = document.querySelectorAll('.inputs');
  const val = Array.from(input).map(el => el.value);
  const [name, age] = val;
  formAdd.reset();
  fetch(' https://test-users-api.herokuapp.com/users/', {
    method: 'POST',
    body: JSON.stringify({ name, age }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
  })
    .then(resp => resp.json())
    .then(data => showInform(data.data))
    .catch(err => console.log(err));
}

formAdd.addEventListener('submit', addUser);

function removeUser() {
  event.preventDefault();
  const input = document.querySelector('.input_del');
  let id = input.value;
  input.value = '';
  fetch(` https://test-users-api.herokuapp.com/users/${id}`, {
    method: 'DELETE'
  })
    .then(resp => resp.json())
    .then(data => showDelete(data.data))
    .catch(err => console.log(err));
}

del.addEventListener('click', removeUser);

function updateUser() {
  event.preventDefault();
  const input = document.querySelector('.input_id');
  const inputName = document.querySelector('.input_name');
  const inputAge = document.querySelector('.input_age');
  let id = input.value;
  let name = inputName.value;
  let age = inputAge.value;
  const user = { name, age };
  console.log(user);
  formChange.reset();
  fetch(` https://test-users-api.herokuapp.com/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: { Accept: 'application/json', 'Content-type': 'application/json' }
  })
    .then(resp => resp.json())
    .then(data => showUser(data.data))
    .catch(err => console.log(err));
}

formChange.addEventListener('submit', updateUser);
