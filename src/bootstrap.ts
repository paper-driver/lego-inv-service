import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import { transports } from "winston";
import { winstonOptions } from "./config/logging";
import { AppModule } from "./app.module";
import * as actuator from "express-actuator";
import * as cookieParser from "cookie-parser";

export async function bootstrap(): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger({
            transports: [
                new transports.Console(winstonOptions().console)
            ]
        }),
        abortOnError: false
    });
    app.use(actuator());
    app.use(cookieParser());
    return app;
}