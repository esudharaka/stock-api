
export class APIError extends Error {

    code: number;
    additionalInfo:string;
    httpStatusCode?: number;
    constructor(message: string, code: number, additionalInfo: string, httpCode?: number) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.httpStatusCode = httpCode;
        this.additionalInfo = additionalInfo;
        Error.captureStackTrace(this, this.constructor);
    }


}



export class FileValidationError extends APIError {
    constructor(message: string, code: number, additionalInfo: any, httpCode?: number) {
        super(message, code, additionalInfo, httpCode);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class DBError extends APIError {
    constructor(message: string, code: number, additionalInfo: any, httpCode?: number) {
        super(message, code, additionalInfo, httpCode);
        Error.captureStackTrace(this, this.constructor);
    }
}