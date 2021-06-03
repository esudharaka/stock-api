import express from 'express';
import {APIError} from "./common/exceptions/api.exception";
import  { logger }from './utils/app.logger'

class GlobalErrorHandler {

    handler( error: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        logger.error(`Error Occurred: ${JSON.stringify(error)}`);
        if (error instanceof APIError) {
            const httpStatus = error.httpStatusCode || 500;
            return res.status(httpStatus).json({
                code: error.code,
                message: error.message,
                additionalInfo: error.additionalInfo
            });
        }
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
}

export default new GlobalErrorHandler();
