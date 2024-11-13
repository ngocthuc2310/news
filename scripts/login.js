"use strict";

//========= khai báo các node và storage key ================
const inUserName = document.getElementById("input-username"),
  inPassword = document.getElementById("input-password"),
  formLogin = document.getElementById("loginForm"),
  key_userArr = "USER_ARRAY",
  key_currentUser = "USER_CURRENT";
const userArr = JSON.parse(getFromStorage(key_userArr, "[]"));

//======== phần các chức năng LOGIN ============================
//..... chức năng get data từ login form.....
function getFormLogin() {
  let login = {
    username: inUserName.value,
    password: inPassword.value,
  };
  return login;
}

//...... chức năng LOGIN ...................
function logIn(LoginInfo) {
  let kt = userArr.findIndex(
    (x) => x.username == LoginInfo.username && x.password == LoginInfo.password
  );
  console.log(`kiểm tra ${kt}`);
  if (kt != -1) {
    let userInfo = userArr[kt];
    saveToStorage(key_currentUser, JSON.stringify([userInfo]));
    alert("Bạn đã đăng nhập thành công");
    window.location.href = "../index.html";
  } else alert("Login failed, user name và password chưa khớp.");
}

//======= sự kiện submit login ============================
formLogin.addEventListener("submit", (e) => {
  let formInfo = getFormLogin();
  logIn(formInfo);
  e.preventDefault();
});
