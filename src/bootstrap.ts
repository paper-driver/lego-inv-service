import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import { transports } from "winston";
import { winstonOptions } from "./config/logging";
import { AppModule } from "./app.module";
import * as actuator from "express-actuator";
import * as cookieParser from "cookie-parser";
import { Exception } from "./dtos/exception.dto";
import { ErrorEnum } from "./models/error.model";

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
    app.useGlobalPipes(new ValidationPipe({
        exceptionFactory: (errors) => {
            console.log(errors)
          const result = errors.map((error) => ({
            property: error.property,
            message: error.constraints[Object.keys(error.constraints)[0]],
          }));
          return new Exception(HttpStatus.BAD_REQUEST, {
            errorType: ErrorEnum.BAD_REQUEST,
            res: JSON.stringify(result),
            log: JSON.stringify(result)
          });
        },
        stopAtFirstError: true,
      }));
    return app;
}