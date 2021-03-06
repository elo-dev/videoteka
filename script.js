"use strict";

const modal = document.querySelector(".modal");
const openLogIn = document.querySelector(".header__menu_signin");
const loginInput = document.querySelector("#login");
const passInput = document.querySelector("#pass");
const blockSerials = document.querySelector("#serials");
const blockFilms = document.querySelector("#films");

function render(id, img, title, rate, genere, sort) {
  let htmlCard = `
        <div id="card-${id}" class="col mb-4 cardVideo">
        <div class="card">
          <img src="${img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <div class="wrapper__footer-card">
              <span class="fa fa-star rating-star"></span>
              <span class="card-rate">${rate}</span>
              <span class="card-genere">${genere}</span>
              <span class="card-sort">${sort}</span>
            </div>
          </div>
          <div class="card__delete">
            <i class="fa fa-trash trash" aria-hidden="true" onClick="deleteCard(${id})"></i>
          </div>
        </div>
      </div>
      `;
  if (img !== '' && title && rate && genere && sort === "Сериалы") {
    blockSerials.innerHTML += htmlCard;
  } else if (img !== '' && title && rate && genere && sort === "Фильмы") {
    blockFilms.innerHTML += htmlCard;
  }
}

  function resetData(){
    var curFile = inputImage.files;
    var success = document.querySelector(".success");
    var resetCheckboxInput = document.querySelectorAll('[name="rating"]');
    if(typeof img.src !== 'undefined' && sortCheckAttr == 'films' || sortCheckAttr == 'serials' && nameVideo.value && checkbox && genere && curFile.length > 0){
      nameVideo.value = '';
      genere = '';
      blockNameGenere.textContent = '';
      var successBlock = document.createElement('p');
      successBlock.textContent = 'Карточка добавлена';
      success.appendChild(successBlock);
    } 
    // Сброс input Checkbox
    resetCheckboxInput.forEach((e) => {
      e.checked = false;
    });
  }

let dataParse = JSON.parse(localStorage.getItem("card"));
let id = 0;
if (dataParse) {
  dataParse.forEach((el) => {
    render(el.id, el.img, el.title, el.rate, el.genere, el.sort);
    id = el.id;
  });
} else {
  localStorage.setItem("card", JSON.stringify([]));
}

let deleteCard = (id) =>{
  let dataParse = JSON.parse(localStorage.getItem("card"));
  let cardVideoRow = document.querySelector('.cardVideo-row');
  let cardVideo = document.getElementById(`card-${id}`);
      cardVideoRow.removeChild(cardVideo);
      for(let index = 0; index < dataParse.length; index++){;
        if(dataParse[index].id === id){
          dataParse.splice(index, 1);
        }
      }
      localStorage.setItem("card", JSON.stringify(dataParse));
}

function handleModalOpen() {
  modal.classList.add("not-hidden");
}

function handleModalClose() {
  modal.classList.remove("not-hidden");
}

const handleModalClick = (event) => {
  if (
    event.target.closest(".close") ||
    !event.target.closest(".modal-content")
  ) {
    handleModalClose();
  }
};

openLogIn.addEventListener("click", handleModalOpen);
modal.addEventListener("click", handleModalClick);

const btnAddVideo = document.querySelector(".btn-success");
const blockAddVideo = document.querySelector(".addVideo");
const blockTopVideo = document.querySelector(".topVideo");

btnAddVideo.addEventListener("click", function () {
  if (blockAddVideo.hasAttribute("hidden")) {
    blockAddVideo.removeAttribute("hidden");
    blockTopVideo.setAttribute("hidden", false);
  } else {
    blockAddVideo.setAttribute("hidden", false);
    blockTopVideo.removeAttribute("hidden");
  }
});

function validVoidInput(){
  var curFile = inputImage.files;
  var success = document.querySelector(".success");
  var error = document.querySelector(".error");
  var btnGenere = document.querySelector(".btn-genere");

  // Создание блока с ошибками, если одно из полей не заполнено
  if (!nameVideo.value) {
    nameVideo.style.border = "2px solid red";
    var errName = document.createElement("p");
    errName.textContent = "Название не выбрано";
    error.appendChild(errName);
  }
  if (!checkbox) {
    var errRate = document.createElement("p");
    errRate.textContent = "Рейтинг не указан";
    error.appendChild(errRate);
  }
  if (!genere) {
    btnGenere.style.border = "2px solid red";
    var errGenere = document.createElement("p");
    errGenere.textContent = "Жанр не выбран";
    error.appendChild(errGenere);
  }
  if (curFile.length == 0) {
    var errFile = document.createElement("p");
    errFile.textContent = "Файл для загрузки не выбран";
    error.appendChild(errFile);
  }
}

const addVideo = document.querySelector(".btn-success-form");
var nameVideo = document.querySelector(".nameVideo");
var success = document.querySelector(".success");
var error = document.querySelector(".error");

addVideo.addEventListener("click", function (event) {
  event.preventDefault();

  validVoidInput();

  let data = JSON.parse(localStorage.getItem("card"));
  if(nameVideo.value && checkbox && genere && sortCheck && img.src && (document.onclick = addVideo)){
    id++;
    data.push({
      id: id,
      img: img.src,
      title: nameVideo.value,
      genere: genere,
      rate: checkbox,
      sort: sortCheck,
    });
  }
  localStorage.setItem("card", JSON.stringify(data));

  render(id, img.src, nameVideo.value, genere, checkbox, sortCheck);
  resetData();
  if(success.childElementCount !== 0){
    while (error.firstChild) {
      error.removeChild(error.firstChild);
    }
  } else if(error.childElementCount !== 0){
    while (success.firstChild) {
      success.removeChild(success.firstChild);
    }
  }
});

