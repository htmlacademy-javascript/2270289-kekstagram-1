const buttonScaleControlValue = document.querySelector('.scale__control--value');
const buttonScaleControlSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = document.querySelector('.scale__control--bigger');

const imageUploadPreview = document.querySelector('.img-upload__preview');

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
}

function removeEventOnElementsWrapper () {
  buttonScaleControlSmaller.removeEventListener('click',onClickButtonScaleControlSmaller);
  buttonScaleControlBigger.removeEventListener('click',onClickButtonScaleControlBigger);
  buttonScaleControlValue.removeEventListener('change',onChangeScaleControlValue);
}

export {addEventOnElementsWrapper, removeEventOnElementsWrapper};
