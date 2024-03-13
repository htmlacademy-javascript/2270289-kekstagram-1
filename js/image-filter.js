import {renderingPictureUsers} from './render-picture.js';
import {getPublicationsEnrollment} from './data.js';
import {getRandomInteger} from './utils.js';

const imageFilter = document.querySelector('.img-filters');
const imageFilterForm = imageFilter.querySelector('form');
const imageFilterRadioButtons = imageFilter.querySelectorAll('.img-filters__button');

const RadioButtonsIdMap = {
  DEFAULT : 'filter-default',
  RANDOM  : 'filter-random',
  DISCUSSED : 'filter-discussed'
};

let pictureList;
const COUNT_RANDOM_PICTURE = 10;

const getPictureList = (miniatures) => {
  pictureList = getPublicationsEnrollment(miniatures);
};

const getRandomPictureFromList = (list) => {
  const idList = [];
  const idSet = new Set();
  list.forEach((picture) => idList.push(picture.id));

  while (idSet.size < COUNT_RANDOM_PICTURE) {
    const length = idList.length - 1;
    const index = getRandomInteger(0,length);
    idSet.add(index);
  }
  const idArray = [...idSet];
  const resultArray = [];
  idArray.forEach((ident) => {
    resultArray.push(list[ident]);
  });
  return resultArray;
};

const radioButtonDefault = imageFilter.querySelector(`#${RadioButtonsIdMap.DEFAULT}`);
const radioButtonRandom = imageFilter.querySelector(`#${RadioButtonsIdMap.RANDOM}`);
const radioButtonDiscussed = imageFilter.querySelector(`#${RadioButtonsIdMap.DISCUSSED}`);

const radioButtonsRemoveClass = () => imageFilterRadioButtons.forEach((radioButton) => radioButton.classList.remove('img-filters__button--active'));

const removeTagWithClass = (removeClass,classContainer) => {
  const tagsParent = document.querySelector(classContainer);
  const tags = document.querySelectorAll(removeClass);
  tags.forEach((tag) => tagsParent.removeChild(tag));
  //el.parentNode.removeChild(el);
};

const onClickImageFilterForm = (evt) => {
  radioButtonsRemoveClass();
  removeTagWithClass('.picture','.pictures');
  switch (evt.target.id) {
    case RadioButtonsIdMap.DEFAULT : {
      radioButtonDefault.classList.add('img-filters__button--active');
      renderingPictureUsers(pictureList);
    }
      break;
    case RadioButtonsIdMap.RANDOM : {
      radioButtonRandom.classList.add('img-filters__button--active');
      renderingPictureUsers(getRandomPictureFromList(pictureList));
    }
      break;
    case RadioButtonsIdMap.DISCUSSED : {
      radioButtonDiscussed.classList.add('img-filters__button--active');
    }
      break;
  }
};

const showImageFilter = () => {
  renderingPictureUsers(pictureList);
  imageFilter.classList.remove('img-filters--inactive');
  imageFilterForm.addEventListener('click',onClickImageFilterForm);
};

export {showImageFilter,getPictureList};
