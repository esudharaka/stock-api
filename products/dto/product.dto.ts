import { BrandDto } from "./brand.dto";

export interface ProductDto {
    id?: number;
    name: string;
    slug: string;
    sku: string;
    brand: BrandDto;
}
