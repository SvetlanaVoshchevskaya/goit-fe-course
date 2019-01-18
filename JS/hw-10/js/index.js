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

function createView(arr) {
  const result = arr.reduce(
    (acc, el) =>
    acc +
    `<tr> <td>${el.id}</td> <td>${el.name}</td><td>${el.age}</td> </tr>`,
    ''
  );
  div.innerHTML = result;
}

function showUser({
  id,
  name,
  age
}) {
  const data = `<tr> <td>${id}</td> <td>${name}</td> <td>${age}</td> </tr>`;

  div.innerHTML = data;
}

function getAllUser() {
  fetch('https://test-users-api.herokuapp.com/users')
    .then(resp => {
      if (resp.ok) return resp.json();
      throw new Error(`${resp.statusText}`);
    })
    .then(data => createView(data.data))
    .catch(err => alert(`${err}`));
}

getAll.addEventListener('click', getAllUser);

function getUserById() {
  event.preventDefault();
  let id = input.value;
  input.value = '';
  fetch(`https://test-users-api.herokuapp.com/users/${id}`)
    .then(resp => {
      if (resp.ok) return resp.json();
      throw new Error(`${resp.statusText}`);
    })
    .then(data => showUser(data.data))
    .catch(err => alert(`${err}`));
}

function showInform({
  name,
  age
}) {
  const data = alert(
    `Пользователь с именем ${name} и возрастом ${age} добавлен`
  );
  return data;
}

function showUpdate({
  id
}) {
  const data = alert(`Пользователь с ID ${id} изменен`);
  return data;
}

function showDelete({
  id
}) {
  const data = alert(`Пользователь с ID ${id} удален`);

  return data;
}
get.addEventListener('click', getUserById);

function addUser() {
  event.preventDefault();
  const input = document.querySelectorAll('.inputs');
  const val = Array.from(input).map(el => el.value);
  const [name, age] = val;
  formAdd.reset();
  if (age < '0' || age > '9') {
    alert('Введите цифры в поле age');
  } else; {
    fetch(' https://test-users-api.herokuapp.com/users/', {
        method: 'POST',
        body: JSON.stringify({
          name,
          age
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(resp => {
        if (resp.ok) return resp.json();
        throw new Error(`${resp.statusText}`);
      })
      .then(data => {
        showInform(data.data);
        getAllUser();
      })
      .catch(err => alert(`${err}`));
  }
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
    .then(resp => {
      if (resp.ok) return resp.json();
      throw new Error(`${resp.statusText}`);
    })
    .then(data => {
      showDelete(data.data);
      getAllUser();
    })
    .catch(err => alert(`${err}`));
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
  if (age < '0' || age > '9') {
    alert('Введите цифры в поле age');
  }
  const user = {
    name,
    age
  };
  formChange.reset();
  fetch(` https://test-users-api.herokuapp.com/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      }
    })
    .then(resp => {
      if (resp.ok) return resp.json();
      throw new Error(`${resp.statusText}`);
    })

    .then(data => {
      showUser(data.data);
      showUpdate(data.data);
    })
    .catch(err => alert(`${err}`));
}

formChange.addEventListener('submit', updateUser);