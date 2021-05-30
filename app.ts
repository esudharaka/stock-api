import "reflect-metadata";
import express from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from 'cors';
import { RouterConfigs } from './common/routerConfigs';
import { ProductsRoutes } from './products/products.routes.config';
import { logger } from './utils\/app.logger'
import { ProductResolver } from "./grapql/resolvers/product.resolver";



const configureServer = async ()=> {
    const app: express.Application = express();
    const port = 3000;
    const routes: Array<RouterConfigs> = [];

    /**
     * Configure logger for express to log the requests
     */
    const loggerOptions: expressWinston.LoggerOptions = {
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.prettyPrint(),
            winston.format.colorize({ all: true })
        ),
    };

    if (!process.env.DEBUG) {
        loggerOptions.meta = false;
    }



    app.use(express.json());
    app.use(cors());
    const schema = await buildSchema({
        resolvers: [ProductResolver],
        emitSchemaFile: true
    });

    app.use(expressWinston.logger(loggerOptions));

// Registering the routes
    routes.push(new ProductsRoutes(app));

    const runningMessage = `Server Running`;
    app.get('/', (req: express.Request, res: express.Response) => {
        res.status(200).send(runningMessage)
    });


    const server = new ApolloServer({
        schema
    });
    server.applyMiddleware({ app });
    app.listen(port, () => {
        routes.forEach((route: RouterConfigs) => {
            logger.info(`Routes configured for ${route.getName()}`);
        });
    });
};
configureServer();