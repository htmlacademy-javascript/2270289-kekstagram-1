import {isEscapeKey} from './utils.js';
import {validateFormUploadFoto} from './forms-check-valid.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const inputUploadFile = document.querySelector('#upload-file');
const buttonUploadCancel = document.querySelector('#upload-cancel');
const divImgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadPreview = divImgUploadPreview.querySelector('img');

const formUpload = document.querySelector('#upload-select-image');

const buttonScaleControlValue = document.querySelector('.scale__control--value');
const buttonScaleControlSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = document.querySelector('.scale__control--bigger');

function onClickButtonScaleControlSmaller () {
  if (buttonScaleControlValue.value > 25 && buttonScaleControlValue.value < 100) {
    buttonScaleControlValue.value -= 25;
  }
}

function onClickButtonScaleControlBigger () {
  if (buttonScaleControlValue.value < 100 && buttonScaleControlValue.value > 25) {
    buttonScaleControlValue.value += 25;
  }
}

function onChangeInputFile () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  buttonUploadCancel.addEventListener('click',closeFormUploadPhoto);
  document.addEventListener('keydown',onDocumentFormKeyDown); // обработчик нажатие клавиш на клавиатуре, на document
  imgUploadPreview.src = URL.createObjectURL(inputUploadFile.files[0]);

  buttonScaleControlSmaller.addEventListener('click',onClickButtonScaleControlSmaller);
  buttonScaleControlBigger.addEventListener('click',onClickButtonScaleControlBigger);

  formUpload.addEventListener('submit',validateFormUploadFoto);
}

inputUploadFile.addEventListener('change', onChangeInputFile);

function onDocumentFormKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const idElement = String(evt.target.id);
    if (idElement !== 'hashtags' && idElement !== 'comment-field') {
      closeFormUploadPhoto ();
    }
  }
}

function closeFormUploadPhoto () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonUploadCancel.removeEventListener('click',closeFormUploadPhoto);
  inputUploadFile.value = null;

  buttonScaleControlSmaller.removeEventListener('click',onClickButtonScaleControlSmaller);
  buttonScaleControlBigger.removeEventListener('click',onClickButtonScaleControlBigger);

  formUpload.removeEventListener('submit',validateFormUploadFoto);
}
