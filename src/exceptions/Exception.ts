export default class Exception {
    code: string;
    message: string;

    constructor(message, code) {
        this.code = code;
        this.message = message;
    }
}
