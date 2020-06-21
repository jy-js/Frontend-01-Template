function isEnter(char) {
    return char === '\r';
}

function isNewLine(char) {
    return char === '\n';
}

function isBlank(char) {
    return /^[\t\n\f ]$/.test(char);
}

function isLetter(char) {
    return /^[a-zA-Z]$/.test(char);
}

module.exports = {
    isEnter,
    isNewLine,
    isBlank,
    isLetter,
}
