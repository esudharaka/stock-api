import express from 'express';
import url from "url";
import {ProductQueryParams} from "../common/interfaces/product.query";
import {CreateProductRequest} from "../common/interfaces/product.create.request";
import {ProductDto} from "../products/dto/product.dto";


const parseQueryParams = (req: express.Request) => {
    const url_parts = url.parse(req.url, true);
    return url_parts.query;
};

const createProductQueryObject = (req: express.Request) : ProductQueryParams => {
    const queryParams = parseQueryParams(req);
    const { slug } = queryParams;
    return {
        slug: slug ? slug.toString() : null,
    };
};

const createProductPutRequest = (req: express.Request, id: number) : ProductDto => {
    const payload = req.body;
    return {
        id: id,
        name: payload.name,
        sku: payload.sku,
        slug: payload.slug,
        brand: {
            id: payload.brandId
        },
    };
};


const createProductDtoFromRequest = (req: express.Request) : ProductDto => {
    const payload = req.body;
    return {
        name: payload.name,
        sku: payload.sku,
        slug: payload.slug,
        brand: {
            id: payload.brandId
        },
    };
};



export {
    parseQueryParams,
    createProductQueryObject,
    createProductPutRequest,
    createProductDtoFromRequest,
}

