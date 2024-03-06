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
const radioButtonOriginalEffect = document.querySelector('#effect-none');
const imagePreview = divImgUploadPreview.querySelector('img');
const inputScaleControlValue = document.querySelector('.scale__control--value');

const messageSuccesUploadTemplate = document.querySelector('#success').content;

function openMessageAboutSuccessUpload () {
  const messageSuccess = messageSuccesUploadTemplate.cloneNode(true);
  const containerMessageSuccess = messageSuccess.querySelector('section');
  //const buttonSuccess = messageSuccess.querySelector('.success__button');

  containerMessageSuccess.id = 'section-message-success';

  document.body.append(messageSuccess);

  const buttonInsertSuccess = document.body.querySelector('#section-message-success');

  buttonInsertSuccess.addEventListener('click', () => {
    buttonInsertSuccess.remove();
  });


}

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

function activateActionsAfteSuccessUpload () {
  openMessageAboutSuccessUpload();
  unblockSubmitButton();
}

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
      .finally(activateActionsAfteSuccessUpload);
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

function clearToDefaultValue() {
  inputUploadFile.value = null;
  inputHashTags.value = null;
  inputCommentField.value = null;
  radioButtonOriginalEffect.checked = true;
  imagePreview.style.transform = 'scale(100)';
  inputScaleControlValue.value = '100';
}

function closeFormUploadPhoto () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonUploadCancel.removeEventListener('click',closeFormUploadPhoto);
  formUpload.removeEventListener('submit',setUserFormSubmit);

  clearToDefaultValue();

  removeEventOnElementsWrapper();
}
