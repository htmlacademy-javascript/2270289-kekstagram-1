const MIN_VALUE_SCALE = 25;
const MAX_VALUE_SCALE = 100;
const STEP_VALUE_SCALE = 25;

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
const slider = fieldSetForUiSlider.querySelector('.effect-level__slider');

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
      slider.noUiSlider.updateOptions({
        range : {
          min : 0,
          max : 1,
        },
        step : 0.1,
      });
      slider.noUiSlider.set(1);
    }
      break;
    case EffectToIdMap.SEPIA : {
      // filter: sepia(0..1) с шагом 0.1;
      slider.noUiSlider.updateOptions({
        range : {
          min : 0,
          max : 1,
        },
        step : 0.1,
      });
      slider.noUiSlider.set(1);
    }
      break;
    case EffectToIdMap.MARVIN : {
      // filter: invert(0..100%) с шагом 1%;
      slider.noUiSlider.updateOptions({
        range : {
          min : 0,
          max : 100,
        },
        step : 1,
      });
      slider.noUiSlider.set(100);
    }
      break;
    case EffectToIdMap.PHOBOS : {
      // filter: blur(0..3px) с шагом 0.1px;
      slider.noUiSlider.updateOptions({
        range : {
          min : 0,
          max : 3,
        },
        step : 0.1,
      });
      slider.noUiSlider.set(3);
    }
      break;
    case EffectToIdMap.HEAT : {
      // filter: brightness(1..3) с шагом 0.1;
      slider.noUiSlider.updateOptions({
        range : {
          min : 1,
          max : 3,
        },
        step : 0.1,
      });
      slider.noUiSlider.set(3);
    }
      break;
  }
};

const onChangeScaleControlValue = () => {
  const scale = parseInt(inputScaleControlValue.value, 10) / 100;
  imagePreview.style.transform = `scale(${scale})`;
};

const onClickButtonScaleControlSmaller = () => {
  if (inputScaleControlValue.value > MIN_VALUE_SCALE && inputScaleControlValue.value <= MAX_VALUE_SCALE) {
    const rangeValue = parseInt(inputScaleControlValue.value, 10);
    inputScaleControlValue.value = rangeValue - STEP_VALUE_SCALE;
    onChangeScaleControlValue();
  }
};

const onClickButtonScaleControlBigger = () => {
  if (inputScaleControlValue.value < MAX_VALUE_SCALE && inputScaleControlValue.value >= MIN_VALUE_SCALE) {
    const rangeValue = parseInt(inputScaleControlValue.value, 10);
    inputScaleControlValue.value = rangeValue + STEP_VALUE_SCALE;
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

noUiSlider.create(slider,{
  range : {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

slider.noUiSlider.on('update', () => {
  sliderValue.value = slider.noUiSlider.get();
  updateEffectOnImage();
});

export {addEventOnElementsWrapper, removeEventOnElementsWrapper};
