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
  blockAddVideo.hidden = false;
  blockTopVideo.hidden = true;
});

const addVideo = document.querySelector('.btn-success-form');

addVideo.addEventListener('click', function(event){
  event.preventDefault();
  var nameVideo = document.querySelector('.nameVideo').value;

  var input = document.querySelector('#imageVideo');
  var error = document.querySelector('.error');
  var curFile = input.files;

  if(nameVideo.length === 0){
    var errName = document.createElement('p');
    errName.textContent = 'Название не выбрано';
    error.appendChild(errName);
  }
  
  if(curFile.length === 0){
    var errFile = document.createElement('p');
    errFile.textContent = 'Файл для загрузки не выбран';
    error.appendChild(errFile);
  }

  var cardWrapper = document.querySelector('.cardVideo-row');

  console.log(cardWrapper);
  
  const videoCard = `
  <div class="col mb-4">
    <div class="card">
      <img src="${url}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${nameVideo}</h5>
        <div class="wrapper__footer-card">
          <span class="fa fa-star rating-star"></span>
          <span class="card-rate">${checkbox}</span>
          <span class="card-genere">${genere}</span>
        </div>
      </div>
    </div>
  </div>
  `;

  cardWrapper.insertAdjacentHTML('beforeend', videoCard);
})

var rateCheckbox = document.querySelectorAll('[type="radio"]');
var checkbox;

  rateCheckbox.forEach(e =>{
    e.onchange = function(event){
      checkbox = event.target.value;
    }
  })

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

  var blockPreview = document.querySelector('.wrapper__form__preview');
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