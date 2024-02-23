import {checkHashTag} from './utils.js';

const formUpload = document.querySelector('#upload-select-image');

const inputHashTag = formUpload.querySelector('#hashtags');
const textareaComment = formUpload.querySelector('#comment-field');

const MAX_COUNT_HASHTAG = 5; // максимальное количество хэштэгов в строке
const HASHTAG_DIVIDER = ' ';
const regularHashTag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/; // регулярное выражение для проверки валидности введенного хештега
let messageErrorValidHashTag = '';
let messageErrorValidCommentField = '';

const pristine = new Pristine(formUpload,{
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__field-wrapper--invalid', // Класс, обозначающий невалидное поле
  successClass: 'img-upload__field-wrapper--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'p', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});


function validateFormUploadFoto (evt) {
  messageErrorValidHashTag = '';
  messageErrorValidCommentField = '';
  evt.preventDefault();
  pristine.validate();
}

// Функция обработчик валидации поля ХэшТэг
function validateHashTag (value) {
  if (value.length !== 0) {
    const hashtags = value.trim().replaceAll(/ +/g, ' ').split(HASHTAG_DIVIDER); // Добавили удаление концевых пробелов, а также удаление лишних прбелов внутри строки
    const resultVerifyHashTag = checkHashTag(hashtags, MAX_COUNT_HASHTAG, regularHashTag);
    if (resultVerifyHashTag !== 'Valid') {
      messageErrorValidHashTag = resultVerifyHashTag;
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
  () => messageErrorValidHashTag
);

// добавляем валидатор на поле Комментарий
pristine.addValidator(
  textareaComment,
  validateCommentField,
  () => messageErrorValidCommentField
);

export {validateFormUploadFoto};
