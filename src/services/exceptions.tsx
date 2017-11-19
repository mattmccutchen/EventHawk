// Source: Based on example from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error. Retrieved 2017-11-19.

export class InvalidIdError extends Error {
    id: string

    constructor(id: string, message = "Invalid ID specified", ...params: any[]) {

        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message = message, ...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidIdError);
        }

        // Custom debugging information
        this.id = id;
    }
}
