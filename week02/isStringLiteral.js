function isStringLiteral(s) {
    return /"([^"\u000a\u000d\u2028\u2029]|\\(['"\\bfnrtv]|[^'"bfnrtvxu0-9\u000a\u000d\u2028\u2029]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})|\[\u000a\u000d\u2028\u2029])*"/.test(s);
}

module.exports = {
    isStringLiteral,
}