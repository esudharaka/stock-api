import express from 'express';
import userService from '../services/products.service';
import _ from 'lodash';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');
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
    // async validateRequiredUserBodyFields(
    //     req: express.Request,
    //     res: express.Response,
    //     next: express.NextFunction
    // ) {
    //     if (req.body && req.body.email && req.body.password) {
    //         next();
    //     } else {
    //         res.status(400).send({
    //             error: `Missing required fields email and password`,
    //         });
    //     }
    // }
    //
    // async validateSameEmailDoesntExist(
    //     req: express.Request,
    //     res: express.Response,
    //     next: express.NextFunction
    // ) {
    //     const user = await userService.getUserByEmail(req.body.email);
    //     if (user) {
    //         res.status(400).send({ error: `User email already exists` });
    //     } else {
    //         next();
    //     }
    // }

    async validateSameEmailBelongToSameUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        // const user = await userService.getUserByEmail(req.body.email);
        // if (user && user.id === req.params.userId) {
        //     next();
        // } else {
        //     res.status(400).send({ error: `Invalid email` });
        // }
    }

    // Here we need to use an arrow function to bind `this` correctly
    validatePatchEmail = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        // if (req.body.email) {
        //     log('Validating email', req.body.email);
        //
        //     this.validateSameEmailBelongToSameUser(req, res, next);
        // } else {
        //     next();
        // }
    };

    async validateUserExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        // const user = await userService.readById(req.params.userId);
        // if (user) {
        //     next();
        // } else {
        //     res.status(404).send({
        //         error: `User ${req.params.userId} not found`,
        //     });
        // }
    }

    async extractUserId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.userId;
        next();
    }
}

export default new ProductsMiddleware();
