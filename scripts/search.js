"use strict";

//======== khai báo các node và các biến, hằng ===============================
const container = document.getElementById("news-container"),
  frev = document.getElementById("btn-prev"),
  next = document.getElementById("btn-next"),
  pagelink = document.getElementById("page-num"),
  inKeyWord = document.getElementById("input-query"),
  inform = document.getElementById("inform"),
  pageNav = document.getElementById("nav-page-num");

const apiKey = "b0f3862c4c0d4a7eb2f543f2060d4bc7",
  url = "https://newsapi.org/v2/everything",
  pageSize = 8,
  language = "en",
  domains = "techcrunch.com,thenextweb.com",
  excludeDomains = "";
let nowday = new Date(),
  fromday = new Date(nowday.getFullYear(), nowday.getMonth(), nowday.getDate()),
  strNowDay = `${nowday.getFullYear()}-${
    nowday.getMonth() + 1
  }-${nowday.getDate()}`,
  strFromDay = `${fromday.getFullYear()}-${
    fromday.getMonth() + 1
  }-${fromday.getDate()}`;

let data = null,
  data1,
  p,
  sotrang,
  page = 1;

//====== Phần chức năng lấy API trên mạng ===============
async function getAPI() {
  let urlApI = `${url}?q=${p}&apiKey=${apiKey}&language=${language}&domains=${domains}&pageSize=${pageSize}&page=${page}`;
  console.log(urlApI);
  try {
    let obj = await fetch(urlApI);
    let dt = obj.json();
    return dt;
  } catch (er) {
    console.error(er);
  }
}

//....... chức năng search chính ................
async function seach() {
  data = await getAPI();
  console.log(data);
  let somuc = data ? Number(data.totalResults) : 0;
  sotrang = Math.ceil(somuc / pageSize);
  console.log(data, ` trang ${page}`, `số trang ${sotrang}`);
  data1 = data ? data.articles : null;
  showSeachResult();
  showPageList();
}

//.. chức năng show kết quả đã load ra giao diện ........
function showSeachResult() {
  let str = "";
  if (data1 != null)
    data1.forEach((item) => {
      str += `<div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${item.urlToImage}"
            class="card-img"
            alt="${item.title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <a href="${item.url}"
              class="btn btn-primary">View</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    });
  container.innerHTML = str;
}

//.... sự kiện submit khi nhấn nút search ..........
inform.addEventListener("submit", (e) => {
  (async function () {
    p = inKeyWord.value;
    page=1;
    await seach();
  })();
  e.preventDefault();
});

//.. chức năng show list phân trang ra giao diện ....
function showPageList() {
  pageNav.classList.remove("hiden");
  pagelink.textContent = page;

  if (page <= 1) frev.classList.add("hiden");
  else frev.classList.remove("hiden");

  if (page >= sotrang) next.classList.add("hiden");
  else next.classList.remove("hiden");
}

//.... sự kiện lùi trang khi nhấn prev .............
frev.addEventListener("click", (e) => {
  (async function () {
    page--;
    await seach();
  })();
  e.preventDefault();
});

//.... sự kiện tiến đến trang kế khi nhấn next .....
next.addEventListener("click", (e) => {
  (async function () {
    page++;
    await seach();
  })();
  e.preventDefault();
});
