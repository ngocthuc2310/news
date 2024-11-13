"use strict";
//==== khai báo các node, class User và localStorage ============
const inFiNa = document.getElementById("input-firstname"),
  inLaNa = document.getElementById("input-lastname"),
  inUsNa = document.getElementById("input-username"),
  inPass = document.getElementById("input-password"),
  inCoPass = document.getElementById("input-password-confirm"),
  Register = document.getElementById("btn-submit"),
  formReg = document.getElementById("formRegUser");

const ClassUser = function (firstName, lastName, username, password) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.username = username;
  this.password = password;
};
const key = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(key, "[]"));

console.log(userArr);
//....phần này không có trong yêu cầu đề bài ...................
//..Nhập: clearuser() để clear userArr trên console khi cần .....
function clearuser() {
  saveToStorage(key, "[]");
  let tt = JSON.parse(getFromStorage(key, "[]"));
  return tt;
}

//============== phần các chức năng REGISTER ====================
const ClassUserForm = function (
  firstName,
  lastName,
  username,
  password,
  conPass
) {
  ClassUser.call(this, firstName, lastName, username, password);
  this.conPass = conPass;
};
ClassUserForm.prototype =
  ClassUser.prototype != null ? Object.create(ClassUser.prototype) : null;

//...... hàm get user values form..........
function getRegForm() {
  const user = new ClassUserForm(
    inFiNa.value,
    inLaNa.value,
    inUsNa.value,
    inPass.value,
    inCoPass.value
  );
  return user;
}

//.. hàm validation cho user input form ...................
function validation(userform) {
  if (userArr.findIndex((x) => x.username == userform.username) != -1) {
    alert("❗ User name này đã tồn tại, vui lòng đặt tên khác.");
    return false;
  } else if (userform.password.length <= 8) {
    alert("Password hơi ngắn, vui lòng nhập lại với số ký tự lớn hơn 8.");
    return false;
  } else if (userform.password != userform.conPass) {
    alert("Confirm password bị sai, vui lòng nhập lại.");
    return false;
  } else return true;
}

//....hàm xóa trắng form..............................
function ClearForm() {
  inFiNa.value = "";
  inLaNa.value = "";
  inUsNa.value = "";
  inPass.value = "";
  inCoPass.value = "";
}

//..... hàm main cho register user .........................
function registerUser() {
  let userform = getRegForm();
  if (validation(userform)) {
    let user = new ClassUser(
      userform.firstName,
      userform.lastName,
      userform.username,
      userform.password
    );
    userArr.push(user);
    saveToStorage(key, JSON.stringify(userArr));
    ClearForm();
    let cf = confirm("Bạn đã register thành công.\n Bạn có muốn login?");
    if (cf) window.location.href = "../pages/login.html";
  }
}

//..... sự kiện cho submit form để register user mới ........
formReg.addEventListener("submit", (e) => {
  registerUser();
  e.preventDefault();
});
