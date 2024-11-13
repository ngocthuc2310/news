"use strict";

// == the function can save value to this localstorage =====
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//===== the fuction can get value from this localstorage ===
function getFromStorage(key, _default) {
  return localStorage.getItem(key) ?? _default;
}
