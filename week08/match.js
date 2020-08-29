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