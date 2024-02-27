const buttonScaleControlValue = document.querySelector('.scale__control--value');
const buttonScaleControlSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = document.querySelector('.scale__control--bigger');

const imageUploadPreview = document.querySelector('.img-upload__preview');

const listEffects = document.querySelector('.effects__list');



function onClickListEffects (evt) {
  const liElements = listEffects.children;
  console.log('liElements = ' + liElements);
  for (let liItem of liElements) {
    console.log('liItem = ' + liItem);
    const radioButton = liItem.querySelector('input[type="radio"]');
    console.log('radioButton = ' + radioButton);
    console.log('radioButton.id = ' + radioButton.id);
    if (evt.target.id === radioButton.id) {
      console.log('Урррра мы наши элемент - это ' + radioButton.id);
    }
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
