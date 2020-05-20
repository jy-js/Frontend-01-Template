const { isEnter, isNewLine } = require('../utils/index');

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
        if (this.isFinished) {
            return;
        }
        if (this.currentState === this.state.WAITING_LENGTH) {
            if (char === '0' && this.length === 0) {
                this.isFinished = true;
            } else if (isEnter(char)) {
                this.currentState = this.state.WAITTING_LENGTH_END;
            } else {
                this.length *= 16;
                this.length += parseInt(char, 16);
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

module.exports = {
    ThunkBodyParser,
}