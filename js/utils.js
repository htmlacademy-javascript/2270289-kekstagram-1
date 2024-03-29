const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === 'Escape'; // вернет true если в объекте события evt, свойство key равно Escape (Нажата ESC)

/**
 * Plural forms for russian words
 * @param  {Integer} count quantity for word
 * @param  {Array} words Array of words. Example: ['депутат', 'депутата', 'депутатов'], ['комментарий', 'комментария', 'комментариев']
 * @return {String}        Count + plural form for word
 */
const pluralize = (count, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return `${words[ (count % 100 > 4 && count % 100 < 20) ? 2 : cases[ Math.min(count % 10, 5)] ]}`;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay,);
  };
};

export {getRandomInteger, isEscapeKey, pluralize, debounce};
