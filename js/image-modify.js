const buttonScaleControlValue = document.querySelector('.scale__control--value');
const buttonScaleControlSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = document.querySelector('.scale__control--bigger');

const imageUploadPreview = document.querySelector('.img-upload__preview');

const listEffects = document.querySelector('.effects__list');

//const listIdRadioButtons = ['effect-none','effect-chrome','effect-sepia','effect-marvin','effect-phobos','effect-heat'];
const effectsMap = {
  none : 'effect-none',
  chrome: 'effect-chrome',
  sepia: 'effect-sepia',
  marvin: 'effect-marvin',
  phobos: 'effect-phobos',
  heat: 'effect-heat'
};

function onClickListEffects (evt) {
  // При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%)
  // : слайдер, CSS-стиль изображения и значение поля должны обновляться.
  switch (evt.target.id) {
    case effectsMap.none : {
      // CSS-стили filter удаляются.;  слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
    }
      break;
    case effectsMap.chrome : {
      // filter: grayscale(0..1) с шагом 0.1;
    }
      break;
    case effectsMap.sepia : {
      // filter: sepia(0..1) с шагом 0.1;
    }
      break;
    case effectsMap.marvin : {
      // filter: invert(0..100%) с шагом 1%;
    }
      break;
    case effectsMap.phobos : {
      // filter: blur(0..3px) с шагом 0.1px;
    }
      break;
    case effectsMap.heat : {
      // filter: brightness(1..3) с шагом 0.1;
    }
      break;
  }
}

function onClickButtonScaleControlSmaller () {
  if (buttonScaleControlValue.value > 25 && buttonScaleControlValue.value <= 100) {
    const rangeValue = parseInt(buttonScaleControlValue.value, 10);
    buttonScaleControlValue.value = rangeValue - 25;
    onChangeScaleControlValue();
  }
}

function onClickButtonScaleControlBigger () {
  if (buttonScaleControlValue.value < 100 && buttonScaleControlValue.value >= 25) {
    const rangeValue = parseInt(buttonScaleControlValue.value, 10);
    buttonScaleControlValue.value = rangeValue + 25;
    onChangeScaleControlValue();
  }
}

function onChangeScaleControlValue () {
  const scale = parseInt(buttonScaleControlValue.value, 10) / 100;
  imageUploadPreview.attributeStyleMap.set('transform', `scale(${scale})`);
}

function addEventOnElementsWrapper () {
  buttonScaleControlSmaller.addEventListener('click',onClickButtonScaleControlSmaller);
  buttonScaleControlBigger.addEventListener('click',onClickButtonScaleControlBigger);
  buttonScaleControlValue.addEventListener('change',onChangeScaleControlValue);
  listEffects.addEventListener('click', onClickListEffects);
}

function removeEventOnElementsWrapper () {
  buttonScaleControlSmaller.removeEventListener('click',onClickButtonScaleControlSmaller);
  buttonScaleControlBigger.removeEventListener('click',onClickButtonScaleControlBigger);
  buttonScaleControlValue.removeEventListener('change',onChangeScaleControlValue);
  listEffects.removeEventListener('click', onClickListEffects);
}

export {addEventOnElementsWrapper, removeEventOnElementsWrapper};
