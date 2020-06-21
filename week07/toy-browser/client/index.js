const net = require('net');
const images = require('images');
const { Request } = require('./request');
const { parseHtml } = require('../parser');
const render = require('../render/index');

async function main() {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8088',
        body: {
            name: 'Jy'
        }
    });

    let response = await request.send();
    let dom = parseHtml(response.body);
    // console.log(dom.children[1].children[3].children[1].children[3])
    let viewport = images(800, 600);
    render(viewport, dom);
    viewport.save('viewport.jpg');
}

main();
