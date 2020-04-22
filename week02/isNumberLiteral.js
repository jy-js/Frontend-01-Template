function isNumberLiteral(s) {
    return /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?|([01]+) | ([0-7]) | (^0x[a-f0-9]{1,2}$)|(^0X[A-F0-9]{1,2}$)|(^[A-F0-9]{1,2}$)|(^[a-f0-9]{1,2}$)/.test(s);
}

function test() {
    console.log('0', isNumberLiteral('0'));
    console.log('0.1', isNumberLiteral('0.1'));
    console.log('.1', isNumberLiteral('.1'));
    console.log('0110', isNumberLiteral('0110'));
    console.log('063', isNumberLiteral('063'));
    console.log('0xE32A', isNumberLiteral('0xE32A'));
    console.log('false', isNumberLiteral('false'))
}

test();

module.exports = {
    isNumberLiteral
}