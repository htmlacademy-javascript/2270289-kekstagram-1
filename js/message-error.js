import {isEscapeKey} from './utils.js';
import {onDocumentFormKeyDown} from './forms-upload.js';

const ALERT_SHOW_TIME = 6000;
const messageErrorUploadTemplate = document.querySelector('#error').content;

const closeMessageErrorUpload = (evt) => {
  const currentElement = evt.target;
  const parentElement = currentElement.parentElement;
  const grandParentElement = parentElement.parentElement;

  restoringStateAfterErrorUpload(grandParentElement);
};

const onDocumentKeyDownOnMessageError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const sectionMessageError = document.body.querySelector('#section-message-error');
    restoringStateAfterErrorUpload(sectionMessageError);
  }
};

const onDocumentClickOnMessageError = (evt) => {
  const sectionMessageError = document.body.querySelector('#section-message-error');
  const innerBlock = sectionMessageError.querySelector('.error__inner');
  if (evt.target.id !== innerBlock.id) {
    restoringStateAfterErrorUpload(sectionMessageError);
  }
};

// Функциональное объявление, для поднятия.
function restoringStateAfterErrorUpload (element) {
  element.remove();
  document.removeEventListener('keydown',onDocumentKeyDownOnMessageError);
  document.removeEventListener('click',onDocumentClickOnMessageError);
  document.addEventListener('keydown',onDocumentFormKeyDown);
}

const openMessageAboutErrorUpload = () => {
  document.removeEventListener('keydown',onDocumentFormKeyDown);
  const messageError = messageErrorUploadTemplate.cloneNode(true);
  const containerMessageError = messageError.querySelector('section');
  const buttonError = messageError.querySelector('.error__button');
  const innerBlockMessageError = containerMessageError.querySelector('.error__inner');
  buttonError.addEventListener('click', closeMessageErrorUpload);
  containerMessageError.id = 'section-message-error';
  innerBlockMessageError.id = 'inner-block-message-error';

  document.addEventListener('keydown',onDocumentKeyDownOnMessageError);
  document.addEventListener('click',onDocumentClickOnMessageError);

  document.body.append(messageError);
};

const showAlertAboutErrorLoadData = () => {
  const alertContainerTemplate = document.querySelector('#error-load-data').content;
  const alertContainer = alertContainerTemplate.cloneNode(true);

  document.body.append(alertContainer);

  const sectionAlertErrorLoadData = document.querySelector('#section-error-load-data');

  setTimeout(() => {
    sectionAlertErrorLoadData.remove();
  }, ALERT_SHOW_TIME);
};

export {openMessageAboutErrorUpload, showAlertAboutErrorLoadData};
