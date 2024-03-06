import {isEscapeKey} from './utils.js';
import {onDocumentFormKeyDown} from './forms-upload.js';

const messageErrorUploadTemplate = document.querySelector('#error').content;

function restoringState (element) {
  element.remove();
  document.removeEventListener('keydown',onDocumentKeyDownOnMessageError);
  document.removeEventListener('click',onDocumentClickOnMessageError);
  document.addEventListener('keydown',onDocumentFormKeyDown);
}

function closeMessageErrorUpload (evt) {
  const currentElement = evt.target;
  const parentElement = currentElement.parentElement;
  const grandParentElement = parentElement.parentElement;
  grandParentElement.remove();
  document.removeEventListener('keydown',onDocumentKeyDownOnMessageError);
  document.removeEventListener('click',onDocumentClickOnMessageError);
  document.addEventListener('keydown',onDocumentFormKeyDown);
}

function onDocumentKeyDownOnMessageError (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const sectionMessageError = document.body.querySelector('#section-message-error');
    restoringState(sectionMessageError);
  }
}

function onDocumentClickOnMessageError (evt) {

  const sectionMessageError = document.body.querySelector('#section-message-error');
  const innerBlock = sectionMessageError.querySelector('.error__inner');

  if (evt.target.id !== innerBlock.id) {
    restoringState(sectionMessageError);
  }
}

function openMessageAboutErrorUpload () {

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

}

export {openMessageAboutErrorUpload};
