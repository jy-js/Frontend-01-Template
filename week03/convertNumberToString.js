function convertNumberToString(number, radix = 10) {
    let integer = Math.floor(number);
    let decimal = number - integer;
    let str = !integer ? '0' : '';
    while (integer > 0) {
        str = `${integer % radix}${str}`;
        integer = Math.floor(integer / radix);
    }
    
    if (decimal) {
        str += '.';
        while (decimal && !/\.\d{20}$/.test(str)) {
            decimal *= radix;
            str += `${Math.floor(decimal)}`;
            decimal -= Math.floor(decimal);
        }
    }
    return str;
}

console.log(convertNumberToString(0));  // 0
console.log(convertNumberToString(2222.20, 10)); // 2222.19999999999981810105
console.log(convertNumberToString(12, 8)); // 14
console.log(convertNumberToString(17, 16)); // 11