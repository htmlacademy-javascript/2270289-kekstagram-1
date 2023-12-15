
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
    strokaWithoutSpace = replaceAll(palindromeLow,' ','');
    for (let i = strokaWithoutSpace.length - 1; i >= 0; i--) {
      strokaContrary = strokaContrary + strokaWithoutSpace[i];
    }
    if (strokaContrary === strokaWithoutSpace) console.log('Строка ' + palindrome + ' - является полиндромом!')
    else console.log('Строка ' + palindrome + ' - НЕ является полиндромом!');
  }
}
