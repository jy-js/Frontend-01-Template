const net = require('net');

class Response {

}

function isEnter(char) {
    return char === '\r';
}

function isNewLine(char) {
    return char === '\n';
}

class ThunkBodyParser {
    constructor() {
        this.state = {
            WAITING_LENGTH: 0,
            WAITTING_LENGTH_END: 1,
            READING_TRUNK: 2,
            WAITTING_NEW_LINE: 3,
            WAITING_NEW_LINE_END: 4,
        };
        this.length = 0;
        this.content = [];
        this.isFinished = false;
        this.currentState = this.state.WAITING_LENGTH;
    }

    recieveChar(char) {
        if (this.currentState === this.state.WAITING_LENGTH) {
            if (char === '0') {
                this.isFinished = true;
            } else if (isEnter(char)) {
                this.currentState = this.state.WAITTING_LENGTH_END;
            } else {
                this.length *= 10;
                this.length += char.charCodeAt(0) - '0'.charCodeAt(0);
            }
        } else if (this.currentState === this.state.WAITTING_LENGTH_END) {
            if (isNewLine(char)) {
                this.currentState = this.state.READING_TRUNK;
            }
        } else if (this.currentState === this.state.READING_TRUNK) {
            this.content.push(char);
            this.length--;
            if (this.length === 0) {
                this.currentState = this.state.WAITTING_NEW_LINE;
            }
        } else if (this.currentState === this.state.WAITTING_NEW_LINE) {
            if (isEnter(char)) {
                this.currentState = this.state.WAITING_NEW_LINE_END;
            }
        } else if (this.currentState === this.state.WAITING_NEW_LINE_END) {
            if (isNewLine(char)) {
                this.currentState = this.state.WAITING_LENGTH;
            }
        }
    }
}

class ResponseParser {
    constructor() {
        this.state = {
            WAITTING_STATUS_LINE: 0,
            WAITTING_HEADER_KEY: 1,
            WAITTING_HEADER_VALUE: 2,
            WATITING_HEADER_SPACE: 3,
            WAITTING_HEADER_BLOCK_END: 4,
            WAITTING_BODY: 5,
        };
        this.currentState = this.state.WAITTING_STATUS_LINE;
        this.statusLine = '';
        this.headers = {};
        this.headerKey = '';
        this.headerValue = '';
        this.body = '';
    }

    get isFinished() {
        return this.bodyParser && this.bodyParser.isFinished;
    }
    
    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        };
    }

    recieve(string) {
        for(let i = 0;i < string.length;i++) {
            this.recieveChar(string.charAt(i));
        }
    }

    recieveChar(char) {
        if (this.currentState === this.state.WAITTING_STATUS_LINE) {
            if (isEnter(char)) {
                return;
            }
            if (isNewLine(char)) {
                this.currentState = this.state.WAITTING_HEADER_KEY;
            } else {
                this.statusLine += char;
            }
        } else if (this.currentState === this.state.WAITTING_HEADER_KEY) {
            if (isEnter(char)) {
                this.currentState = this.state.WAITTING_HEADER_BLOCK_END;
            } else if (char === ':') {
                this.currentState = this.state.WATITING_HEADER_SPACE;
            } else {
                this.headerKey += char;
            }
        } else if (this.currentState === this.state.WATITING_HEADER_SPACE) {
            if (char === ' ') {
                this.currentState = this.state.WAITTING_HEADER_VALUE;
            }
        } else if (this.currentState === this.state.WAITTING_HEADER_VALUE) {
            if (isEnter(char)) {
                return;
            }
            if (isNewLine(char)) {
                this.currentState = this.state.WAITTING_HEADER_KEY;
                this.headers[this.headerKey] = this.headerValue;
                this.headerKey = '';
                this.headerValue = '';
            } else {
                this.headerValue += char;
            }
        } else if (this.currentState === this.state.WAITTING_HEADER_BLOCK_END) {
            if (isNewLine(char)) {
                this.currentState = this.state.WAITTING_BODY;
                if (this.headers['Transfer-Encoding'] === 'chunked')
                    this.bodyParser = new ThunkBodyParser();
            }
        } else if (this.currentState === this.state.WAITTING_BODY) {
            this.bodyParser.recieveChar(char);
        }
    }
}

class Request {
    constructor(options) {
        this.method = options.method || 'GET';
        this.host = options.host;
        this.path = options.path || '/';
        this.port = options.port || 80;
        this.body = options.body || {};
        this.headers = options.headers || {};

        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencode';
        }

        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencode') {
            this.bodyText = Object.keys(this.body).map(k =>`${k}=${encodeURIComponent(this.body[k])}`).join('&');
        }
        this.headers['Content-Length'] = this.bodyText.length;
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(k => `${k}:${this.headers[k]}`).join('\r\n')}\r
\r
${this.bodyText}`
}

    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser;
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port,
                }, () => {
                    connection.write(this.toString());
                });
            }
            connection.on('data', (data) => {
                parser.recieve(data.toString());
                if(parser.isFinished) {
                    resolve(parser.response);
                }
                connection.end();
            });
            connection.on('error', (err) => {
                reject(err);
                connection.end();
            })
        });
    }
}

void async function() {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8088',
        body: {
            name: 'Jy'
        }
    });

    let response = await request.send();
    console.log(response)
}();
