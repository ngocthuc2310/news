"use strict";

//========== khai báo nude =====================================
const container = document.getElementById("news-container"),
  frev = document.getElementById("btn-prev"),
  next = document.getElementById("btn-next"),
  pagelink = document.getElementById("page-num"),
  pagelist = document.getElementById("page-list");

//========== phần lấy thông tin SETTING ============================
const key_currentUser = "USER_CURRENT",
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

//========== phần get response từ API ===============================
const apiKey = "b0f3862c4c0d4a7eb2f543f2060d4bc7",
  url = "https://newsapi.org/v2/top-headlines",
  country = "us";
let page = 1,
  sotrang;

async function getAPI(url, country, category, apiKey, pageSize, page = 1) {
  let obj = null;
  let urlApI = `${url}?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

  await fetch(urlApI)
    .then((x) => x.json())
    .then((y) => {
      obj = y;
      console.log(obj);
    })
    .catch((er) => {
      console.error(`lỗi rồi: ${er}`);
    });

  return obj;
}
// sports
//========hàm IIFE cho việc tải và show trang ===============
async function tinTuc() {
  let data = await getAPI(
      url,
      country,
      settingUser.category,
      apiKey,
      settingUser.pageSize,
      page
    ),
    somuc = data ? Number(data.totalResults) : 0,
    sotrang = Math.ceil(somuc / settingUser.pageSize),
    data1 = data != null ? data.articles : null;
  console.log(`số mục ${somuc}, số trang ${sotrang}, Page ${page}`);
  showTinTuc(data1);
  showPageList();
}

(async function () {
  await tinTuc();
})();

//=========== function show tin tức ra giao diện =============
function showTinTuc(data1) {
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

//=========== function show page list =======================
const pageNumber = document.getElementById("page-num"),
  btnNext = document.getElementById("btn-next"),
  btnPrevious = document.getElementById("btn-prev");
  
function showPageList() {
  if (page <= 1) btnPrevious.classList.add("hiden");
  else btnPrevious.classList.remove("hiden");

  if (page >= sotrang) btnNext.classList.add("hiden");
  else btnNext.classList.remove("hiden");
  pageNumber.textContent = page;
}

btnNext.addEventListener("click", (e) => {
  (async function () {
    page++;
    await tinTuc(page);
  })();
  e.preventDefault();
});

btnPrevious.addEventListener("click", (e) => {
  (async function () {
    page--;
    await tinTuc(page);
  })();
  e.preventDefault();
});
