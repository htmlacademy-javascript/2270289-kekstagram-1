import {isEscapeKey} from './utils.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const inputUploadFile = document.querySelector('#upload-file');
const buttonUploadCancel = document.querySelector('#upload-cancel');
const divImgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadPreview = divImgUploadPreview.querySelector('img');

const formUpload = document.querySelector('#upload-select-image');

const buttonScaleControlValue = document.querySelector('.scale__control--value');
const buttonScaleControlSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = document.querySelector('.scale__control--bigger');

const pristine = new Pristine(formUpload);
const inputHashTag = formUpload.querySelector('#hashtags');
const textareaMessage = formUpload.querySelector('#commentfield');

function onClickButtonScaleControlSmaller () {
  //console.log('buttonScaleControlValue.value = ' + buttonScaleControlValue.value);
  if (buttonScaleControlValue.value > 25 && buttonScaleControlValue.value < 100) {
    //buttonScaleControlValue.value -= 25;
  }
  //console.log('buttonScaleControlValue.value = ' + buttonScaleControlValue.value);
}

function onclickButtonScaleControlBigger () {
  //console.log('buttonScaleControlValue.value = ' + buttonScaleControlValue.value);
  if (buttonScaleControlValue.value < 100 && buttonScaleControlValue.value > 25) {
    //buttonScaleControlValue.value += 25;
  }
  //console.log('buttonScaleControlValue.value = ' + buttonScaleControlValue.value);
}

buttonScaleControlValue.onchange = function () {
  //console.log('buttonScaleControlValue.value = ' + buttonScaleControlValue.value);
};

function validateFormUploadFoto (evt) {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    //
  } else {
    //
  }

}


inputUploadFile.onchange = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  buttonUploadCancel.addEventListener('click',closeFormUploadFoto);
  document.addEventListener('keydown',onDocumentFormKeyDown); // обработчик нажатие клавиш на клавиатуре, на document
  imgUploadPreview.src = URL.createObjectURL(inputUploadFile.files[0]);

  buttonScaleControlSmaller.addEventListener('click',onClickButtonScaleControlSmaller);
  buttonScaleControlBigger.addEventListener('click',onclickButtonScaleControlBigger);

  formUpload.addEventListener('submit',validateFormUploadFoto);

};

function onDocumentFormKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormUploadFoto ();
  }
}

function closeFormUploadFoto () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonUploadCancel.removeEventListener('click',closeFormUploadFoto);
  inputUploadFile.value = null;

  buttonScaleControlSmaller.removeEventListener('click',onClickButtonScaleControlSmaller);
  buttonScaleControlBigger.removeEventListener('click',onclickButtonScaleControlBigger);

  formUpload.removeEventListener('submit',validateFormUploadFoto);
}
