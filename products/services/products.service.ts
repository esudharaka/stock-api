import _ from 'lodash';
import ProductDaoImpl from '../daos/products.dao';
import { ProductsDao } from  '../daos/products.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { ProductDto } from '../dto/product.dto';
import { ProductQueryParams, QueryParams } from "../../common/interfaces/product.query";
import {APIError, DBError } from "../../common/exceptions/api.exception";
import {ERROR_CODES, ErrorMap} from "../../common/error.map";

 class ProductService implements CRUD {
    private productDao:ProductsDao;

    constructor(productDao: ProductsDao) {
        this.productDao = productDao;
    }

    setProductDao(productDao: ProductsDao) {
        this.productDao = productDao;
    }

     /**
      * This method is responsible of creating Product resource
      * @param resource: @ProductDto
      */
    async create(resource: ProductDto) {
        try {
            return this.productDao .addProduct(resource);
        } catch (e) {
            if ( e instanceof DBError){
                throw  e;
            } else {
                throw new APIError(ErrorMap.get(ERROR_CODES.GENERIC_API_ERROR) || '', e.message, e);
            }
        }
    }

     /**
      * This method is responsible of deleting the Product by giving the product id
      * This will delete the resource from the DB
      * @param id
      */
    async deleteById(id: number) {
        try {
            return this.productDao .deleteProductById(id);
        } catch (e) {
            throw new APIError(ErrorMap.get(ERROR_CODES.GENERIC_API_ERROR) || '', e.message, e);
        }

    }

     /**
      * This method returns the list of products that are available
      * @param query
      */
    async list(query: QueryParams) {
        const markerSymbolInfo = <ProductQueryParams> query;
        const searchBySlug = markerSymbolInfo.slug;
        try {
            if ( searchBySlug ) {
                return this.productDao .getProductBySlug(searchBySlug.toString());
            } else {
                return this.productDao .getAllProducts();
            }
        } catch (e) {
            throw new APIError(ErrorMap.get(ERROR_CODES.GENERIC_API_ERROR) || '', e.message, e);
        }


    }

     /**
      * This method will update the Product for the given Id
      * @param id
      * @param resource
      */
    async putById(id: number, resource: ProductDto): Promise<any> {
        try {
            return this.productDao .updateProduct(id, resource);
        } catch (e) {
            if ( e instanceof DBError){
                throw  e;
            } else {
                throw new APIError(ErrorMap.get(ERROR_CODES.GENERIC_API_ERROR) || '', e.message, e);
            }
        }
    }

     /**
      * This method will return the Product by giving the id
      * @param id
      */
    async readById(id: string) {
        try {
            return this.productDao .getProductById(id);
        } catch (e) {
            throw new APIError(ErrorMap.get(ERROR_CODES.GENERIC_API_ERROR) || '', e.message, e);
        }
    }

    /**
     * This method will create the products that are given
     * @param entries
     */
    async syncProductsFromCSV(entries: any[]) {

        try {
            await this.productDao .addProducts(entries.map((e) => {
                if ( _.isEmpty( e.NAME) ||
                    _.isEmpty( e.SKU) ||
                    _.isEmpty( e.SLUG) ||
                    _.isEmpty( e.BRAND_ID)) {
                    throw new APIError(
                        ErrorMap.get(ERROR_CODES.REQUIRED_DATA_MISSING) || '', ERROR_CODES.REQUIRED_DATA_MISSING, e);

                }
                const productDto: ProductDto = {
                    name: e.NAME,
                    sku: e.SKU,
                    slug: e.SLUG,
                    brand: {
                        id: e.BRAND_ID
                    }
                };
                return productDto;
            }));
        } catch (e) {
            if ( e instanceof DBError) {
                throw e;
            } else {
                throw new APIError(
                    ErrorMap.get(ERROR_CODES.GENERIC_API_ERROR) || '', ERROR_CODES.GENERIC_API_ERROR, e);
            }
        }
    }

}

export default new ProductService(ProductDaoImpl);
