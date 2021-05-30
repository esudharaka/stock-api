import { RouterConfigs } from '../common/routerConfigs';
import ProductsController from './controllers/products.controller';
import ProductsMiddleware from './middleware/products.middleware';
import express from 'express';

export class ProductsRoutes extends RouterConfigs {
    constructor(app: express.Application) {
        super(app, 'ProductsRoutes');
    }

    configureRoutes() {
        this.app
            .route(`/products`)
            .get(ProductsController.getAllProducts)
            .post(
                ProductsMiddleware.validateCreateProduct,
                ProductsController.createProduct
            );

        this.app
            .route(`/products/:productId`)
            .get(ProductsController.getProductById)
            .delete( ProductsController.deleteProduct)
            .put(
                ProductsMiddleware.validateUpdateProduct,
                ProductsController.updateProduct);

        return this.app;
    }
}
