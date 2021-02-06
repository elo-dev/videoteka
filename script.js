"use strict";
  
const modal = document.querySelector(".modal");
const openLogIn = document.querySelector(".header__menu_signin");
const loginInput = document.querySelector('#login');
const passInput = document.querySelector('#pass');


function handleModalOpen() {
  modal.classList.add("not-hidden");
}

function handleModalClose() {
  modal.classList.remove("not-hidden");
}

const handleModalClick = event => {
    if(event.target.closest('.close') || !event.target.closest('.modal-content')){
        handleModalClose();
    }
}

openLogIn.addEventListener("click", handleModalOpen);
modal.addEventListener("click", handleModalClick);

const btnAddVideo = document.querySelector('.btn-success');
const blockAddVideo = document.querySelector('.addVideo');
const blockTopVideo = document.querySelector('.topVideo');

btnAddVideo.addEventListener('click', function(){
  if(blockAddVideo.hasAttribute('hidden')){
    blockAddVideo.removeAttribute('hidden');
    blockTopVideo.setAttribute('hidden', false);
  } else {
    blockAddVideo.setAttribute('hidden', false);
    blockTopVideo.removeAttribute('hidden');
  }
});

const addVideo = document.querySelector('.btn-success-form');
// Счетчик ID добавление в массив
let id = 0;

addVideo.addEventListener('click', function(event){
  event.preventDefault();
  var nameVideo = document.querySelector('.nameVideo');

  var input = document.querySelector('#imageVideo');
  var error = document.querySelector('.error');
  var success = document.querySelector('.success');
  var curFile = input.files;

  var btnGenere = document.querySelector('.btn-genere');

  // Создание блока с ошибками, если одно из полей не заполнено
  if(!nameVideo.value){
    nameVideo.style.border = "2px solid red";
    var errName = document.createElement('p');
    errName.textContent = 'Название не выбрано';
    error.appendChild(errName);
  }
  if(!checkbox){
    var errRate = document.createElement('p');
    errRate.textContent = 'Рейтинг не указан';
    error.appendChild(errRate);
  }
  if(!genere){
    btnGenere.style.border = "2px solid red";
    var errGenere = document.createElement('p');
    errGenere.textContent = 'Жанр не выбран';
    error.appendChild(errGenere);
  }
  if(curFile.length == 0){
    var errFile = document.createElement('p');
    errFile.textContent = 'Файл для загрузки не выбран';
    error.appendChild(errFile);
  }

  var blockSerials = document.querySelector('#serials');
  var blockFilms = document.querySelector('#films');

  var resetCheckboxInput = document.querySelectorAll('[name="rating"]');

  // Сброс input Checkbox
  resetCheckboxInput.forEach(e =>{
    e.checked = false;
  })  

  // Создание Массива из объектов  
  const card = [];
    if(document.onclick = addVideo){
    id++;
    card.push({
          "id" : id,
          "img" : url,
          "title" : nameVideo.value,
          "genere" : genere,
          "rate" : checkbox,
          "sort" : sortCheck
    });
  }

  // Создание Класса , который рендерит карточку и отображает карточку на странице
  class Card {
    render(){
      let htmlCard = '';
      card.forEach(({id, img, title, genere, rate, sort}) => {
        htmlCard += `
        <div class="col mb-4">
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
        </div>
      </div>
        `;
      });
      // Валидация полей
      if(typeof url !== 'undefined' && sortCheckAttr == 'films' && nameVideo.value && checkbox && genere && curFile.length > 0){
        blockFilms.insertAdjacentHTML('beforeend', htmlCard);
        nameVideo.value = '';
        genere = '';
        blockNameGenere.textContent = '';
        var successBlock = document.createElement('p');
        successBlock.textContent = 'Карточка добавлена';
        success.appendChild(successBlock);
      } else if(typeof url !== 'undefined' && sortCheckAttr == 'serials' && nameVideo.value && checkbox && genere && curFile.length > 0){
        blockSerials.insertAdjacentHTML('beforeend', htmlCard);
        nameVideo.value = '';
        genere = '';
        blockNameGenere.textContent = '';
        var successBlock = document.createElement('p');
        successBlock.textContent = 'Карточка добавлена';
        success.appendChild(successBlock);
      }
    }
  }
  // Создание экземпляра 
  const cardPage = new Card();
  // Вызов функции render() экземпляра
  cardPage.render();
})

// Изменение стилей у выбранного направления (Сериал/Фильм) 
var sortList = document.querySelectorAll('.form__sort-btn');
var sortBtnSerials = document.querySelector('.form__sort-btn-serials');
var sortBtnFilms = document.querySelector('.form__sort-btn-films');

