import {isEscapeKey, showAlert} from './utils.js';
import {validateFormUploadFoto} from './forms-check-valid.js';
import {addEventOnElementsWrapper, removeEventOnElementsWrapper} from './image-modify.js';
import {sendData} from './api.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const inputUploadFile = document.querySelector('#upload-file');
const buttonUploadCancel = document.querySelector('#upload-cancel');
const divImgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadPreview = divImgUploadPreview.querySelector('img');

const formUpload = document.querySelector('#upload-select-image');

const inputHashTags = document.querySelector('#hashtags');
const inputCommentField = document.querySelector('#comment-field');

const submitButton = document.querySelector('#upload-submit');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

function onChangeInputFile () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  buttonUploadCancel.addEventListener('click',closeFormUploadPhoto);
  document.addEventListener('keydown',onDocumentFormKeyDown); // обработчик нажатие клавиш на клавиатуре, на document
  imgUploadPreview.src = URL.createObjectURL(inputUploadFile.files[0]);

  formUpload.addEventListener('submit',setUserFormSubmit);

  addEventOnElementsWrapper();
}

inputUploadFile.addEventListener('change', onChangeInputFile);

function setUserFormSubmit (evt) {
  evt.preventDefault();
  const isValid = validateFormUploadFoto();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(closeFormUploadPhoto)
      .catch((err) => {
        showAlert(err.message);
      })
      .finally(unblockSubmitButton);
    /*
    const formData = new FormData(evt.target);
    fetch (
      'https://28.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          closeFormUploadPhoto();
        } else {
          showAlert('Не удалось отправить форму');
        }
      })
      .catch(() => {
        showAlert('Не удалось отправить форму');
      });
      */
  }
}

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
  inputHashTags.value = null;
  inputCommentField.value = null;

  formUpload.removeEventListener('submit',setUserFormSubmit);

  removeEventOnElementsWrapper();
}
