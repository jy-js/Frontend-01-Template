const { ThunkBodyParser } = require('./bodyParser');
const { isEnter, isNewLine } = require('../utils/index');

class Response {}

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
            body: this.bodyParser.content.join(''),
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

module.exports = {
    ResponseParser,
    Response,
}