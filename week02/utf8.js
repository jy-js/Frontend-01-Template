/**
 * @description utf8 encode inner function
 * @tutorial https://encoding.spec.whatwg.org/#utf-8-encoder
 * @param {String} codePoint
 * @returns {Array} bytes bytes, in order
 */
const _encode = function (codePoint) {
    const c = codePoint;

    if (c >= 0x0 && c <= 0x7F) { // ASCII codePonit
        return [c];
    } else if (c >= 0x80 && c <= 0x7ff) {
        return [
            c >> 6 & 0x1f | 0xc0,
            c >> 0 & 0x3f | 0x80,
        ];
    } else if (c >= 0x800 && c <= 0xFFFF) {
        return [
            c >> 12 & 0x0f | 0xe0,
            c >> 6  & 0x3f | 0x80,
            c >> 0  & 0x3f | 0x80,
        ];
    } else if (c >= 0x1000 && c <= 0x10FFFF) {
        return [
            c >> 18 & 0x70 | 0xf0,
            c >> 12 & 0x3f | 0x80,
            c >> 6  & 0x3f | 0x80,
            c >> 0  & 0x3f | 0x80,
        ];
    }
    throw Error("invalid codePoint!");
}

const tranformToHex = function(num) {
    return parseInt(num, 10).toString(16);
}

const utf8Encode = function(s) {
    if (typeof s !== 'string' || s === '') {
        return [];
    }
    return _encode(s.codePointAt(0)).map(tranformToHex);
}

const test = function() {
    console.log('---------字符串UTF8编码十六进制表示---------');
    console.log('A -> [41] :' , utf8Encode('A'));
    console.log('ö -> [c3, b6] :' , utf8Encode('ö'));
    console.log('Ж -> [d0, 96] :' , utf8Encode('Ж'));
    console.log('€ -> [e2, 82, ac] :' , utf8Encode('€'));
    console.log('𝄞 -> [f0, 9d, 84, 9e]' , utf8Encode('𝄞'));
}

test();

module.exports = {
    utf8EncodeString,
}