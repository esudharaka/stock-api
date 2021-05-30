import express from 'express';
import _ from 'lodash';

class ProductsMiddleware {

    validateCreateProduct(req: express.Request,
                          res: express.Response,
                          next: express.NextFunction) {

        const { name, sku, slug, brand} = req.body;
        const brandId = brand? brand.id : null;
        if (_.isEmpty(name) ||
            _.isEmpty(sku) ||
            _.isEmpty(slug) ||
            _.isEmpty(brandId)) {
            res.status(400).send({
                            error: `Missing required fields`,
                        });
        } else {
            next();
        }

    }
}

export default new ProductsMiddleware();
