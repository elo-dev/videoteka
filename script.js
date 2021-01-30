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

btnAddVideo.addEventListener('click', function(){
  blockAddVideo.classList.remove('addVideo');
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

  document.getElementById("imageVideo").addEventListener('change',function(e){
    var url = window.URL.createObjectURL(e.target.files[0]);
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
  // Добавление названия в блок preview
  var nameVideo = document.querySelector('.nameVideo').value;
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
});

  