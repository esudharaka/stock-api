import { ProductDto } from '../dto/product.dto';
import { Product, ProductInstance } from "../../db/models/product.model";
import { Brand } from "../../db/models/brand.model";
import { BrandDto } from "../dto/brand.dto";
import { DBError } from "../../common/exceptions/api.exception";
import { ERROR_CODES, ErrorMap } from "../../common/error.map";



const extractProductsFromDbResults = (result: Array<ProductInstance>) => {
    return result.map((product) => {
        const brand: BrandDto = {
            id: product.brand.ID,
            name: product.brand.NAME
        };
        const productDto: ProductDto = {
            id: product.ID,
            name: product.NAME,
            sku: product.SKU!,
            slug: product.SLUG!,
            brand: brand
        };
        return productDto;
    });
};

export  class ProductsDao {
    constructor() {
    }

    async addProduct(productDto: ProductDto) : Promise<any> {

        try {
            const createdProduct = await Product.create( {
                NAME: productDto.name,
                BRAND_ID: productDto.brand.id,
                SKU: productDto.sku,
                SLUG: productDto.slug,
                CREATED_DATE_TS: new Date(),
                UPDATED_DATE_TS: new Date(),
            });

            return createdProduct.ID;
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new DBError(
                    ErrorMap.get(ERROR_CODES.DUPLICATE_ENTRIES) || '', ERROR_CODES.DUPLICATE_ENTRIES,
                    e.sqlMessage);
            } else {
                throw new DBError(
                    ErrorMap.get(ERROR_CODES.GENERIC_DB_ERROR) || '', ERROR_CODES.DUPLICATE_ENTRIES,
                    e.sqlMessage);
            }
        }


    }

    async addProducts(productDots: ProductDto[]): Promise<any> {
        try {
            return Product.bulkCreate( productDots.map((productDto: ProductDto) => {
                return {
                    NAME: productDto.name,
                    BRAND_ID: productDto.brand.id,
                    SKU: productDto.sku,
                    SLUG: productDto.slug,
                    CREATED_DATE_TS: new Date(),
                    UPDATED_DATE_TS: new Date(),
                }
            }));
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
                throw new DBError(
                    ErrorMap.get(ERROR_CODES.DUPLICATE_ENTRIES) || '', ERROR_CODES.DUPLICATE_ENTRIES,
                    e.sqlMessage);
            } else {
                throw new DBError(
                    ErrorMap.get(ERROR_CODES.GENERIC_DB_ERROR) || '', ERROR_CODES.DUPLICATE_ENTRIES,
                    e.sqlMessage);
            }
        }

    }

    /**
     * TODO configure the logger to log the queries and remove the console log
     */
    async getAllProducts() {
        const products = await Product.findAll({
            include: [
                {
                    model: Brand, as: "brand",
                }],
            logging: console.log
        });
        return extractProductsFromDbResults(products);
    }

    async getProductById(userId: string) {
        const products = await Product.findAll({
            where: {
                ID: userId
            },
            include: [
                {
                    model: Brand, as: "brand",
                }],
            logging: console.log
        });
        const productDtos = extractProductsFromDbResults(products);
        return productDtos.length >=1 ? productDtos[0] : null;
    }

    async getProductBySlug(slug: string) {
        const products = await Product.findAll({
            where: {
                SLUG: slug
            },
            include: [
                {
                    model: Brand, as: "brand",
                }],
            logging: console.log
        });
        return  extractProductsFromDbResults(products);
    }

    async updateProduct(productId: number, product: ProductDto) {
        try {
            const result = await Product.update(
                {
                    NAME: product.name,
                    SLUG: product.slug,
                    SKU: product.sku,
                    BRAND_ID: product.brand.id
                },
                { where: { ID: productId } }
            );
            return result; 
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new DBError(
                    ErrorMap.get(ERROR_CODES.DUPLICATE_ENTRIES) || '', ERROR_CODES.DUPLICATE_ENTRIES,
                    e.sqlMessage);
            } else if (e.name === 'SequelizeForeignKeyConstraintError') {
                throw new DBError(
                    ErrorMap.get(ERROR_CODES.FOREIGN_KEY_CONSTRAINTS) || '', ERROR_CODES.FOREIGN_KEY_CONSTRAINTS,  e.sqlMessage);

            } else {
                throw new DBError(
                    ErrorMap.get(ERROR_CODES.GENERIC_DB_ERROR) || '', ERROR_CODES.DUPLICATE_ENTRIES,
                    e.sqlMessage);
            }

        }

        
    }


    async deleteProductById(productId: number) {
        const result = await Product.destroy({
            where: {
                ID: productId
            }
        });
        return  result;
    }

}

export default new ProductsDao();
