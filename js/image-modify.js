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

function getFilterStyle (filter, value) {
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
}

sliderElement.noUiSlider.on('update', () => {
  sliderValue.value = sliderElement.noUiSlider.get();
  updateEffectOnImage();
});

function updateEffectOnImage() {
  const imagePreviewComputedStyle = getComputedStyle(imagePreview);
  const newFilter = getFilterStyle(imagePreviewComputedStyle.filter,sliderValue.value);
  imagePreview.style.filter = newFilter;
}

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
  imagePreview.className = '';
  imagePreview.style.removeProperty('filter');
  imagePreview.classList.add(inputIdToClassMap[evt.target.id]);
  fieldSetForUiSlider.classList.remove('hidden');

  switch (evt.target.id) {
    case effectToIdMap.none : {
      imagePreview.className = '';
      // CSS-стили filter удаляются.;  слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
      fieldSetForUiSlider.classList.add('hidden');
    }
      break;
    case effectToIdMap.chrome : {
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
    case effectToIdMap.sepia : {
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
    case effectToIdMap.marvin : {
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
    case effectToIdMap.phobos : {
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
    case effectToIdMap.heat : {
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
}

function onClickButtonScaleControlSmaller () {
  if (inputScaleControlValue.value > 25 && inputScaleControlValue.value <= 100) {
    const rangeValue = parseInt(inputScaleControlValue.value, 10);
    inputScaleControlValue.value = rangeValue - 25;
    onChangeScaleControlValue();
  }
}

function onClickButtonScaleControlBigger () {
  if (inputScaleControlValue.value < 100 && inputScaleControlValue.value >= 25) {
    const rangeValue = parseInt(inputScaleControlValue.value, 10);
    inputScaleControlValue.value = rangeValue + 25;
    onChangeScaleControlValue();
  }
}

function onChangeScaleControlValue () {
  const scale = parseInt(inputScaleControlValue.value, 10) / 100;
  imagePreview.style.transform = `scale(${scale})`;
}

function addEventOnElementsWrapper () {
  buttonScaleControlSmaller.addEventListener('click',onClickButtonScaleControlSmaller);
  buttonScaleControlBigger.addEventListener('click',onClickButtonScaleControlBigger);
  inputScaleControlValue.addEventListener('change',onChangeScaleControlValue);
  listEffects.addEventListener('click', onClickListEffects);
  fieldSetForUiSlider.classList.add('hidden');
}

function removeEventOnElementsWrapper () {
  buttonScaleControlSmaller.removeEventListener('click',onClickButtonScaleControlSmaller);
  buttonScaleControlBigger.removeEventListener('click',onClickButtonScaleControlBigger);
  inputScaleControlValue.removeEventListener('change',onChangeScaleControlValue);
  listEffects.removeEventListener('click', onClickListEffects);
  imagePreview.style.removeProperty('filter');
  imagePreview.style.removeProperty('transform');
  imagePreview.className = '';
}

export {addEventOnElementsWrapper, removeEventOnElementsWrapper};
