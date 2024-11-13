"use strict";

//======= khai báo các node =====================================
const btn_logout = document.getElementById("btn-logout"),
  btn_login_reg = document.querySelectorAll(".btn-block"),
  loichao = document.getElementById("loichao"),
  key_currentUser = "USER_CURRENT",
  currentUser = JSON.parse(getFromStorage(key_currentUser, "[]"));

//...... chức năng tạo giao diện khi chưa login ..........
function NotLogined() {
  loichao.textContent = "Please Login or Register";
  btn_logout.classList.add("hiden");
  btn_login_reg.forEach((x) => {
    x.classList.remove("hiden");
  });
}

//...... chức năng tạo giao diện khi đã login ..........
function Logined() {
  loichao.textContent = `Welcome ${currentUser[0].firstName} !`;
  btn_logout.classList.remove("hiden");
  btn_login_reg.forEach((x) => {
    x.classList.add("hiden");
  });
}

if (currentUser.length > 0) Logined();
else NotLogined();

//============= chức năng logout ========================
function logOut() {
  saveToStorage(key_currentUser, "[]");
}

//============ sự kiện logout ===========================
btn_logout.addEventListener("click", (e) => {
  logOut();
  window.location.reload();
});
