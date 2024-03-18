const EffectToIdMap = {
  NONE : 'effect-none',
  CHROME: 'effect-chrome',
  SEPIA: 'effect-sepia',
  MARVIN: 'effect-marvin',
  PHOBOS: 'effect-phobos',
  HEAT: 'effect-heat'
};

const InputIdToEffectMap = {
  [EffectToIdMap.NONE] : 'none',
  [EffectToIdMap.CHROME] : 'chrome',
  [EffectToIdMap.SEPIA] : 'sepia',
  [EffectToIdMap.MARVIN] : 'marvin',
  [EffectToIdMap.PHOBOS] : 'phobos',
  [EffectToIdMap.HEAT] : 'heat'
};

const InputIdToClassMap = {
  [EffectToIdMap.NONE] : `effects__preview--${InputIdToEffectMap[EffectToIdMap.NONE]}`,
  [EffectToIdMap.CHROME] : `effects__preview--${InputIdToEffectMap[EffectToIdMap.CHROME]}`,
  [EffectToIdMap.SEPIA] : `effects__preview--${InputIdToEffectMap[EffectToIdMap.SEPIA]}`,
  [EffectToIdMap.MARVIN] : `effects__preview--${InputIdToEffectMap[EffectToIdMap.MARVIN]}`,
  [EffectToIdMap.PHOBOS] : `effects__preview--${InputIdToEffectMap[EffectToIdMap.PHOBOS]}`,
  [EffectToIdMap.HEAT] : `effects__preview--${InputIdToEffectMap[EffectToIdMap.HEAT]}`
};

const inputScaleControlValue = document.querySelector('.scale__control--value');
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

const getFilterStyle = (filter, value) => {
  if (filter.length !== 0) {
    const nameFilter = filter.slice(0,filter.indexOf('('));
    if (nameFilter === 'blur') {
      return `${nameFilter}(${value}px)`;
    } else if ((nameFilter === 'invert')) {
      return `${nameFilter}(${value}%)`;
    } else {
      return `${nameFilter}(${value})`;
    }
  }
};

const updateEffectOnImage = () => {
  const imagePreviewComputedStyle = getComputedStyle(imagePreview);
  const newFilter = getFilterStyle(imagePreviewComputedStyle.filter,sliderValue.value);
  imagePreview.style.filter = newFilter;
};

sliderElement.noUiSlider.on('update', () => {
  sliderValue.value = sliderElement.noUiSlider.get();
  updateEffectOnImage();
});

const onClickListEffects = (evt) => {
  imagePreview.className = '';
  imagePreview.style.removeProperty('filter');
  imagePreview.classList.add(InputIdToClassMap[evt.target.id]);
  fieldSetForUiSlider.classList.remove('hidden');

  switch (evt.target.id) {
    case EffectToIdMap.NONE : {
      imagePreview.className = '';
      // CSS-стили filter удаляются.;  слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
      fieldSetForUiSlider.classList.add('hidden');
    }
      break;
    case EffectToIdMap.CHROME : {
      // filter: grayscale(0..1) с шагом 0.1;
      sliderElement.noUiSlider.updateOptions({
        range : {
          min : 0,
          max : 1,
        },
        step : 0.1,
      });
      sliderElement.noUiSlider.set(1);
    }
      break;
    case EffectToIdMap.SEPIA : {
      // filter: sepia(0..1) с шагом 0.1;
      sliderElement.noUiSlider.updateOptions({
        range : {
          min : 0,
          max : 1,
        },
        step : 0.1,
      });
      sliderElement.noUiSlider.set(1);
    }
      break;
    case EffectToIdMap.MARVIN : {
      // filter: invert(0..100%) с шагом 1%;
      sliderElement.noUiSlider.updateOptions({
        range : {
          min : 0,
          max : 100,
        },
        step : 1,
      });
      sliderElement.noUiSlider.set(100);
    }
      break;
    case EffectToIdMap.PHOBOS : {
      // filter: blur(0..3px) с шагом 0.1px;
      sliderElement.noUiSlider.updateOptions({
        range : {
          min : 0,
          max : 3,
        },
        step : 0.1,
      });
      sliderElement.noUiSlider.set(3);
    }
      break;
    case EffectToIdMap.HEAT : {
      // filter: brightness(1..3) с шагом 0.1;
      sliderElement.noUiSlider.updateOptions({
        range : {
          min : 1,
          max : 3,
        },
        step : 0.1,
      });
      sliderElement.noUiSlider.set(3);
    }
      break;
  }
};

const onChangeScaleControlValue = () => {
  const scale = parseInt(inputScaleControlValue.value, 10) / 100;
  imagePreview.style.transform = `scale(${scale})`;
};

const onClickButtonScaleControlSmaller = () => {
  if (inputScaleControlValue.value > 25 && inputScaleControlValue.value <= 100) {
    const rangeValue = parseInt(inputScaleControlValue.value, 10);
    inputScaleControlValue.value = rangeValue - 25;
    onChangeScaleControlValue();
  }
};

const onClickButtonScaleControlBigger = () => {
  if (inputScaleControlValue.value < 100 && inputScaleControlValue.value >= 25) {
    const rangeValue = parseInt(inputScaleControlValue.value, 10);
    inputScaleControlValue.value = rangeValue + 25;
    onChangeScaleControlValue();
  }
};

const addEventOnElementsWrapper = () => {
  buttonScaleControlSmaller.addEventListener('click',onClickButtonScaleControlSmaller);
  buttonScaleControlBigger.addEventListener('click',onClickButtonScaleControlBigger);
  inputScaleControlValue.addEventListener('change',onChangeScaleControlValue);
  listEffects.addEventListener('click', onClickListEffects);
  fieldSetForUiSlider.classList.add('hidden');
};

const removeEventOnElementsWrapper = () => {
  buttonScaleControlSmaller.removeEventListener('click',onClickButtonScaleControlSmaller);
  buttonScaleControlBigger.removeEventListener('click',onClickButtonScaleControlBigger);
  inputScaleControlValue.removeEventListener('change',onChangeScaleControlValue);
  listEffects.removeEventListener('click', onClickListEffects);
  imagePreview.style.removeProperty('filter');
  imagePreview.style.removeProperty('transform');
  imagePreview.className = '';
};

export {addEventOnElementsWrapper, removeEventOnElementsWrapper};