// Изменение стилей у выбранного направления (Сериал/Фильм)
var sortList = document.querySelectorAll(".form__sort-btn");
var sortBtnSerials = document.querySelector(".form__sort-btn-serials");
var sortBtnFilms = document.querySelector(".form__sort-btn-films");

sortList.forEach((e) => {
  e.onclick = function (event) {
    var sortListAttr = event.target.getAttribute("data-sort");
    if (sortListAttr === "films") {
      sortBtnFilms.classList.add("active");
      sortBtnSerials.classList.remove("active");
    } else if (sortListAttr === "serials") {
      sortBtnSerials.classList.add("active");
      sortBtnFilms.classList.remove("active");
    }
  };
});

let inputImage = document.querySelector('input[type="file"]');
const img = new Image();

inputImage.addEventListener('change', function(e){
  const reader = new FileReader();
  reader.onload = function(){
    img.src = reader.result;
  }
  reader.readAsDataURL(inputImage.files[0]);
}, false)

// Выбор направления (Сериал/Фильм)
const sort = document.querySelectorAll(".form__sort");
var sortCheck;
var sortCheckAttr;
sort.forEach((e) => {
  e.onclick = function (event) {
    event.preventDefault();
    sortCheck = event.target.textContent;
    sortCheckAttr = event.target.getAttribute("data-sort");
  };
});

// Выбор рейтинга
var rateCheckbox = document.querySelectorAll('[type="radio"]');
var checkbox;

rateCheckbox.forEach((e) => {
  e.onchange = function (event) {
    checkbox = event.target.value;
  };
});

// Выбор жанра
var listGenere = document.querySelectorAll(".dropdown-menu>.dropdown-item");
var genere;
var blockNameGenere = document.querySelector(".wrapper__nameGenere");

listGenere.forEach((e) => {
  e.onclick = function (event) {
    genere = event.target.textContent;
    var nameGenere = document.createElement("p");
    nameGenere.classList.add("nameGenere");
    nameGenere.textContent = genere;
    blockNameGenere.insertAdjacentElement("afterbegin", nameGenere);
    if (blockNameGenere.childElementCount > 1) {
      blockNameGenere.lastChild.remove();
    }
  };
});

// // Получение и отображение изображения в предпоказе
// var blockPreview = document.querySelector(".wrapper__form__preview");
// // URL изображения
// var url;

// document.getElementById("imageVideo").addEventListener("change", function (e) {
//   url = window.URL.createObjectURL(e.target.files[0]);
//   var img = document.createElement("img");
//   img.id = "form__imgPreview";
//   blockPreview.insertAdjacentElement("beforeend", img);
//   img.src = url;
//   console.log(img);
//   if (blockPreview.childElementCount > 1) {
//     blockPreview.firstChild.remove();
//   }
// });

// Создание предпоказа карточки
document.querySelector(".btn-preview").addEventListener("click", function (e) {
  e.preventDefault();
  var nameVideo = document.querySelector(".nameVideo").value;
  var error = document.querySelector(".error");

  // Проверка на пустоту полей
  if (
    nameVideo !== "" &&
    typeof checkbox !== "undefined" &&
    typeof genere !== "undefined"
  ) {
    // Добавление названия в блок preview
    var pNameVideo = document.createElement("p");
    pNameVideo.id = "preview__nameVideo";
    blockPreview.insertAdjacentElement("beforeend", pNameVideo);
    pNameVideo.insertAdjacentText("beforeend", nameVideo);
    // Добавление рейтинга в блок preview
    var rateVideo = document.createElement("span");
    var spanRateVideo = document.createElement("span");
    var spanRateVideoStar = document.createElement("span");
    spanRateVideoStar.classList.add("fa", "fa-star", "rating-star");
    rateVideo.id = "preview__rateVideo";
    spanRateVideo.id = "preview__wrapper__rateVideo";
    spanRateVideo.insertAdjacentElement("beforeend", spanRateVideoStar);
    blockPreview.insertAdjacentElement("beforeend", spanRateVideo);
    spanRateVideo.insertAdjacentElement("beforeend", rateVideo);
    rateVideo.insertAdjacentText("beforeend", checkbox);
    // Добавление жанра в блок preview
    var pGenereVideo = document.createElement("span");
    pGenereVideo.id = "preview__genereVideo";
    spanRateVideo.insertAdjacentElement("beforeend", pGenereVideo);
    pGenereVideo.insertAdjacentText("beforeend", genere);
  } else if (nameVideo !== "" && typeof checkbox === "undefined") {
    var errRatePreview = document.createElement("p");
    errRatePreview.textContent = "Вы не указали рейтинг";
    error.appendChild(errRatePreview);
  } else if (nameVideo === "" && typeof checkbox !== "undefined") {
    var errNamePreview = document.createElement("p");
    errNamePreview.textContent = "Вы не указали название";
    error.appendChild(errNamePreview);
  } else {
    var errPreview = document.createElement("p");
    errPreview.textContent = "Вы не указали поле название, рейтинг и жанр";
    error.appendChild(errPreview);
  }
});