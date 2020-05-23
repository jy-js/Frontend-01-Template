const net = require('net');
const { Request } = require('./request');
const { parseHtml } = require('../parser')

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
    // console.log(dom)
}

main();
