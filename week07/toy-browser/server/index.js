const http = require('http');
const { RESPONSE_HTML } = require('./mock');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(RESPONSE_HTML);
});

server.listen(8088);