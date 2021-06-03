import express from 'express';
const { Readable } = require('stream');


import csv from 'csv-parser';
import productService from '../services/products.service';
import { logger } from '../../utils/app.logger';
import {
    createProductQueryObject,
    createProductDtoFromRequest,
    createProductPutRequest,
    validateFileUpload,
} from "../../utils/utils";
import { ProductQueryParams } from "../../common/interfaces/product.query";
import { FileUploadRequest } from "../../common/interfaces/express/file.upload.http.req";
import {FileValidationError} from "../../common/exceptions/api.exception";


class ProductsController {

    /**
     * Get All Products
     * @param req
     * @param res
     * @param next
     */
    async getAllProducts(req: express.Request, res: express.Response, next: express.NextFunction) {
        const productQueryParams: ProductQueryParams =  createProductQueryObject(req);
        logger.info(`Request received : Get All Products. Query: ${JSON.stringify(productQueryParams)}`);
        try {
            const products = await productService.list(productQueryParams);
            res.status(200).send(products);
        } catch (e) {
            next(e);
        }
    }

    /**
     * Get Product By Id
     * @param req
     * @param res
     * @param next
     */
    async getProductById(req: express.Request, res: express.Response ,next: express.NextFunction) {
        const productId = req.params.productId;
        try {
            const product = await productService.readById(productId);
            if ( product){
                res.status(200).send(product);
            } else {
                res.status(404).send(`Product not found. id ${productId}`);
            }
        } catch (e) {
            next(e);
        }

    }

    /**
     * Create Product
     * @param req
     * @param res
     * @param next
     */
    async createProduct(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const productRequest = createProductDtoFromRequest(req);
            logger.info(`Create product request: ${JSON.stringify(productRequest)}`);
            const productId = await productService.create(productRequest);
            res.status(201).send({ id: productId });
        } catch (e) {
            logger.error(`Error while creating the product`);
            next(e);
        }

    }

    /**
     * Update Product
     * @param req
     * @param res
     * @param next
     */
    async updateProduct(req: express.Request, res: express.Response,next: express.NextFunction) {
        try {
            const productId = req.params.productId;
            const productDto = createProductPutRequest(req, parseInt(productId));
            logger.info(`Create product request: ${JSON.stringify(productDto)}`);
            const savedProduct = await productService.readById(productId);
            if (!savedProduct) {
                res.status(404).send(`Product not found to update ${productId}`);
            } else {
                const updateResult = await productService.putById(parseInt(productId), productDto);
                res.status(204).send();
            }
        } catch (e) {
            next(e);
        }


    }

    /**
     * delete Product
     * @param req
     * @param res
     * @param next
     */
    async deleteProduct(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const productId = req.params.productId;
            const savedProduct = await productService.readById(productId);
            if (!savedProduct) {
                res.status(404).send(`Product not found to delete ${productId}`);
            } else {
                await productService.deleteById(parseInt(productId));
                res.status(204).send();
            }

        } catch (e) {
            next(e);
        }

    }


    /**
     * Create products from CSV. This method will accept the request and process it async
     * @param req
     * @param res
     * @param next
     */
    async createProductsViaFile(req: express.Request, res: express.Response, next: express.NextFunction) {
        const fileUploadRequest = <FileUploadRequest> req;

        try {
            validateFileUpload(fileUploadRequest);
        } catch (error) {
            if (error instanceof FileValidationError) {
                return res.status(400).send({
                                code: error.code,
                                error: error.message,
                                additionalInfo: error.additionalInfo
                            })
            }
        }

        const stream = Readable.from(fileUploadRequest.files.file.data.toString());
        const results : any[] = [];
        stream
            .pipe(csv())
            .on('data', (data: any) => results.push(data))
            .on('end', async () => {
                try {
                    await productService.syncProductsFromCSV(results);
                } catch (e) {
                    logger.error(`Could not persist the data, ${JSON.stringify(e)}`);
                }

            });
        res.status(202).send({ "status": "Request Accepted for Async Processing"});

    }


}

export  default new ProductsController();
