"use strict";

//========== khai báo các node, biến và hằng ============================
const inPageSize = document.getElementById("input-page-size"),
  inCategory = document.getElementById("input-category"),
  inform = document.getElementById("inform"),
  key_currentUser = "USER_CURRENT",
  currentUser = JSON.parse(getFromStorage(key_currentUser, "[]")),
  keySetting = "SETTING",
  settingArr = JSON.parse(getFromStorage(keySetting, "[]"));
let settingUserIndex =
  currentUser.length > 0
    ? settingArr.findIndex((x) => x.username == currentUser[0].username)
    : -1;
let settingUser =
  settingUserIndex != -1
    ? settingArr[settingUserIndex]
    : { username: "everyone", pageSize: 5, category: "general" };

console.log(settingArr);

//.......... tạo Class .............................................
const ClassSetting = function (username, pageSize, category) {
  this.username = username;
  this.pageSize = pageSize;
  this.category = category;
};

//......... chức năng show ra giao diện ............................
function showSetting() {
  inPageSize.value = settingUser.pageSize;
  inCategory.value = settingUser.category;
}
showSetting();

//........ chức năng edit/update Setting ..........................
function EditSetting() {
  if (currentUser.length > 0) {
    let username = currentUser[0].username;
    let obj = new ClassSetting(username, inPageSize.value, inCategory.value);
    addSetting(obj);
    alert("You edited successfully!");
    console.log(settingArr);
  } else alert("Edit fail! please login.");
}

//........ chức năng add setting ..................................
function addSetting(obj) {
  let tt = settingArr.findIndex((x) => x.username == obj.username);
  if (tt == -1) settingArr.push(obj);
  else {
    let rr = settingArr[tt];
    rr.pageSize = obj.pageSize;
    rr.category = obj.category;
  }
  saveToStorage(keySetting, JSON.stringify(settingArr));
}

//....... sự kiện submit edit setting khi nhấn nút submit  .......
inform.addEventListener("submit", (e) => {
  EditSetting();
  e.preventDefault();
});
//...... phần này không có trong yêu cầu đề bài..... .............
//khi muốn clear setting thì thì nhập: clearsetting() trên console trang setting..
function clearsetting() {
  saveToStorage(keySetting, "[]");
  let ss = getFromStorage(keySetting, "[]");
  return ss;
}
