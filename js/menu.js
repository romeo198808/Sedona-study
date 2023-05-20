"use strict"

let buttonOpen = document.querySelector('.control__button--open');
let buttonClose =document.querySelector('.control__button--close');
let menu = document.querySelector('.nav');

buttonOpen.addEventListener('click', function(evt) {
  evt.preventDefault();
  menu.classList.remove('nav--close')
  buttonClose.style.display="block";
})

buttonClose.addEventListener('click', function(evt) {
  evt.preventDefault();
  menu.classList.add('nav--close');
  buttonClose.style.display="none";
})