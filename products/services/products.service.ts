import fs from 'fs';
import csv from 'csv-parser';
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

    /**
     * TODO : can use a worker thread if we need to improve the perf impact
     * @param fileLocation
     */
    syncProductsFromCSV(fileLocation: string) {
        const results : any[] = [];
        fs.createReadStream(fileLocation)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                console.log(results);
                const result = await ProductsDao.addProducts(results.map((r) => {
                    const productDto: ProductDto = {
                        name: r.NAME,
                        sku: r.SKU,
                        slug: r.SLUG,
                        brand: {
                            id: r.BRAND_ID
                        }
                    };
                    return productDto;
                }));
            });
    }

}

export default new ProductService();
