const { isBlank, isLetter } = require('../utils');

const EOF = Symbol('EOF');

let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;

let stack = [{ type: 'document', children: [] }];

function emit(token) {
    let top = stack[stack.length - 1];

    if (token.type === 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attributes: []
        };

        element.tagName = token.tagName;
        for (let p in token) {
            if (p !== 'type' && p !== 'tagName') {
                element.attributes.push({
                    name: p,
                    value: token[p]
                });
            }
        }

        top.children.push(element);
        element.parent = top;

        currentTextNode = null;

        if (!token.isSelfClosing) {
            stack.push(element);
        }

    } else if (token.type === 'endTag') {
        if (top.tagName !== token.tagName) {
            throw new Error(`Tag start end doesn't match`);
        } else {
            stack.pop();
        }
        currentTextNode = null;
    } if (token.type === 'text') {
        if (currentTextNode === null) {
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}

function data(c) {
    if (c === '<') {
        return tagOpen;
    } else if (c === EOF) {
        return ;
    } else {
        currentToken = {
            type: 'text',
            content: c
        };
        emit(currentToken);
        return data;
    }
}

function tagOpen(c) {
    if (c === '/') {
        return endTagOpen;
    } else if (isLetter(c)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        };
        return tagName(c);
    } else {
        return;
    }
}

function endTagOpen(c) {
    if (isLetter(c)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c)
    } else if (c === '>') {

    } else if (c === EOF) {

    } else {
        throw new Error('invalid-first-character-of-tag-name!');
    }
}

function tagName(c) {
    if (isBlank(c)) {
        return beforeAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (isLetter(c)) {
        currentToken.tagName += c.toLowerCase();
        return tagName;
    } else if (c === '>') {
        emit(currentToken);
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (isBlank(c)) {
        return beforeAttributeName;
    } else if (c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c);
    } else if (c === '=') {
        throw new Error('unexpected-equals-sign-before-attribute-name!');
    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attribiteName(c);
    }
}

function attribiteName(c) {
    if (isBlank(c) || c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c);
    } else if (c === '=') {
        return beforeAttributeValue;
    } else if (c === '\u0000') {
        throw new Error('unexpected-null-character!');
    } else if (c == '"' || c === "'" || c === '<') {
        throw new Error('unexpected-character-in-attribute-name!');
    } else {
        currentAttribute.name += c;
        return attribiteName;
    }
}

function afterAttributeName (c) {
    if (isBlank(c)) {
        return afterAttributeName;
    } else if (c === '/'){
        return selfClosingStartTag;
    } else if (c === '=') {
        return beforeAttributeValue;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === EOF) {

    } else {
        currentAttribute = {
            name: '',
            value: '',
        }
        return attribiteName(c);
    }
}

function beforeAttributeValue(c) {
    if (isBlank(c) || c === '/' || c === '>' || c === EOF) {

    } else if (c === '"') {
        return doubleQuotedAttributeValue;
    } else if (c === "'") {
        return singleQuotedAttributeValue;
    } else if (c === '>') {
        throw new Error('missing-attribute-value');
    } else {
        return unQuotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c) {
    if (c === '"') {
        return afterQuotedAttributeValue;
    } else if (c === '\u0000') {
        throw new Error('unexpected-null-character!');
    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c) {
    if (c === "'") {
        return afterQuotedAttributeValue;
    } else if (c === '\u0000') {
        throw new Error('unexpected-null-character!');
    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return singleQuotedAttributeValue;
    }
}

function unQuotedAttributeValue(c) {
    if (isBlank(c)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (c === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === '\u0000') {
        throw new Error('unexpected-null-character!');
    } else if (c === '"' || c === "'" || c === '<' || c === '=' || c === '`') {
        throw new Error('unexpected-character-in-unquoted-attribute-value!');
    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return unQuotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c) {
    if (isBlank(c)) {
        return beforeAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else {
        return beforeAttributeName(c);
    }
}

function selfClosingStartTag(c) {
    if (c === '>') {
        currentToken.isSelfClosing = true;
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === EOF) {

    } else {

    }
}

module.exports.parseHtml = function parseHtml(html) {
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state === state(EOF);
    console.log(stack[0])
}

