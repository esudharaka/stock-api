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

    async deleteById(id: number) {
        try {
            return this.productDao .deleteProductById(id);
        } catch (e) {
            throw new APIError(ErrorMap.get(ERROR_CODES.GENERIC_API_ERROR) || '', e.message, e);
        }

    }

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

    async putById(id: number, resource: ProductDto): Promise<any> {
        try {
            return this.productDao .updateProduct(id, resource);
        } catch (e) {
            throw new APIError(ErrorMap.get(ERROR_CODES.GENERIC_API_ERROR) || '', e.message, e);
        }
    }

    async readById(id: string) {
        try {
            return this.productDao .getProductById(id);
        } catch (e) {
            throw new APIError(ErrorMap.get(ERROR_CODES.GENERIC_API_ERROR) || '', e.message, e);
        }

    }

    /**
     * TODO : can use a worker thread if we need to improve the perf impact
     * @param entries
     */
    async syncProductsFromCSV(entries: any[]) {

        try {
            await this.productDao .addProducts(entries.map((e) => {
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
