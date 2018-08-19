"use strict";
const adminLogin = "admin";
const adminPassword = "m4ngo1zh4ackz0r";

const LoginMessege = prompt("Введите логин:");
if (LoginMessege === null) {
  alert("Отменено пользователем!");
} else if (LoginMessege !== adminLogin) {
  alert("Доступ запрещен!");
} else;
{
  const PassMessege = prompt("Введите пароль:");
  if (PassMessege === null) {
    alert("Отменено пользователем!");
  } else if (PassMessege !== adminPassword) {
    alert("Доступ запрещен!");
  } else if (PassMessege === adminPassword) {
    alert("Добро пожаловать!");
  }
}
