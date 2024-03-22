import {isEscapeKey} from './utils.js';
import {onClickButtonForCloseFormUploadPhoto} from './forms-upload.js';

const messageSuccessUploadTemplate = document.querySelector('#success').content;

const onClickButtonForCloseMessageSuccessUpload = (evt) => {
  const currentElement = evt.target;
  const parentElement = currentElement.parentElement;
  const grandParentElement = parentElement.parentElement;
  restoreStateAfterSuccessUpload (grandParentElement);
};

const onDocumentKeyDownOnMessageSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const sectionMessageSuccess = document.body.querySelector('#section-message-success');
    restoreStateAfterSuccessUpload (sectionMessageSuccess);
  }
};

const onDocumentClickOnMessageSuccess = (evt) => {
  const sectionMessageSuccess = document.body.querySelector('#section-message-success');
  const innerBlock = sectionMessageSuccess.querySelector('.success__inner');
  if (evt.target.id !== innerBlock.id && evt.target.nodeName !== 'H2') {
    restoreStateAfterSuccessUpload (sectionMessageSuccess);
  }
};

// Функциональное объявление, для поднятия.
function restoreStateAfterSuccessUpload (element) {
  element.remove();
  document.removeEventListener('keydown',onDocumentKeyDownOnMessageSuccess);
  document.removeEventListener('click',onDocumentClickOnMessageSuccess);
}

const openMessageAboutSuccessUpload = () => {
  const messageSuccess = messageSuccessUploadTemplate.cloneNode(true);
  const containerMessageSuccess = messageSuccess.querySelector('section');
  const buttonSuccess = messageSuccess.querySelector('.success__button');
  const innerBlockMessageSuccess = containerMessageSuccess.querySelector('.success__inner');
  containerMessageSuccess.id = 'section-message-success';
  innerBlockMessageSuccess.id = 'inner-block-message-success';

  buttonSuccess.addEventListener('click', onClickButtonForCloseMessageSuccessUpload);
  document.addEventListener('keydown',onDocumentKeyDownOnMessageSuccess);
  document.addEventListener('click',onDocumentClickOnMessageSuccess);

  onClickButtonForCloseFormUploadPhoto();
  document.body.append(messageSuccess);
};

export {openMessageAboutSuccessUpload};
