
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

function returnFilterDependesFromFilter (filter, value) {
  if (filter.length !== 0) {
    //
    const nameFilter = filter.slice(0,filter.indexOf('('));
    const returnFilter = `${nameFilter}(${value})`;
    /*
    if (nameFilter === 'blur') {
      return `${nameFilter}(${value}px)`;
    } else {
      return `${nameFilter}(${value})`;
    }
    */
    return nameFilter === 'blur' ? `${returnFilter}px` : returnFilter ;
  }
}

sliderElement.noUiSlider.on('update', () => {
  sliderValue.value = sliderElement.noUiSlider.get();
});

function onClickSliderElement() {
  const imagePreviewComputedStyle = getComputedStyle(imagePreview);
  const newFilter = returnFilterDependesFromFilter(imagePreviewComputedStyle.filter,sliderValue.value);
  imagePreview.attributeStyleMap.set('filter',newFilter);
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
  // При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%)
  // : слайдер, CSS-стиль изображения и значение поля должны обновляться.
  //imagePreview.style.filter = 'none';
  //console.log(effectToIdMap);
  //console.log(inputIdToEffectMap);
  //console.log(inputIdToClassMap);
  //console.log(inputIdToClassMap[evt.target.id]);
  imagePreview.className = '';
  imagePreview.attributeStyleMap.delete('filter');
  imagePreview.classList.add(inputIdToClassMap[evt.target.id]);

  switch (evt.target.id) {
    case effectToIdMap.none : {
      imagePreview.className = '';
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
  //const imagePreviewComputedStyle = getComputedStyle(imagePreview);
  //const newFilter = returnFilterDependesFromFilter(imagePreviewComputedStyle.filter,sliderValue.value);
  //imagePreview.style.setProperty(newFilter[0],newFilter[1]);
  //imagePreview.style.filter = `${newFilter[0]}(${newFilter[1]})`;
  //imagePreview.style.webkitFilter =

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
  sliderElement.addEventListener('click', onClickSliderElement);
}

function removeEventOnElementsWrapper () {
  buttonScaleControlSmaller.removeEventListener('click',onClickButtonScaleControlSmaller);
  buttonScaleControlBigger.removeEventListener('click',onClickButtonScaleControlBigger);
  buttonScaleControlValue.removeEventListener('change',onChangeScaleControlValue);
  listEffects.removeEventListener('click', onClickListEffects);
  sliderElement.removeEventListener('click', onClickSliderElement);
}

export {addEventOnElementsWrapper, removeEventOnElementsWrapper};
