import {isEscapeKey} from './utils.js';
import {validateFormUploadPhoto,clearChangesFromPristine} from './forms-check-valid.js';
import {addEventOnElementsWrapper, removeEventOnElementsWrapper} from './image-modify.js';
import {sendData} from './api.js';
import {openMessageAboutSuccessUpload} from './message-success.js';
import {openMessageAboutErrorUpload} from './message-error.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const FILE_TYPES = ['jpg', 'jpeg', 'png']; // Массив расширений

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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onUserFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = validateFormUploadPhoto();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(openMessageAboutSuccessUpload)
      .catch(() => {
        openMessageAboutErrorUpload();
      })
      .finally(unblockSubmitButton);
  }
};

const onDocumentFormKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const idElement = String(evt.target.id);
    if (idElement !== 'hashtags' && idElement !== 'comment-field') {
      onClickButtonForCloseFormUploadPhoto ();
    }
  }
};

const onChangeInputFile = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  buttonUploadCancel.addEventListener('click',onClickButtonForCloseFormUploadPhoto);
  document.addEventListener('keydown',onDocumentFormKeyDown); // обработчик нажатие клавиш на клавиатуре, на document

  const file = inputUploadFile.files[0]; // Выбрали файл(изображение)
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it)); // проверка загруженного файла на допустимое расширение

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file); // Загружаемый файл правильный, создаем ссылку на файл
    formUpload.addEventListener('submit',onUserFormSubmit);
    addEventOnElementsWrapper();
  }
};

const clearToDefaultValue = () => {
  inputUploadFile.value = null;
  inputHashTags.value = null;
  inputCommentField.value = null;
  radioButtonOriginalEffect.checked = true;
  imagePreview.style.transform = 'scale(100)';
  inputScaleControlValue.value = '100';
  clearChangesFromPristine();
};

// Функциональное объявление, для поднятия.
function onClickButtonForCloseFormUploadPhoto () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonUploadCancel.removeEventListener('click',onClickButtonForCloseFormUploadPhoto);
  formUpload.removeEventListener('submit',onUserFormSubmit);
  document.removeEventListener('keydown',onDocumentFormKeyDown);

  clearToDefaultValue();

  removeEventOnElementsWrapper();
}

export {onChangeInputFile,onDocumentFormKeyDown, onClickButtonForCloseFormUploadPhoto};