sortList.forEach(e =>{
  e.onclick = function(event){
    var sortListAttr = event.target.getAttribute('data-sort');
    if(sortListAttr === 'films'){
      sortBtnFilms.classList.add('active');
      sortBtnSerials.classList.remove('active');
    } else if(sortListAttr === 'serials'){
      sortBtnSerials.classList.add('active');
      sortBtnFilms.classList.remove('active');
    }
  }
})

// Выбор направления (Сериал/Фильм)
const sort = document.querySelectorAll('.form__sort');
var sortCheck;
var sortCheckAttr;

sort.forEach(e => {
  e.onclick = function(event){
    event.preventDefault();
    sortCheck = event.target.textContent;
    sortCheckAttr = event.target.getAttribute('data-sort');
  }
});

// Выбор рейтинга
var rateCheckbox = document.querySelectorAll('[type="radio"]');
var checkbox;

  rateCheckbox.forEach(e =>{
    e.onchange = function(event){
      checkbox = event.target.value;
    }
  })

 // Выбор жанра
  var listGenere = document.querySelectorAll('.dropdown-menu>.dropdown-item');
  var genere;
  var blockNameGenere = document.querySelector('.wrapper__nameGenere');

  listGenere.forEach(e =>{
    e.onclick = function(event){
      genere = event.target.textContent;
      var nameGenere = document.createElement('p');
      nameGenere.classList.add('nameGenere');
      nameGenere.textContent = genere;
      blockNameGenere.insertAdjacentElement('afterbegin', nameGenere);
      if (blockNameGenere.childElementCount > 1){
        blockNameGenere.lastChild.remove();
      }
    }
  });

  // Получение и отображение изображения в предпоказе
  var blockPreview = document.querySelector('.wrapper__form__preview');
  // URL изображения
  var url;

  document.getElementById("imageVideo").addEventListener('change',function (e){
    url = window.URL.createObjectURL(e.target.files[0]);
    var img = document.createElement('img');
    img.id = 'form__imgPreview';
    blockPreview.insertAdjacentElement('beforeend', img);
    img.src = url;
    if(blockPreview.childElementCount > 1){
      blockPreview.firstChild.remove();
    }
  })

  // Создание предпоказа карточки
  document.querySelector('.btn-preview').addEventListener('click', function(e){
  e.preventDefault();
  var nameVideo = document.querySelector('.nameVideo').value;
  var error = document.querySelector('.error');

  // Проверка на пустоту полей
  if(nameVideo !== '' && typeof checkbox !== 'undefined' && typeof genere !== 'undefined'){
  // Добавление названия в блок preview
    var pNameVideo = document.createElement('p');
        pNameVideo.id = 'preview__nameVideo';
        blockPreview.insertAdjacentElement('beforeend', pNameVideo);
        pNameVideo.insertAdjacentText('beforeend', nameVideo);
  // Добавление рейтинга в блок preview
    var rateVideo = document.createElement('span');
    var spanRateVideo = document.createElement('span');
    var spanRateVideoStar = document.createElement('span');
        spanRateVideoStar.classList.add("fa","fa-star","rating-star");
        rateVideo.id = 'preview__rateVideo';
        spanRateVideo.id = 'preview__wrapper__rateVideo';
        spanRateVideo.insertAdjacentElement('beforeend', spanRateVideoStar);
        blockPreview.insertAdjacentElement('beforeend', spanRateVideo);
        spanRateVideo.insertAdjacentElement('beforeend', rateVideo);
        rateVideo.insertAdjacentText('beforeend', checkbox);
  // Добавление жанра в блок preview
    var pGenereVideo = document.createElement('span');
        pGenereVideo.id = 'preview__genereVideo';
        spanRateVideo.insertAdjacentElement('beforeend', pGenereVideo);
        pGenereVideo.insertAdjacentText('beforeend', genere);
  } else if(nameVideo !== '' && typeof checkbox === 'undefined'){
    var errRatePreview = document.createElement('p');
        errRatePreview.textContent = 'Вы не указали рейтинг';
        error.appendChild(errRatePreview);
  } else if(nameVideo === '' && typeof checkbox !== 'undefined'){
    var errNamePreview = document.createElement('p');
        errNamePreview.textContent = 'Вы не указали название';
        error.appendChild(errNamePreview);
  } else{
    var errPreview = document.createElement('p');
        errPreview.textContent = 'Вы не указали поле название, рейтинг и жанр';
        error.appendChild(errPreview);
  }
});