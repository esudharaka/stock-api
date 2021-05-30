
import  {
    sequelizeInstance,
    Optional,
    Model,
    NOW,
    DataTypes,
    } from '../db.init';
import {Brand, BrandInstance} from './brand.model';



export interface ProductAttributes {
    ID: number;
    NAME: string;
    SLUG: string | null;
    SKU: string | null;
    BRAND_ID: number,
    CREATED_DATE_TS: Date,
    UPDATED_DATE_TS: Date,
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "ID"> {}

export interface ProductInstance
    extends Model<ProductAttributes, ProductCreationAttributes>,
        ProductAttributes {
    brand: BrandInstance;
}



export const Product = sequelizeInstance.define<ProductInstance>("PRODUCT", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NAME: {
        type: DataTypes.STRING(255)
    },
    SLUG: {
        type: DataTypes.STRING(30)
    },
    SKU: {
        type: DataTypes.STRING(20)
    },
    BRAND_ID: {
        type: DataTypes.INTEGER
    },
    CREATED_DATE_TS: {
        type: DataTypes.DATE,
    },
    UPDATED_DATE_TS: {
        type: DataTypes.DATE,
        defaultValue: NOW
    },

}, {
    tableName: 'PRODUCT',
    createdAt: 'CREATED_DATE_TS',
    updatedAt: 'UPDATED_DATE_TS',
});

Product.belongsTo(Brand, {
    foreignKey: 'BRAND_ID',
    targetKey: 'ID',
    as: 'brand'

});