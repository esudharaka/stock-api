import ProductsDao from '../daos/products.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { ProductDto } from '../dto/product.dto';
import { ProductQueryParams, QueryParams } from "../../common/interfaces/product.query";

class ProductService implements CRUD {
    async create(resource: ProductDto) {
        return ProductsDao.addProduct(resource);
    }

    async deleteById(id: number) {
        return ProductsDao.deleteProductById(id);
    }

    async list(query: QueryParams) {
        const markerSymbolInfo = <ProductQueryParams> query;
        const searchBySlug = markerSymbolInfo.slug;
        // TODO fix
        if ( searchBySlug ) {
            return ProductsDao.getProductBySlug(searchBySlug.toString());
        } else {
            return ProductsDao.getAllProducts();
        }

    }

    async putById(id: number, resource: ProductDto): Promise<any> {
        return ProductsDao.updateProduct(id, resource);
    }

    async readById(id: string) {
        return ProductsDao.getProductById(id);
    }

}

export default new ProductService();
