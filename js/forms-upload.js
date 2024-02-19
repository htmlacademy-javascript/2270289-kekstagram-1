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

const pristine = new Pristine(formUpload,{
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__field-wrapper--invalid', // Класс, обозначающий невалидное поле
  successClass: 'img-upload__field-wrapper--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});
const inputHashTag = formUpload.querySelector('#hashtags');
const textareaComment = formUpload.querySelector('#commentfield');

const MAX_COUNT_HASHTAG = 5; // максимальное количество хэштэгов в строке
const HASHTAG_DIVIDER = ' ';
const regularHashTag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/; // регулярное выражение для проверки валидности введенного хештега
let messageErrorValidHashTag = '';
let messageErrorValidCommentField = '';

function onClickButtonScaleControlSmaller () {
  if (buttonScaleControlValue.value > 25 && buttonScaleControlValue.value < 100) {
    buttonScaleControlValue.value -= 25;
  }
}

function onclickButtonScaleControlBigger () {
  if (buttonScaleControlValue.value < 100 && buttonScaleControlValue.value > 25) {
    buttonScaleControlValue.value += 25;
  }
}

buttonScaleControlValue.onchange = function () {
  //console.log('buttonScaleControlValue.value = ' + buttonScaleControlValue.value);
};

function validateFormUploadFoto (evt) {
  console.log('вход в валидацию ');
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    console.log('форма валидна');
  } else {
    console.log('форма НЕ валидна');
  }
}

// Функция обработчик валидации поля ХэшТэг
function validateHashTag (value) {
  if (value !== '') {
    const hashtags = value.split(HASHTAG_DIVIDER);
    if (hashtags.length <= MAX_COUNT_HASHTAG) {
      hashtags.forEach((value,index) => {
        const regularItem = regularHashTag.test(value);
        if (regularItem === false) {
          messageErrorValidHashTag = `Хэш тэг под номером ${index + 1} не валиден!`;
          return false;
        }
      });
      return true;
    } else {
      messageErrorValidHashTag = `Максимально возможное количество ХэшТэгов равно ${MAX_COUNT_HASHTAG}`;
      return false;
    }
  }
  return true;
}

// Функция обработчик валидации поля Комментарий
function validateCommentField (value) {
  if (value.length > 140) {
    messageErrorValidCommentField = 'Комментарий не может содержать более 140 символов.';
    return false;
  }
  return true;
}

// добавляем валидатор на поле ХэшТег
pristine.addValidator(
  inputHashTag,
  validateHashTag,
  messageErrorValidHashTag
);

// добавляем валидатор на поле Комментарий
pristine.addValidator(
  textareaComment,
  validateCommentField,
  messageErrorValidCommentField);

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
