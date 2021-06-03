
import { expect } from 'chai';
import ProductService from '../../products/services/products.service'
import { ProductDto } from "../../products/dto/product.dto";

import * as sinon from "ts-sinon";
import {ProductsDao} from "../../products/daos/products.dao";
import {DBError} from "../../common/exceptions/api.exception";
import {ERROR_CODES, ErrorMap} from "../../common/error.map";

const stubObject = sinon.stubObject;

const productDao : ProductsDao = new ProductsDao();
const productDaoStub = stubObject<ProductsDao>(productDao);


describe('ProductService tests', () => {
    // ProductService.setProductDao
    ProductService.setProductDao(productDaoStub);
    it('Create Product', async () => {

        const productDto: ProductDto = {
            name: 'my product',
            brand: {
                id: 1
            },
            sku: '222',
            slug: 'slug'
        };
        productDaoStub.addProduct.returns(Promise.resolve(1));

        const createdProductId = await ProductService.create(productDto);
        /* detect retina */
        expect(createdProductId).to.be.eq(1);

    });
    it('Create Product with duplicate sku', async () => {

        const productDto: ProductDto = {
            name: 'my product',
            brand: {
                id: 1
            },
            sku: '222',
            slug: 'slug'
        };
        const dbError = new DBError(
            ErrorMap.get(ERROR_CODES.DUPLICATE_ENTRIES) || '', ERROR_CODES.DUPLICATE_ENTRIES, '')
        productDaoStub.addProduct.throws(dbError);

        try {
             await ProductService.create(productDto);
        } catch (e) {
            expect(e).to.to.be.eq(dbError);
        }

    });
});