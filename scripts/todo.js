"use strict";

//======== khai báo nodes và các biến ===============================
const todoList = document.getElementById("todo-list");
const inTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const Task = function (task, username, isDone) {
  this.task = task;
  this.username = username;
  this.isDone = isDone;
};

const key_currentUser = "USER_CURRENT",
  key_task = "TASK",
  currentUser = JSON.parse(getFromStorage(key_currentUser, "[]"));
let todoArr = JSON.parse(getFromStorage(key_task, "[]"));

//======== add task vào Todo List ==================================
function addTask() {
  let todo = new Task(inTask.value, currentUser[0].username, false);
  todoArr.push(todo);
  saveToStorage(key_task, JSON.stringify(todoArr));
}

//======== valid dữ liệu đầu vào ===================================
function valid() {
  if (inTask.value != "") {
    return true;
  } else {
    alert("Task không được trống, vui lòng nhập lại");
    return false;
  }
}

//======= Hiển thị các Task ========================================
function showTask() {
  todoArr = JSON.parse(getFromStorage(key_task, "[]"));
  let todoArrOfUser = todoArr.filter(
      (x) => x.username == currentUser[0].username
    ),
    str = "";
  for (let i = 0; i < todoArrOfUser.length; i++) {
    str += `<li class="task ${todoArrOfUser[i].isDone ? "checked" : ""}">${
      todoArrOfUser[i].task
    }<span class="close">×</span></li>`;
  }
  todoList.innerHTML = str;

  const checkTask = document.querySelectorAll(".task");
  for (let j = 0; j < checkTask.length; j++) {
    checkTask[j].addEventListener("click", (e) => {
      todoArrOfUser[j].isDone = todoArrOfUser[j].isDone ? false : true;
      saveToStorage(key_task, JSON.stringify(todoArr));
      showTask();
      e.preventDefault();
    });
  }

  const btn_close = document.querySelectorAll(".close");
  for (let k = 0; k < btn_close.length; k++) {
    btn_close[k].addEventListener("click", (e) => {
      todoArr.splice(todoArr.indexOf(todoArrOfUser[k]), 1);
      saveToStorage(key_task, JSON.stringify(todoArr));
      showTask();
    });
  }
}
showTask();

//====== sự kiện add Task ==========================================
btnAdd.addEventListener("click", (e) => {
  if (currentUser.length <= 0) alert("Add stack fail! Please login.");
  else if (valid()) {
    addTask();
    inTask.value = "";
    showTask();
  }
});

//===== phần tự làm thêm, không có trong yêu cầu đề bài =============
//..... nhập: clearTasks() trong console để xóa toàn bộ todoArr .....
function clearTasks() {
  saveToStorage(key_task, "[]");
  let todoArr = JSON.parse(getFromStorage(key_task, "[]"));
  return todoArr;
}
