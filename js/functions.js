
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
  let difference = 0;
  let nomer = 0;
  //
  if (beginStroka.length <= minLengthS) {
    if (beginStroka.length + addStroka.length > minLengthS) {
      console.log('Путь 1');
      difference = minLengthS - beginStroka.length;
      console.log('difference =' + difference);
      resultStroka = addStroka.slice(0,difference) + beginStroka;
    }
    else {
      console.log('Путь addStroka + beginStroka');
      beetwenStroka = addStroka + beginStroka;
      nomer = 0;
      while (beetwenStroka.length < minLengthS) {
        beetwenStroka += addStroka[nomer];
        nomer += 1;
      }
      resultStroka = beetwenStroka;
    }

    //for (let i = 0; i < minLengthS; i++)
    //      resultStroka += beetwenStroka[i];
    //
  }
  console.log('Вызываем функцию: addStrokaToStroka ("' + beginStroka + '", ' + minLengthS + ', "' + addStroka + '")');
  console.log(resultStroka);
}
