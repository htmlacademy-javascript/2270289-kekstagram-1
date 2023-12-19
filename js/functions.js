
function checkPalindrome (palindrome) {
  let stringContrary = '';
  let stringWithoutSpace = '';
  const palindromeLow = palindrome.toLowerCase();

  if (palindromeLow.indexOf(' ') === -1) {
    stringContrary = palindromeLow.slice(-palindromeLow.length);
    if (stringContrary === palindromeLow) {
      return true;
    }
    else {
      return false;
    }
  }
  else {
    stringWithoutSpace = palindromeLow.replaceAll(' ','');
    stringContrary = stringWithoutSpace.slice(-stringWithoutSpace.length);
    if (stringContrary === stringWithoutSpace) {
      return true;
    }
    else {
      return false;
    }
  }
}

function extractNumberFromString(stringWithNumber){
  let numberFromString = '';
  for (let i = 0; i < stringWithNumber.length; i++){
    if (parseInt(stringWithNumber[i],10) >= 0) {
      numberFromString += stringWithNumber[i];
    }
  }
  return numberFromString;
}

function addStringToAdressFile (beginString, minLength, addString){
  let calcString = '';
  let resultString = '';
  const numberAdditional = Math.trunc((minLength - beginString.length) / addString.length);
  const residueSymbols = (minLength - beginString.length) % addString.length;

  if (beginString.length <= minLength) {
    if (beginString.length + addString.length > minLength) {
      resultString = addString.slice(0,minLength - beginString.length) + beginString;
    }
    else {
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
  }
  else {
    resultString = beginString;
  }
  return resultString;
}

function validateForLowEqualLength (stringCheck,lengthString){
  return stringCheck.length <= lengthString;
}
