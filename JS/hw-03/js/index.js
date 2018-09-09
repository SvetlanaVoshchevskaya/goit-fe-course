'use strict';

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

const isLoginValid = function(login) {
  return login.length >= 4 && login.length <= 16;
};

const isLoginUnique = function(allLogins, login) {
  return !allLogins.includes(login);
};

const addLogin = function(logins, login) {
  if (isLoginValid(login)) {
    isLoginUnique(logins, login);
  } else {
    alert('Ошибка! Логин должен быть от 4 до 16 символов');
    return logins;
  }
  if (isLoginUnique(logins, login)) {
    alert('Логин успешно добавлен!');
    logins.push(login);
    return logins;
  } else {
    alert('Такой логин уже используется!');
    return logins;
  }
};

//  addLogin (logins,'Ajax');
//  addLogin( logins,'robotGoogles')
// addLogin( logins,'Zod');
// addLogin(logins,'jqueryisextremelyfast')
// console.log(logins);
