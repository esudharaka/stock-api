
import {Sequelize, Model, DataTypes, Optional,
	STRING, INTEGER, DATE, NOW,
	BelongsToGetAssociationMixin} from "sequelize";


/**
 * TODO parameterize the DB configs
 */
const sequelizeInstance = new Sequelize(
	'PRODUCTS',
	'root',
	'root',
	{
		dialect: 'mysql',
		host: 'mysqldb',
		port: 3306,
		logging: false,
	}
);

export {
	sequelizeInstance,
	Sequelize,
	Optional,
	Model,
	STRING,
	INTEGER, DATE, NOW,
	DataTypes,
	BelongsToGetAssociationMixin,
}
