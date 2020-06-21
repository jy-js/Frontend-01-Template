const { parseHtml } = require('../parser');

function getFirstChild(node) {
    return node && node.children && node.children.length > 0 && node.children[0];
}

const TestCase = {
    normal() {
        return getFirstChild(parseHtml(`<div></div>`)).tagName === 'div';
    },
    text() {
        const textElement = getFirstChild(parseHtml(`<div>test</div>`)).children[0];
        return textElement.type === 'text' && textElement.content === 'test';
    },
    selfClosing() {
        const element = getFirstChild(parseHtml(`<img />`));
        return element.tagName === 'img' && element.isSelfClosing === true;
    },
    attribute() {
        const element = getFirstChild(parseHtml(`<img src="https://cdn.bootcss.com/image/loading.gif" />`));
        return element.attributes[0].name === 'src' &&
            element.attributes[0].value === 'https://cdn.bootcss.com/image/loading.gif';
    },
    parentAndChildren() { // 父子关系
        const element = getFirstChild(parseHtml(`<div><a>link</a></div>`));
        return element.children[0].tagName === 'a' &&
            element.children[0].parent.tagName === 'div';
    }
}

void function test() {
    let allPassed = true;
    let notPassCount = 0;
    for(let p in TestCase) {
        if (TestCase[p]() === true) {
            console.log(`[TestCase ${p}] is true`);
        } else {
            console.log(`[TestCase ${p}] is false`);
            allPassed = false;
            notPassCount++;
        }
    }
    if (allPassed) {
        console.log('allPassed!');
    } else {
        console.log(`notPassCount: ${notPassCount}`);
    }
}();