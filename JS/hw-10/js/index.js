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
const url = 'https://test-users-api.herokuapp.com/users/';

function fetchData(url,method='GET',body,headers={ Accept: 'application/json',
'Content-Type': 'application/json'}) {
   return fetch (url,{method,body,headers})
   }

function createView(arr) {
  const result = arr.reduce(
    (acc, el) =>
      acc +
      `<tr> <td>${el.id}</td> <td>${el.name}</td><td>${el.age}</td> </tr>`,
    ''
  );
  div.innerHTML = result;
}

function showUser({ id, name, age }) {
  const data = `<tr> <td>${id}</td> <td>${name}</td> <td>${age}</td> </tr>`;

  div.innerHTML = data;
}


function getAllUser() {
  fetchData(url)
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
  fetchData(url+id)
    .then(resp => { if (resp.ok) return resp.json();
      throw new Error(`${resp.statusText}`);
    })
    .then(data => showUser(data.data))
    .catch(err => alert(`${err}`));
}
get.addEventListener('click', getUserById);

function showInform({ name, age }) {
  const data = alert(
    `Пользователь с именем ${name} и возрастом ${age} добавлен`
  );
  return data;
}

function showUpdate({ id }) {
  const data = alert(`Пользователь с ID ${id} изменен`);
  return data;
}

function showDelete({ id }) {
  const data = alert(`Пользователь с ID ${id} удален`);

  return data;
}

function addUser() {
  event.preventDefault();
  const input = document.querySelectorAll('.inputs');
  const val = Array.from(input).map(el => el.value);
  const [name, age] = val;
  formAdd.reset();
  if (age < '0' || age > '9') {
    alert('Введите цифры в поле age');
    return;
  } else;
  { fetchData(url,'POST', JSON.stringify({ name, age }))  
      .then(resp => {
        if (resp.ok) return resp.json();
        throw new Error(`${resp.statusText}`);
      })
      .then(data => {
        showInform(data.data);
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
  fetchData(url+id,'DELETE')
     .then(resp => {
      if (resp.ok) return resp.json();
      throw new Error(`${resp.statusText}`);
    })
    .then(data => {
      showDelete(data.data);
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
  const user = { name, age };
  formChange.reset();
  if (age < '0' || age > '9') {
    alert('Введите цифры в поле age');
    return;
  } else;
   {fetchData (url+id,'PUT',JSON.stringify(user) )
 
    .then(resp => {
      if (resp.ok) return resp.json();
      throw new Error(`${resp.statusText}`);
    })

    .then(data => {
      showUser(data.data);
      showUpdate(data.data);
    })
    .catch(err => alert(`${err}`));
}}

formChange.addEventListener('submit', updateUser);