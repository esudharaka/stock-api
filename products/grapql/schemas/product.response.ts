import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class BrandTO {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    @Field()
    id: number;

    @Field()
    name: string;
}
@ObjectType()
export class ProductTO {
    constructor(id: number, name: string, slug: string, sku: string, brand: BrandTO) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.sku = sku;
        this.brand = brand;
    }
    @Field()
    id?: number;

    @Field()
    name: string;

    @Field()
    slug: string;

    @Field()
    sku: string;

    @Field()
    brand: BrandTO;
}

@ObjectType()
export class CreateProductResponse {
    constructor(id: number) {
        this.id = id;
    }

    @Field()
    id: number;

}