import express from 'express';
import url from "url";
import _ from 'lodash';
import { ProductQueryParams } from "../common/interfaces/product.query";
import { ProductDto } from "../products/dto/product.dto";
import { FileUploadRequest } from "../common/interfaces/express/file.upload.http.req";
import { FileValidationError } from "../common/exceptions/api.exception";
import { ERROR_CODES, ErrorMap } from "../common/error.map";


const parseQueryParams = (req: express.Request) => {
    const url_parts = url.parse(req.url, true);
    return url_parts.query;
};

const createProductQueryObject = (req: express.Request) : ProductQueryParams => {
    const queryParams = parseQueryParams(req);
    const { slug } = queryParams;
    return {
        slug: slug ? slug.toString() : null,
    };
};

const createProductPutRequest = (req: express.Request, id: number) : ProductDto => {
    const payload = req.body;
    return {
        id: id,
        name: payload.name,
        sku: payload.sku,
        slug: payload.slug,
        brand: {
            id: payload.id
        },
    };
};


const createProductDtoFromRequest = (req: express.Request) : ProductDto => {
    const payload = req.body;
    return {
        name: payload.name,
        sku: payload.sku,
        slug: payload.slug,
        brand: {
            id: payload.brand.id
        },
    };
};



const validateFileUpload = (fileUploadRequest: FileUploadRequest) => {
    const invalidFileError = ErrorMap.get(ERROR_CODES.INVALID_FILE_TYPE) || '';
    if (_.isUndefined(fileUploadRequest.files) || _.isUndefined(fileUploadRequest.files.file)) {
        throw new FileValidationError(invalidFileError, ERROR_CODES.INVALID_FILE_TYPE , 'File Not attached');
    } else {
        const uploadedFile = fileUploadRequest.files.file;
        const {mimetype, size} = uploadedFile;
        const isValidFileType = mimetype === 'text/csv' || mimetype === 'application/octet-stream'
        if (!isValidFileType) {
            throw new FileValidationError(invalidFileError, ERROR_CODES.INVALID_FILE_TYPE , 'File Not Supported');
        }
        const FIVE_MB_IN_BYTES = 5 * 1024 * 1024;
        const isLargeFile = size > FIVE_MB_IN_BYTES;
        if (isLargeFile) {
            throw new FileValidationError(invalidFileError, ERROR_CODES.INVALID_FILE_TYPE , 'File is Too large')
        }
    }
};

export {
    parseQueryParams,
    createProductQueryObject,
    createProductPutRequest,
    createProductDtoFromRequest,
    validateFileUpload,
}

