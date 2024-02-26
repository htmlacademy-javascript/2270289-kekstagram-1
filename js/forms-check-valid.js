
const formUpload = document.querySelector('#upload-select-image');

const inputHashTag = formUpload.querySelector('#hashtags');
const textareaComment = formUpload.querySelector('#comment-field');

const MAX_COUNT_HASHTAG = 5; // максимальное количество хэштэгов в строке
const MAX_COUNT_COMMENT_SYMBOLS = 140; // максимальное количество символов в комментарии
const HASHTAG_DIVIDER = ' ';
const regularHashTag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/; // регулярное выражение для проверки валидности введенного хештега
let messageErrorValidHashTag = '';
let messageErrorValidCommentField = '';

const errorCodes = {
  Valid: 0,
  Count: 1,
  Unique: 2,
  Format: 3,
  longLength: 4
};

let currentErrorCode = errorCodes.Valid;

const errorCodeToErrorMessageMap = {
  [errorCodes.Valid] : 'Valid',
  [errorCodes.Count] : 'Максимальное количество хэшТэгов равно 5.',
  [errorCodes.Unique] : 'Все хэшТэги должны быть разными.',
  [errorCodes.Format] : 'Имеется не правильно записанный хэштэг.<br> (Формат хэштэгов: #street #Дача).',
  [errorCodes.longLength] : 'Слишком длинный хэштэг.<br>Длина хэштэга 20 символов (включая решетку). '
};

function checkHashTag(elements, maxCount, re) {
  if (elements.length <= maxCount) {
    for (let i = 0; i < elements.length; i++) {
      const hashTag = elements[i];
      const isValidItem = re.test(hashTag);
      if (!isValidItem) {
        return hashTag.length > 20 ? errorCodes.longLength : errorCodes.Format;
      }
      const uniqElements = new Set(elements);
      if (uniqElements.size !== elements.length) {
        return errorCodes.Unique;
      }
    }
  } else {
    return errorCodes.Count;
  }
  return errorCodes.Valid;
}

function getErrorMessage () {
  return errorCodeToErrorMessageMap[currentErrorCode];
}

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
  currentErrorCode = errorCodes.Valid;
  evt.preventDefault();
  pristine.validate();
}

const getErrorCode = (value) => {
  //const hashtags = value.trim().replaceAll(/ +/g, ' ').split(HASHTAG_DIVIDER); // Добавили удаление концевых пробелов, а также удаление лишних прбелов внутри строки
  //const resultVerifyHashTag = getErrorMessage (checkHashTag(hashtags, MAX_COUNT_HASHTAG, regularHashTag));
  const hashtags = value.trim().replaceAll(/ +/g, ' ').split(HASHTAG_DIVIDER); // Добавили удаление концевых пробелов, а также удаление лишних прбелов внутри строки
  return checkHashTag(hashtags, MAX_COUNT_HASHTAG, regularHashTag);
};

// Функция обработчик валидации поля ХэшТэг
/*
function validateHashTag (value) {
  if (value.length !== 0) {
    //const hashtags = value.trim().replaceAll(/ +/g, ' ').split(HASHTAG_DIVIDER); // Добавили удаление концевых пробелов, а также удаление лишних прбелов внутри строки
    //const resultVerifyHashTag = getErrorMessage (checkHashTag(hashtags, MAX_COUNT_HASHTAG, regularHashTag));
    if (resultVerifyHashTag !== 'Valid') {
      messageErrorValidHashTag = resultVerifyHashTag;
      return false;
    }
  }
  return true;
}
*/

// Функция обработчик валидации поля Комментарий
function validateCommentField (value) {
  if (value.length > MAX_COUNT_COMMENT_SYMBOLS) {
    messageErrorValidCommentField = `Комментарий не может содержать более ${MAX_COUNT_COMMENT_SYMBOLS} символов.`;
    return false;
  }
  return true;
}

// добавляем валидатор на поле ХэшТег
pristine.addValidator(
  inputHashTag,
  (value) => {
    const errorCode = getErrorCode(value);
    currentErrorCode = errorCode;
    return errorCode === errorCodes.Valid;
  },
  getErrorMessage
);

// добавляем валидатор на поле Комментарий
pristine.addValidator(
  textareaComment,
  validateCommentField,
  () => messageErrorValidCommentField
);

export {validateFormUploadFoto};
