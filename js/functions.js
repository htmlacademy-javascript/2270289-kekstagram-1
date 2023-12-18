
function checkPalindrome (palindrome) {
  let strokaContrary = '';
  let strokaWithoutSpace = '';
  let palindromeLow = palindrome.toLowerCase();

  if (palindromeLow.indexOf(' ') === -1) {
    strokaContrary = palindromeLow.slice(-palindromeLow.length);
    if (strokaContrary === palindromeLow) console.log('Строка ' + palindrome + ' - является полиндромом!')
    else console.log('Строка ' + palindrome + ' - НЕ является полиндромом!');
  }
  else {
    strokaWithoutSpace = palindromeLow.replaceAll(' ','');
    console.log('strokaWithoutSpace= ' + strokaWithoutSpace);
    strokaContrary = strokaWithoutSpace.slice(-strokaWithoutSpace.length);

    if (strokaContrary === strokaWithoutSpace) console.log('Строка "' + palindrome + '" - является полиндромом!')
    else console.log('Строка "' + palindrome + '" - НЕ является полиндромом!');
  }
}

function extractNumber(strokaWithNumber){
  let numberFromStroka = '';
  for (let i = 0; i < strokaWithNumber.length; i++){
    if (parseInt(strokaWithNumber[i],10) >= 0) {
      numberFromStroka += strokaWithNumber[i];
    }
  }
  console.log('Строка изначальная - ' + strokaWithNumber);
  console.log('Число из строки - ' + numberFromStroka);
}

function addStrokaToStroka (beginStroka, minLengthS, addStroka){
  //
  let beetwenStroka = '';
  let resultStroka = '';
  let numberAdditional = Math.trunc((minLengthS - beginStroka.length) / addStroka.length);
  let ostatokSymbols = (minLengthS - beginStroka.length) % addStroka.length;

  if (beginStroka.length <= minLengthS) {
    if (beginStroka.length + addStroka.length > minLengthS) {
      resultStroka = addStroka.slice(0,minLengthS - beginStroka.length) + beginStroka;
    }
    else {
      if (numberAdditional > 0) {
        beetwenStroka = beginStroka;
        for (let i = 0; i < numberAdditional; i++){
          beetwenStroka = addStroka + beetwenStroka;
        }
      }
      if (ostatokSymbols > 0) {
        beetwenStroka = addStroka.slice(0,ostatokSymbols) + beetwenStroka;
      }
      resultStroka = beetwenStroka;
    }
  }
  else resultStroka = beginStroka;
  console.log('Вызываем функцию: addStrokaToStroka ("' + beginStroka + '", ' + minLengthS + ', "' + addStroka + '")');
  console.log(resultStroka);
}

function validateForLowEqualLength (stroka,lengthStroka){
  console.log('validateForLowEqualLength("' + stroka + '",' + lengthStroka + ') ');
  console.log((stroka.length <= lengthStroka) ? true: false);
  return (stroka.length <= lengthStroka) ? true: false;
}
