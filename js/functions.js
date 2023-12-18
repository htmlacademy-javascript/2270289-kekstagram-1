
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
