
// import Sequelize from 'sequelize';
import  { sequelizeInstance,  Optional, Model, STRING, INTEGER, DATE, NOW, DataTypes } from '../db.init';



export interface BrandAttributes {
    ID: number;
    NAME: string;
    CREATED_DATE_TS: Date,
    UPDATED_DATE_TS: Date,
}

export interface BrandCreationAttributes extends Optional<BrandAttributes, "ID"> {}

export interface BrandInstance
    extends Model<BrandAttributes, BrandCreationAttributes>,
        BrandAttributes {}



export const Brand = sequelizeInstance.define<BrandInstance>("BRAND", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NAME: {
        type: DataTypes.STRING(255)
    },
    CREATED_DATE_TS: {
        type: DataTypes.DATE,
    },
    UPDATED_DATE_TS: {
        type: DataTypes.DATE,
        defaultValue: NOW
    }
}, {
    tableName: 'BRAND',
    createdAt: 'CREATED_DATE_TS',
    updatedAt: 'UPDATED_DATE_TS',
});

