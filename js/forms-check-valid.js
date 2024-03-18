const MAX_COUNT_HASHTAG = 5; // максимальное количество хэштэгов в строке
const MAX_COUNT_COMMENT_SYMBOLS = 140; // максимальное количество символов в комментарии
const HASHTAG_DIVIDER = ' ';
const regularHashTag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/; // регулярное выражение для проверки валидности введенного хештега

const ErrorCodes = {
  VALID: 0,
  COUNT: 1,
  UNIQUE: 2,
  FORMAT: 3,
  LONG_LENGTH: 4
};

const ErrorCodeToHashTagErrorMessageMap = {
  [ErrorCodes.VALID] : 'Valid',
  [ErrorCodes.COUNT] : 'Максимальное количество хэшТэгов равно 5.',
  [ErrorCodes.UNIQUE] : 'Все хэшТэги должны быть разными.',
  [ErrorCodes.FORMAT] : 'Имеется не правильно записанный хэштэг.<br> (Формат хэштэгов: #street #Дача).',
  [ErrorCodes.LONG_LENGTH] : 'Слишком длинный хэштэг.<br>Длина хэштэга 20 символов (включая решетку). ',
};

const ErrorCodeToErrorMessageCommentMap = {
  [ErrorCodes.VALID] : 'Valid',
  [ErrorCodes.LONG_LENGTH] : `Комментарий не может содержать более ${MAX_COUNT_COMMENT_SYMBOLS} символов.`
};

let currentErrorCode = ErrorCodes.VALID;

const formUpload = document.querySelector('#upload-select-image');
const inputHashTag = formUpload.querySelector('#hashtags');
const textareaComment = formUpload.querySelector('#comment-field');

const checkHashTag = (elements, maxCount, re) => {
  if (elements.length <= maxCount) {
    for (let i = 0; i < elements.length; i++) {
      const hashTag = elements[i];
      const isValidItem = re.test(hashTag);
      if (!isValidItem && hashTag.length > 0) { // Добавили возможность, что ХэшТэг, может быть пустым
        return hashTag.length > 20 ? ErrorCodes.LONG_LENGTH : ErrorCodes.FORMAT; // Добавили обработку большой длины хэштэега
      }
      const uniqElements = new Set(elements); // Использование множества для определения уникальности
      if (uniqElements.size !== elements.length) {
        return ErrorCodes.UNIQUE;
      }
    }
  } else {
    return ErrorCodes.COUNT;
  }
  return ErrorCodes.VALID;
};

const getErrorMessage = () => ErrorCodeToHashTagErrorMessageMap[currentErrorCode];
const getErrorMessageComment = () => ErrorCodeToErrorMessageCommentMap[currentErrorCode];

const pristine = new Pristine(formUpload,{
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__field-wrapper--invalid', // Класс, обозначающий невалидное поле
  successClass: 'img-upload__field-wrapper--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'p', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});

const validateFormUploadFoto = () => {
  currentErrorCode = ErrorCodes.VALID;
  return pristine.validate();
};

const getErrorCodeHashTag = (value) => {
  const hashtags = value.trim().replaceAll(/ +/g, ' ').split(HASHTAG_DIVIDER); // Добавили удаление концевых пробелов, а также удаление лишних прбелов внутри строки
  return checkHashTag(hashtags, MAX_COUNT_HASHTAG, regularHashTag);
};

const getErrorCodeComment = (value) => {
  if (value.length > MAX_COUNT_COMMENT_SYMBOLS) {
    return ErrorCodes.LONG_LENGTH;
  }
  return ErrorCodes.VALID;
};

// добавляем валидатор на поле ХэшТег
pristine.addValidator(
  inputHashTag,
  (value) => {
    currentErrorCode = getErrorCodeHashTag(value);
    return currentErrorCode === ErrorCodes.VALID;
  },
  getErrorMessage
);

// добавляем валидатор на поле Комментарий
pristine.addValidator(
  textareaComment,
  (value) => {
    currentErrorCode = getErrorCodeComment(value);
    return currentErrorCode === ErrorCodes.VALID;
  },
  getErrorMessageComment
);

const clearChangesFromPristine = () => pristine.reset();

export {validateFormUploadFoto,clearChangesFromPristine};
