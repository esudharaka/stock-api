import {Arg, Mutation, Query, Resolver} from "type-graphql";
import { UserInputError } from 'apollo-server';
import {ProductInfo, ProductInput} from '../schemas/product.query';
import ProductService from '../../services/products.service';
import { ProductQueryParams } from "../../../common/interfaces/product.query";
import { CreateProductResponse, ProductTO } from '../schemas/product.response';
import { ProductDto } from "../../dto/product.dto";


@Resolver(of => ProductInfo)
export class ProductResolver {

    @Query(returns => ProductInfo, { nullable: true })
    async returnProducts(): Promise<ProductInfo> {
        const pro : ProductQueryParams = {
            slug: null,
        };
        const productDto = await ProductService.list(pro);

        const savedProducts  = productDto.map((p) => {
            const pr : ProductTO = {
                brand: {
                    id: p.brand.id,
                    name: p.brand.name? p.brand.name : ''
                },
                slug: p.slug,
                sku: p.sku,
                id: p.id,
                name: p.name

            };
          return pr;
        });
        return {
            products: savedProducts,
        };
    }

    @Mutation(returns => CreateProductResponse)
    async addProduct(@Arg('productData') data: ProductInput): Promise<CreateProductResponse> {

        const { name , sku, slug, brand} = data;
        const productDto: ProductDto = {
            name,
            sku,
            slug,
            brand: {
                id: brand.id
            }
        };

        try {
            const productId = await ProductService.create(productDto);
            return  {
                id: productId
            };
        } catch (e) {
            throw new UserInputError(e.message, {
                code: e.code,
                additionalInfo: e.additionalInfo
            });
        }
        

    }
}