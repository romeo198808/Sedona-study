"use strict"

let buttonSend = document.querySelector('.form__button');
let popupSuccess = document.querySelector('.popup--saccess');
let popupFailure = document.querySelector('.popup--failure');
let inputName = document.querySelector('#name');
let surName = document.querySelector('#surname');
let secondName = document.querySelector('#secondname');
let popupButtons =document.querySelectorAll('.popup__button');

function onDisplay(el) {
  el.classList.add('popup--ondisplay');
}
console.log(popupFailure);

buttonSend.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (inputName.value && surName.value && secondName.value) {
    onDisplay(popupSuccess);
  } else {
    onDisplay(popupFailure);
  }
  for (let index = 0; index < popupButtons.length; index++) {
    popupButtons[index].addEventListener('click', function(evt) {
      evt.preventDefault();
      location.reload();
      console.log(evt);
    });
  }
});

