import {QueryParams} from "./product.query";

export interface CRUD {
    list: (queryParams: QueryParams) => Promise<any>;
    create: (resource: any) => Promise<any>;
    putById: (id: number, resource: any) => Promise<string>;
    readById: (id: string) => Promise<any>;
    deleteById: (id: number) => Promise<any>;
    // patchById: (id: string, resource: any) => Promise<string>;
}
