const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function getRandomID(min,max) {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape'; // вернет true если в объекте события evt, свойство key равно Escape (Нажата ESC)
const isEnterKey = (evt) => evt.key === 'Enter'; // (Нажата Enter)

export {getRandomInteger, getRandomArrayElement, getRandomID, isEscapeKey, isEnterKey};
