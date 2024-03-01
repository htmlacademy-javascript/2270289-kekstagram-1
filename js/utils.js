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

/**
 * Plural forms for russian words
 * @param  {Integer} count quantity for word
 * @param  {Array} words Array of words. Example: ['депутат', 'депутата', 'депутатов'], ['комментарий', 'комментария', 'комментариев']
 * @return {String}        Count + plural form for word
 */
function pluralize(count, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  return `${words[ (count % 100 > 4 && count % 100 < 20) ? 2 : cases[ Math.min(count % 10, 5)] ]}`;
}

export {getRandomInteger, getRandomArrayElement, getRandomID, isEscapeKey, isEnterKey, pluralize};
