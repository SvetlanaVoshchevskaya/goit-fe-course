'use strict';

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];
const success = 'Логин успешно добавлен!';
const errorMessage = 'Ошибка! Логин должен быть от 4 до 16 символов';
const usedLogin = 'Такой логин уже используется!';

const isLoginValid = login => login.length >= 4 && login.length <= 16;

const isLoginUnique = (allLogins, login) => allLogins.includes(login);

const addLogin = function(logins, login) {
  if (isLoginValid(login)) {
    if (isLoginUnique(logins, login)) {
      alert(usedLogin);
    } else {
      alert(success);
      logins.push(login);
    }
  } else {
    alert(errorMessage);
  }
};

// addLogin(logins, 'Ajax');
// addLogin(logins, 'robotGoogles');
// addLogin( logins,'Zod');
// addLogin(logins,'jqueryisextremelyfast')
console.log(logins);
