import {isEscapeKey} from './utils.js';
const messageErrorUploadTemplate = document.querySelector('#error').content;

function closeMessageErrorUpload (evt) {
  const currentElement = evt.target;
  const parentElement = currentElement.parentElement;
  const grandParentElement = parentElement.parentElement;
  grandParentElement.remove();
  document.removeEventListener('keydown',onDocumentKeyDownOnMessageError);
  document.removeEventListener('click',onDocumentClickOnMessageError);
}

function onDocumentKeyDownOnMessageError (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const sectionMessageError = document.body.querySelector('#section-message-error');
    sectionMessageError.remove();
    document.removeEventListener('keydown',onDocumentKeyDownOnMessageError);
    document.removeEventListener('click',onDocumentClickOnMessageError);
  }
}

function onDocumentClickOnMessageError (evt) {

  const sectionMessageError = document.body.querySelector('#section-message-error');
  const innerBlock = sectionMessageError.querySelector('.error__inner');

  if (evt.target.id !== innerBlock.id) {
    sectionMessageError.remove();
    document.removeEventListener('keydown',onDocumentKeyDownOnMessageError);
    document.removeEventListener('click',onDocumentClickOnMessageError);
  }
}

function openMessageAboutErrorUpload () {
  console.log('оБшибка загрузки....');
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
