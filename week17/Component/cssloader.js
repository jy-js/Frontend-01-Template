let css = require('css');
const path = require('path');

module.exports = function(source, map){
    let stylesheet = css.parse(source);
    const basename = path.basename(this.resourcePath);
    let name = basename.split('.')[0];
    
    for(let rule of stylesheet.stylesheet.rules){
        rule.selectors = rule.selectors.map(sel => 
            sel.match(new RegExp(`^.${name}`)) ? sel :
            `.${name} ${sel}`
        );
    }

    return `
        let style = document.createElement("style");
        style.innerHTML = ${JSON.stringify(css.stringify(stylesheet))};
        document.documentElement.appendChild(style);
    `;
}