const buttonScaleControlValue = document.querySelector('.scale__control--value');
const buttonScaleControlSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = document.querySelector('.scale__control--bigger');

const divImgUploadPreview = document.querySelector('.img-upload__preview');
const imagePreview = divImgUploadPreview.querySelector('img');

const listEffects = document.querySelector('.effects__list');

const fieldSetForUiSlider = document.querySelector('.img-upload__effect-level');
const sliderValue = fieldSetForUiSlider.querySelector('.effect-level__value');
const sliderElement = fieldSetForUiSlider.querySelector('.effect-level__slider');


noUiSlider.create(sliderElement,{
  range : {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (...rest) => {
  sliderValue.value = sliderElement.noUiSlider.get();
  console.log(sliderValue.value);
  console.log(rest);
});

//const listIdRadioButtons = ['effect-none','effect-chrome','effect-sepia','effect-marvin','effect-phobos','effect-heat'];

const effectToIdMap = {
  none : 'effect-none',
  chrome: 'effect-chrome',
  sepia: 'effect-sepia',
  marvin: 'effect-marvin',
  phobos: 'effect-phobos',
  heat: 'effect-heat'
};

const inputIdToEffectMap = {
  [effectToIdMap.none] : 'none',
  [effectToIdMap.chrome] : 'chrome',
  [effectToIdMap.sepia] : 'sepia',
  [effectToIdMap.marvin] : 'marvin',
  [effectToIdMap.phobos] : 'phobos',
  [effectToIdMap.heat] : 'heat'
};

const inputIdToClassMap = {
  [effectToIdMap.none] : `effects__preview--${inputIdToEffectMap[effectToIdMap.none]}`,
  [effectToIdMap.chrome] : `effects__preview--${inputIdToEffectMap[effectToIdMap.chrome]}`,
  [effectToIdMap.sepia] : `effects__preview--${inputIdToEffectMap[effectToIdMap.sepia]}`,
  [effectToIdMap.marvin] : `effects__preview--${inputIdToEffectMap[effectToIdMap.marvin]}`,
  [effectToIdMap.phobos] : `effects__preview--${inputIdToEffectMap[effectToIdMap.phobos]}`,
  [effectToIdMap.heat] : `effects__preview--${inputIdToEffectMap[effectToIdMap.heat]}`
};

function onClickListEffects (evt) {
  // При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%)
  // : слайдер, CSS-стиль изображения и значение поля должны обновляться.
  console.log(effectToIdMap);
  console.log(inputIdToEffectMap);
  console.log(inputIdToClassMap);
  console.log(inputIdToClassMap[evt.target.id]);
  imagePreview.classList.add(inputIdToClassMap[evt.target.id]);

  switch (evt.target.id) {
    case effectToIdMap.none : {
      // CSS-стили filter удаляются.;  слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.

    }
      break;
    case effectToIdMap.chrome : {
      // filter: grayscale(0..1) с шагом 0.1;
      sliderElement.noUiSlider.updateOptions({
        range : {
          min : 0,
          max : 1,
        },
        start : 1,
        step : 0.1,
      });
    }
      break;
    case effectToIdMap.sepia : {
      // filter: sepia(0..1) с шагом 0.1;
      sliderElement.noUiSlider.updateOptions({
        range : {
          min : 0,
          max : 1,
        },
        start : 1,
        step : 0.1,
      });
    }
      break;
    case effectToIdMap.marvin : {
      // filter: invert(0..100%) с шагом 1%;
      sliderElement.noUiSlider.updateOptions({
        range : {
          min : 0,
          max : 100,
        },
        start : 100,
        step : 1,
      });
    }
      break;
    case effectToIdMap.phobos : {
      // filter: blur(0..3px) с шагом 0.1px;
      sliderElement.noUiSlider.updateOptions({
        range : {
          min : 0,
          max : 3,
        },
        start : 3,
        step : 0.1,
      });
    }
      break;
    case effectToIdMap.heat : {
      // filter: brightness(1..3) с шагом 0.1;
      sliderElement.noUiSlider.updateOptions({
        range : {
          min : 1,
          max : 3,
        },
        start : 3,
        step : 0.1,
      });
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
  imagePreview.attributeStyleMap.set('transform', `scale(${scale})`);
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
