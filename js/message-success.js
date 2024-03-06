import {isEscapeKey} from './utils.js';
const messageSuccessUploadTemplate = document.querySelector('#success').content;

function closeMessageSuccessUpload (evt) {
  const currentElement = evt.target;
  const parentElement = currentElement.parentElement;
  const grandParentElement = parentElement.parentElement;
  grandParentElement.remove();
  document.removeEventListener('keydown',onDocumentKeyDownOnMessageSuccess);
  document.removeEventListener('click',onDocumentClickOnMessageSuccess);
}

function onDocumentKeyDownOnMessageSuccess (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const sectionMessageSuccess = document.body.querySelector('#section-message-success');
    sectionMessageSuccess.remove();
    document.removeEventListener('keydown',onDocumentKeyDownOnMessageSuccess);
    document.removeEventListener('click',onDocumentClickOnMessageSuccess);
  }
}

function onDocumentClickOnMessageSuccess (evt) {

  const sectionMessageSuccess = document.body.querySelector('#section-message-success');
  const innerBlock = sectionMessageSuccess.querySelector('.success__inner');

  if (evt.target.id !== innerBlock.id) {
    sectionMessageSuccess.remove();
    document.removeEventListener('keydown',onDocumentKeyDownOnMessageSuccess);
    document.removeEventListener('click',onDocumentClickOnMessageSuccess);
  }
}

function openMessageAboutSuccessUpload () {

  const messageSuccess = messageSuccessUploadTemplate.cloneNode(true);
  const containerMessageSuccess = messageSuccess.querySelector('section');
  const buttonSuccess = messageSuccess.querySelector('.success__button');
  const innerBlockMessageSuccess = containerMessageSuccess.querySelector('.success__inner');
  buttonSuccess.addEventListener('click', closeMessageSuccessUpload);
  containerMessageSuccess.id = 'section-message-success';
  innerBlockMessageSuccess.id = 'inner-block-message-success';

  document.addEventListener('keydown',onDocumentKeyDownOnMessageSuccess);
  document.addEventListener('click',onDocumentClickOnMessageSuccess);

  document.body.append(messageSuccess);

}

export {openMessageAboutSuccessUpload};
