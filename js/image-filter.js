import {renderingPictureUsers} from './render-picture.js';
import {getPublicationsEnrollment} from './data.js';
import {getRandomInteger,debounce} from './utils.js';

const imageFilter = document.querySelector('.img-filters');
const imageFilterForm = imageFilter.querySelector('form');
const imageFilterRadioButtons = imageFilter.querySelectorAll('.img-filters__button');

const RERENDER_DELAY = 500;

const RadioButtonIdMap = {
  DEFAULT : 'filter-default',
  RANDOM  : 'filter-random',
  DISCUSSED : 'filter-discussed'
};

let pictureList;
const COUNT_RANDOM_PICTURE = 10;

const getPictureList = (miniatures) => {
  pictureList = getPublicationsEnrollment(miniatures);
};

const getRandomPicturesFromList = (list) => {
  const idSet = new Set();
  const idList = list.map((item) => item.id);

  while (idSet.size < COUNT_RANDOM_PICTURE) {
    const length = idList.length - 1;
    const index = getRandomInteger(0,length);
    idSet.add(index);
  }
  const resultArray = [];
  for (const id of idSet) {
    resultArray.push(list[id]);
  }
  return resultArray;
};

const getPicturesListByRating = (list) => list.slice().sort((a,b) => {
  if (a.likes > b.likes) {
    return -1;
  }
  if (a.likes < b.likes) {
    return 1;
  }
  return 0;
});

const radioButtonDefault = imageFilter.querySelector(`#${RadioButtonIdMap.DEFAULT}`);
const radioButtonRandom = imageFilter.querySelector(`#${RadioButtonIdMap.RANDOM}`);
const radioButtonDiscussed = imageFilter.querySelector(`#${RadioButtonIdMap.DISCUSSED}`);

const radioButtonsRemoveClass = () => imageFilterRadioButtons.forEach((radioButton) => radioButton.classList.remove('img-filters__button--active'));

const removeTagWithClass = (removeClass) => {
  const tags = document.querySelectorAll(removeClass);
  tags.forEach((tag) => tag.parentNode.removeChild(tag));
};

const debounceDefaultList = debounce(() => {
  renderingPictureUsers(pictureList);
},RERENDER_DELAY,);

const debounceRandomList = debounce(() => {
  renderingPictureUsers(getRandomPicturesFromList(pictureList));
},RERENDER_DELAY,);

const debounceRatingList = debounce(() => {
  renderingPictureUsers(getPicturesListByRating(pictureList));
},RERENDER_DELAY,);


const onClickImageFilterForm = (evt) => {
  radioButtonsRemoveClass();
  removeTagWithClass('.picture');
  switch (evt.target.id) {
    case RadioButtonIdMap.DEFAULT : {
      radioButtonDefault.classList.add('img-filters__button--active');
      debounceDefaultList();
    }
      break;
    case RadioButtonIdMap.RANDOM : {
      radioButtonRandom.classList.add('img-filters__button--active');
      debounceRandomList();
    }
      break;
    case RadioButtonIdMap.DISCUSSED : {
      radioButtonDiscussed.classList.add('img-filters__button--active');
      debounceRatingList();
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
