import { Field, ObjectType, InputType } from 'type-graphql';
import { ProductTO} from './product.response';

@ObjectType()
export class ProductInfo {
    constructor( productDtos: ProductTO[]) {
        this.products = productDtos;

    }
    @Field(() =>[ProductTO!])
    products: ProductTO[];

}


@InputType()
export class BrandInput {
    constructor(id: number) {
        this.id = id;
    }
    @Field()
    id: number;
}

@InputType()
export class ProductInput {

    constructor(name: string, slug: string, sku: string, brand: BrandInput) {
        this.name = name;
        this.slug = slug;
        this.sku = sku;
        this.brand = brand;
    }

    @Field()
    name: string;

    @Field()
    slug: string;

    @Field()
    sku: string;

    @Field()
    brand: BrandInput;
}

