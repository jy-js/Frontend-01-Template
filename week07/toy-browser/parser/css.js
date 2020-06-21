/**
 * css parser
 * use https://www.npmjs.com/package/css
 */

 const parse = require('../lib/cssParser/parse/index');

 let rules = [];

 function addCssRules(text) {
    let ast = parse(text);
    rules.push(...ast.stylesheet.rules);
 }

 function getParents(element) {
    const parents = [];
    let _el = element;
    while(_el.parent && 'tagName' in _el.parent) {
        parents.push(_el.parent);
        _el = _el.parent;
    }
    return parents;
 }

 function getAttr(element, name) {
    try {
        return element.attributes.filter((attr) => attr.name === name)[0];
    } catch(e) {
        return null;
    }
 }

 function computeCss(element) {
    const elements = getParents(element);
    if (!element.computedStyle) {
        element.computedStyle = {};
    }

    for(let rule of rules) {
        let matched = false;
        const selectorParts = rule.selectors[0].split(' ').reverse();

        if (!match(element, selectorParts[0])) {
            continue;
        }

        let j = 1;
        for(let i = 0;i < elements.length;i++) {
            if (j > selectorParts.length) {
                break;
            }
            if (match(elements[i], selectorParts[j])) {
                j++;
            }
        }
        if (j >= selectorParts.length) {
            matched = true;
        }

        if (matched) {
            const sp = specificity(rule.selectors[0]);
            let computedStyle = element.computedStyle;
            for(let declaration of rule.declarations) {
                if (!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {};
                }
                const property = computedStyle[declaration.property];

                if (!property.specificity || compare(property.specificity, sp) < 0) {
                    property.value = declaration.value;
                    property.specificity = sp;
                }
            }
        }
    }
 }

 function match(element, selector) {
    if (!selector || !element.attributes) {
        return false;
    }

    const firstChar = selector.charAt(0);
    if (firstChar === '#') {
        const attr = getAttr(element, 'id');
        if (attr && attr.value === selector.replace('#', '')) {
            return true;
        }
    } else if(firstChar === '.') {
        const attr = getAttr(element, 'class');
        if (attr && attr.value !== '') {
            const classNames = attr.value.split(' ').map(className => `.${className}`);
            return classNames.includes(selector);
        }
    } else {
        if (element.tagName === selector) {
            return true;
        }
    }
    return false;
 }

 function specificity(selector) {
    const p = [0, 0, 0, 0];
    const selectorParts = selector.split(' ');
    for(let part of selectorParts) {
        const firstChar = part.charAt(0);
        if (firstChar === '#') {
            p[1] += 1;
        } else if (firstChar === '.') {
            p[2] += 1;
        } else {
            p[3] += 1;
        }
    }
    return p;
 }

 function compare(sp1, sp2) {
    if (sp1[0] - sp2[0]) {
        return sp1[0] - sp2[0];
    } else if (sp1[1] - sp2[1]) {
        return sp1[1] - sp2[1];
    } else if (sp1[2] - sp2[2]) {
        return sp1[2] - sp2[2];
    } else {
        return sp1[3] - sp2[3];
    }
 }

 module.exports = {
    addCssRules,
    computeCss,
 }