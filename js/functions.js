
const checkPalindrome = (palindrome) => {
  let stringContrary = '';
  const palindromeLow = palindrome.toLowerCase();

  palindrome = (palindromeLow.indexOf(' ') !== -1) ? palindromeLow.replaceAll(' ','') : palindromeLow;

  for (let i = palindrome.length - 1; i >= 0; i--) {
    stringContrary += palindrome[i];
  }
  return (stringContrary === palindrome);
};

const extractNumberFromString = (stringWithNumber) => {
  let numberFromString = '';
  for (let i = 0; i < stringWithNumber.length; i++){
    if (parseInt(stringWithNumber[i],10) >= 0) {
      numberFromString += stringWithNumber[i];
    }
  }
  return numberFromString;
};

const addStringToAdressFile = (beginString, minLength, addString) => {
  let calcString = '';
  let resultString = '';
  const numberAdditional = Math.trunc((minLength - beginString.length) / addString.length);
  const residueSymbols = (minLength - beginString.length) % addString.length;

  if (beginString.length <= minLength) {
    if (beginString.length + addString.length > minLength) {
      resultString = addString.slice(0,minLength - beginString.length) + beginString;
    } else {
      if (numberAdditional > 0) {
        calcString = beginString;
        for (let i = 0; i < numberAdditional; i++){
          calcString = addString + calcString;
        }
      }
      if (residueSymbols > 0) {
        calcString = addString.slice(0,residueSymbols) + calcString;
      }
      resultString = calcString;
    }
  } else {
    resultString = beginString;
  }
  return resultString;
};

const validateForLowEqualLength = (stringCheck,lengthString) => stringCheck.length <= lengthString;

export {checkPalindrome,extractNumberFromString,addStringToAdressFile,validateForLowEqualLength};
