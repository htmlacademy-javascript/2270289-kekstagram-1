const buttonScaleControlValue = document.querySelector('.scale__control--value');
const buttonScaleControlSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = document.querySelector('.scale__control--bigger');

const imageUploadPreview = document.querySelector('.img-upload__preview');

const imgUploadPreviewContainer = document.querySelector('.img-upload__preview-container');

function onClickImgUploadPreviewContainer (evt) {
  /*
  console.log('Клик на контейнере');
  const rangeValue = buttonScaleControlValue.value;
  console.log('rangeValue = ' + rangeValue);
  if (evt.target.id === 'button-smaller-image') {
    //
    //buttonScaleControlValue.value = rangeValue > 25 && rangeValue <= 100 ? rangeValue - 25 : rangeValue;
    if (buttonScaleControlValue.value > 25 && buttonScaleControlValue.value <= 100) {
      buttonScaleControlValue.value -= 25;
      console.log('buttonScaleControlValue.value (СТАЛО) = ' + buttonScaleControlValue.value);
    }
    onChangeScaleControlValue();
    console.log('buttonScaleControlValue.value = ' + buttonScaleControlValue.value);
    return;
  }
  if (evt.target.id === 'button-bigger-image') {
    //
    //buttonScaleControlValue.value = rangeValue >= 25 && rangeValue < 100 ? rangeValue + 25 : rangeValue;
    if (buttonScaleControlValue.value < 100 && buttonScaleControlValue.value >= 25) {
      buttonScaleControlValue.value += 25;
      console.log('buttonScaleControlValue.value (БЫЛО) = ' + buttonScaleControlValue.value);
    }
    onChangeScaleControlValue();
    console.log('buttonScaleControlValue.value = ' + buttonScaleControlValue.value);
    return;
  }
  */
}

function onClickButtonScaleControlSmaller () {
  //console.log('Клик на кнопкке Меньше внешне');
  //console.log('buttonScaleControlValue.value (БЫЛО) = ' + buttonScaleControlValue.value);
  if (buttonScaleControlValue.value > 25 && buttonScaleControlValue.value <= 100) {
    const rangeValue = parseInt(buttonScaleControlValue.value, 10);
    buttonScaleControlValue.value = rangeValue - 25;
    //buttonScaleControlValue.value -= 25;
    onChangeScaleControlValue();
    //console.log('buttonScaleControlValue.value (СТАЛО) = ' + buttonScaleControlValue.value);
  }
}

function onClickButtonScaleControlBigger () {
  //console.log('Клик на кнопкке Больше внешне');
  //console.log('buttonScaleControlValue.value (БЫЛО) = ' + buttonScaleControlValue.value);
  if (buttonScaleControlValue.value < 100 && buttonScaleControlValue.value >= 25) {
    const rangeValue = parseInt(buttonScaleControlValue.value, 10);
    buttonScaleControlValue.value = rangeValue + 25;
    onChangeScaleControlValue();
    //console.log('buttonScaleControlValue.value (БЫЛО) = ' + buttonScaleControlValue.value);
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
  imgUploadPreviewContainer.addEventListener('click',onClickImgUploadPreviewContainer);
}

function removeEventOnElementsWrapper () {
  buttonScaleControlSmaller.removeEventListener('click',onClickButtonScaleControlSmaller);
  buttonScaleControlBigger.removeEventListener('click',onClickButtonScaleControlBigger);
  buttonScaleControlValue.removeEventListener('change',onChangeScaleControlValue);
  imgUploadPreviewContainer.removeEventListener('click',onClickImgUploadPreviewContainer);
}

export {addEventOnElementsWrapper, removeEventOnElementsWrapper};
