function layout(element) {
    if(!element.computedStyle) {
        return;
    }
    let elementStyle = getStyle(element);

    if (elementStyle.display !== 'flex') {
        return ;
    }
    // 过滤文本节点
    let items = element.children.filter(e => e.type === 'element');

    // order item排序
    items.sort(function(a, b) {
        return (a.order || 0) - (b.order || 0);
    });

    let style = elementStyle;

    ['width', 'height'].forEach((size) => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null;
        }
    });

    // 设置属性默认值
    if (isAutoValueOrNull(style.flexDirection)) {
        style.flexDirection = 'row';
    }
    if (isAutoValueOrNull(style.alignItems)) {
        style.alignItems = 'stretch';
    }
    if (isAutoValueOrNull(style.justifyContent)) {
        style.justifyContent = 'flex-start';
    }
    if (isAutoValueOrNull(style.flexWrap)) {
        style.flexWrap = 'nowrap';
    }
    if (isAutoValueOrNull(style.alignContent)) {
        style.alignContent = 'stretch';
    }

    let mainSize, mainStart, mainEnd, mainSign, mainBase,
        crossSize, crossStart, crossEnd, crossSign, crossBase;
    if (style.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if (style.flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if (style.flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if (style.flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if (style.flexWrap === 'wrap-reverse') {
        let tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = 1;
    }

    let isAutoMainSize = false;
    if (style[mainSize] === null) {
        elementStyle[mainSize] = 0;
        for(let i = 0;i < items.length;i++) {
            let item = items[i];
            let itemStyle = getStyle(item);
            if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== 0) {
                elementStyle[mainSize] += itemStyle[mainSize];
            }
        }
        isAutoMainSize = true;
    }

    // 把元素添加进行里
    let flexLine = [];
    let flexLines = [flexLine];

    let mainSpace = elementStyle[mainSize];
    let crossSpace = 0;

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemStyle = getStyle(item);
        if (!itemStyle[mainSize]) {
            itemStyle[mainSize] = 0;
        }

        if (itemStyle.flex) { // 伸缩item，都可以放得下
            flexLine.push(item);
        } else if (style.flexWrap === 'nowrap' && isAutoMainSize) { // 不换行
            mainSpace -= itemStyle[mainSize];
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== undefined) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            flexLine.push(item);
        } else {
            if (itemStyle[mainSize] > style[mainSize]) {
                itemStyle[mainSize] = style[mainSize];
            }
            if (mainSpace < itemStyle[mainSize]) { // 换行
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;

                flexLine = [];
                flexLines.push(flexLine);
                flexLine.push(item);

                mainSpace = style[mainSize];
                crossSpace = 0;
            } else {
                flexLine.push(item);
            }

            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== 0) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            mainSpace -= itemStyle[mainSize];
        }
        flexLine.mainSpace = mainSpace;
    }

    // 计算主轴

    if (style.flexWrap === 'nowrap' || isAutoMainSize) {
        flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
    } else {
        flexLine.crossSpace = crossSpace;
    }

    if (mainSpace < 0) {
        // overflow (happens only if container is single line) scale flex items
        let scale = style[mainSize] / (style[mainSize] - mainSpace);
        let currentMain = mainBase;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemStyle = getStyle(item);

            if (itemStyle.flex) {
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;

            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
        }
    } else {
        // process each flex line
        flexLines.forEach((items) => {
            let mainSpace = items.mainSpace;
            let flexTotal = 0;
            for(let i = 0;i < items.length;i++) {
                let item = items[i];
                let itemStyle = getStyle(item);
                if (itemStyle.flex !== null && itemStyle.flex !== undefined) {
                    flexTotal += itemStyle.flex;
                }
            }
            if (flexTotal > 0) {
                let currentMain = mainBase;
                for(let i = 0;i < items.length;i++) {
                    let item = items[i];
                    let itemStyle = getStyle(item);

                    if (itemStyle.flex) {
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    }
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd];
                }
            } else {
                // 没有flex items, 处理justifyContent 
                let currentMain, step;

                if (style.justifyContent === 'flex-start') {
                    currentMain = mainBase;
                    step = 0;
                }
                if (style.justifyContent === 'flex-end') {
                    currentMain = mainSpace * mainSign + mainBase;
                    step = 0;
                }
                if (style.justifyContent === 'center') {
                    currentMain = mainSpace / 2 * mainSign + mainBase;
                    step = 0;
                }
                if (style.justifyContent === 'space-between') {
                    step = mainSpace / (items.length - 1) * mainSign;
                    currentMain = mainBase;
                }
                if (style.justifyContent === 'space-around') {
                    step = mainSpace / (items.length) * mainSign;
                    currentMain = step / 2 + mainBase;
                }

                for(let i = 0;i < items.length;i++) {
                    let item = items[i];
                    let itemStyle = getStyle(item);
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd] + step;
                }
            }
        });
    }

    // 计算交叉轴
    crossSpace = void 0;

    if (!style[crossSize]) { // auto sizing
        crossSpace = 0;
        elementStyle[crossSize] = 0;
        for (let i = 0; i < flexLines.length; i++) {
            elementStyle[crossSize] += flexLine.crossSpace;
        }
    } else {
        crossSpace = style[crossSize];
        for (let i = 0; i < flexLines.length; i++) {
            crossSpace -= flexLines[i].crossSpace;
        }
    }

    if (style.flexWrap === 'wrap-reverse') {
        crossBase = style[crossSize];
    } else {
        crossBase = 0;
    }

    let lineSize = style[crossSize] / flexLines.length;

    let step;
    if (style.alignContent === 'flexStart') {
        crossBase += 0;
        step = 0;
    }
    if (style.alignContent === 'flex-end') {
        crossBase += crossSign * crossBase;
        step = 0;
    }
    if (style.alignContent === 'center') {
        crossBase += crossSign * crossSpace / 2;
        step = 0;
    }
    if (style.alignContent === 'space-between') {
        crossBase += 0;
        step = crossSpace / (flexLines.length - 1);
    }
    if (style.alignContent === 'space-around') {
        step = crossSpace / flexLines.length;
        crossBase += crossSign * step / 2;
    }
    if (style.alignContent === 'stretch') {
        crossBase += 0;
        step = 0;
    }
    flexLines.forEach(function(items) {
        let lineCrossSize = style.alignContent === 'stretch' ?
            items.crossSpace + crossSpace / flexLines.length :
            items.crossSpace;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemStyle = getStyle(item);

            let align = itemStyle.alignSelf || style.alignItems;
            if (!itemStyle[crossSize]) {
                itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0;
            }

            if (align === 'flex-start') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if (align === 'flex-end') {
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            }
            if (align === 'center') {
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                console.log(itemStyle[crossStart], itemStyle[crossSize])
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if (align === 'stretch') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== undefined) ? itemStyle[crossSize] : lineCrossSize);
                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
            }
        }
        crossBase += crossSign * (lineCrossSize + step);
    });
}

function getStyle(element) {
    if (!element.style) {
        element.style = {};
    }

    for(let prop in element.computedStyle) {
        let p = camelCase(prop);
        element.style[p] = element.computedStyle[prop].value;

        //处理单位
        if (element.style[p].toString().match(/px$/)) {
            element.style[p] = parseInt(element.style[p]);
        }
        if (element.style[p].toString().match(/^[0-9\.]+$/)) {
            element.style[p] = parseInt(element.style[p]);
        }
    }
    return element.style;
}

function camelCase(prop) {
    let arr = prop.split('-');
    if (arr.length > 0) {
        for(let i = 0; i < arr.length; i++) {
            if (i > 0) {
                let s = arr[i].charAt(0).toUpperCase();
                arr[i] = s + arr[i].slice(1);
            }
        }
        return arr.join('');
    } else {
        return prop;
    }
}

function isAutoValueOrNull(flexProp) {
    return !flexProp || flexProp === 'auto';
}

module.exports = {
    layout,
};