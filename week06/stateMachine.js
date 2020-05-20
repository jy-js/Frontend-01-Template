function match(string) {
    let state = start;
    for (let c of string) {
        state = state(c);
    }
    return state === end;
}

function start(ch) {
    if (ch === 'a') {
        return foundA;
    }
    return start(ch);
}

function foundA(ch) {
    if (ch === 'b') {
        return foundB;
    }
    return start(ch);
}

function foundB(ch) {
    if (ch === 'c') {
        return foundC;
    }
    return start(ch);
}

function foundC(ch) {
    if (ch === 'd') {
        return foundD;
    }
    return start(ch);
}

function foundD(ch) {
    if (ch === 'e') {
        return end;
    }
    return start(ch);
}

function end() {
    return end;
}

console.log(match('abcde'))