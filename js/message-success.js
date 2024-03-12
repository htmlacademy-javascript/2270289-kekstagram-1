import {isEscapeKey} from './utils.js';
import {closeFormUploadPhoto} from './forms-upload.js';

const messageSuccessUploadTemplate = document.querySelector('#success').content;

function restoringStateAfterSuccessUpload (element) {
  element.remove();
  document.removeEventListener('keydown',onDocumentKeyDownOnMessageSuccess);
  document.removeEventListener('click',onDocumentClickOnMessageSuccess);
}

function closeMessageSuccessUpload (evt) {
  const currentElement = evt.target;
  const parentElement = currentElement.parentElement;
  const grandParentElement = parentElement.parentElement;

  restoringStateAfterSuccessUpload (grandParentElement);
}

function onDocumentKeyDownOnMessageSuccess (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const sectionMessageSuccess = document.body.querySelector('#section-message-success');

    restoringStateAfterSuccessUpload (sectionMessageSuccess);
  }
}

function onDocumentClickOnMessageSuccess (evt) {

  const sectionMessageSuccess = document.body.querySelector('#section-message-success');
  const innerBlock = sectionMessageSuccess.querySelector('.success__inner');

  if (evt.target.id !== innerBlock.id) {
    restoringStateAfterSuccessUpload (sectionMessageSuccess);
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

  closeFormUploadPhoto();

  document.body.append(messageSuccess);

}

export {openMessageAboutSuccessUpload};
