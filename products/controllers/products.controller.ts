import express from 'express';
import productService from '../services/products.service';
import { logger } from '../../utils/app.logger';
import {
    createProductQueryObject,
    createProductDtoFromRequest,
    createProductPutRequest,
} from "../../utils/utils";
import { ProductQueryParams } from "../../common/interfaces/product.query";

class ProductsController {
    async getAllProducts(req: express.Request, res: express.Response) {
        const productQueryParams: ProductQueryParams =  createProductQueryObject(req);
        logger.info(`Request received : Get All Products. Query:
         ${JSON.stringify(productQueryParams)}`);
        const products = await productService.list(productQueryParams);
        res.status(200).send(products);
    }

    async getProductById(req: express.Request, res: express.Response) {
        const productId = req.params.productId;
        const product = await productService.readById(productId);
        if ( product){
            res.status(200).send(product);
        } else {
            res.status(404).send(`Product not found. id ${productId}`);
        }
    }

    async createProduct(req: express.Request, res: express.Response) {
        const productRequest = createProductDtoFromRequest(req);
        logger.info(`Create product request: ${JSON.stringify(productRequest)}`);
        const productId = await productService.create(productRequest);
        res.status(201).send({ id: productId });
    }

    async updateProduct(req: express.Request, res: express.Response) {
        const productId = req.params.productId;
        const productDto = createProductPutRequest(req, parseInt(productId));
        const savedProduct = await productService.readById(productId);
        if (!savedProduct) {
            res.status(404).send(`Product not found to update ${productId}`);
        } else {
            const updateResult = await productService.putById(parseInt(productId), productDto);
            res.status(204).send();
        }

    }

    async deleteProduct(req: express.Request, res: express.Response) {
        const productId = req.params.productId;
        const savedProduct = await productService.readById(productId);
        if (!savedProduct) {
            res.status(404).send(`Product not found to delete ${productId}`);
        } else {
            const deleteResponse = await productService.deleteById(parseInt(productId));
            res.status(204).send();
        }

    }

    /**
     * API will be designed in a way that, the use uploads the csv to a cloud locations and the client sends
     * the public accessible url in the request body. in the bellow code, it just read the file in the local storage
     *
     * This will process the CSV async
     */
    async createProductsViaFile(req: express.Request, res: express.Response) {
        const { fileLocation } = req.body;
        logger.info(`bulk product creation request received : file path: ${fileLocation}`);

        productService.syncProductsFromCSV(fileLocation);
        res.status(202).send({ "status": "Request Accepted for Async Processing"});

    }
}

export  default new ProductsController();
