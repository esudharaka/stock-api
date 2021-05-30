export interface QueryParams {

}
export interface CreateProductRequest  extends QueryParams {
    name: string,
    slug: string,
    sku: string,
    brandId: number,
}
