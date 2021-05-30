import * as winston from "winston";

/**
  TODO Configure file appender
 */
export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});