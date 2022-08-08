export function decodeAnimation(el: any, timeEachLetter = 100, customText = '') {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
  const start = ['1e4', '1t6', '1h0', '3fr', '3yu', '3vw', 'bc1', '0x1', '0x5', '0x7'];
  const firstLetters = start[Math.floor(Math.random() * start.length)];

  function randomString(len: number, text: string, index: number) {
    let string = firstLetters;
    for (let i = 0; i < len; i++) {
      if (i > 2) {
        if (text[i] === ' ') {
          string += ' ';
        } else {
          string += letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
    return string.slice(index);
  }

  function getText(len: number, text: string) {
    let string = '';
    for (let i = 0; i < len; i++) {
      string += text[i];
    }
    return string;
  }

  function constructText(text: string, index: number) {
    setTimeout(function () {
      el.innerHTML = getText(index, text) + randomString(text.length, text, index);
    }, index * timeEachLetter);
  }

  const text = customText || el.textContent;
  for (let i = 0; i <= text.length; i++) {
    constructText(text, i);
  }
}
