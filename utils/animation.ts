export const randomText = (text: string, callback: (x: string) => void, timeEachLetter = 100) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

  function randomString(len: number, text: string, index: number) {
    let string = '';
    for (let i = 0; i < len; ++i) {
      if (text[i] === ' ') {
        string += ' ';
      } else {
        string += letters[Math.floor(Math.random() * letters.length)];
      }
    }
    return string.slice(index);
  }

  function constructText(text: string, index: number) {
    setTimeout(function () {
      const ans = text.slice(0, index) + randomString(text.length, text, index);
      callback(ans)
    }, index * timeEachLetter);
  }

  for (let i = 0; i <= text.length; ++i) {
    constructText(text, i);
  }
}
