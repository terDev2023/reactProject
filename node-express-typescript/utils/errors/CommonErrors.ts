import ApiError from "./ApiError";

export class ServerError extends ApiError {
    constructor() {
        super(500, 'Server is bad')
    }
}


export class InternalError extends ApiError {
    constructor() {
        super(500, 'There is internal error')
    }
}

