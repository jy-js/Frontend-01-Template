function convertStringToNumber(chars, radix = 10) {
    const zeroCodePoint = '0'.codePointAt(0);
    let integer = 0;
    let decimalPointIdx = 0;
    for (let i = 0; i < chars.length && chars[i] !== '.'; i++) {
      integer *= radix;
      integer += chars[i].codePointAt(0) - zeroCodePoint;
      decimalPointIdx = i;
    }
  
    let decimal = 0;
    for (let j = chars.length - 1; decimalPointIdx < j; j--) {
      decimal += chars[j].codePointAt(0) - zeroCodePoint;
      decimal /= radix;
    }
    return integer + decimal;
}

console.log(convertStringToNumber("15"));           // 15
console.log(convertStringToNumber('11000', 2));     // 24
console.log(convertStringToNumber('239.3', 8));     // 160.796875
console.log(convertStringToNumber('888.8', 16));    // 2183.90625