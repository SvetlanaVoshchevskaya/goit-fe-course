"use strict";
const adminLogin = "admin";
const adminPassword = "m4ngo1zh4ackz0r";
const cancel = 'Отменено пользователем!'
const forbidden = 'Доступ запрещен!'
const welcome = 'Добро пожаловать!'

const LoginMessege = prompt("Введите логин:");
if (LoginMessege === null) {
  alert(cancel);
} else if (LoginMessege !== adminLogin) {
  alert(forbidden);
} else
{
  const PassMessege = prompt("Введите пароль:");
  if (PassMessege === null) {
    alert(cancel);
  } else if (PassMessege !== adminPassword) {
    alert(forbidden);
  } else  {
    alert(welcome);
  }
}
