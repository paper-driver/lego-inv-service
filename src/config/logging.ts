import * as winston from 'winston';
import {transports} from "winston";
import { getEnv } from './getEnv';

const {format} = winston;

const LOG_LEVEL_ENV_NAME = 'log-level';

interface WinstonOptions {
    console: winston.LoggerOptions;
}

function getStandardFormats(): winston.Logform.Format[] {
    return [
        format.json(),
    ];
}

export function winstonOptions(): WinstonOptions {
    function getFormats() {
        return getStandardFormats();
    }

    return {
        console: {
            level: getEnv.getEnvString(LOG_LEVEL_ENV_NAME, true) ? getEnv.getEnvString(LOG_LEVEL_ENV_NAME, true) : 'info',
            handleExceptions: true,
            format: format.combine(...getFormats()),
        }
    };
}

export function configureDefaultLogger(): void {
    winston.configure({
        transports: [
            new transports.Console(winstonOptions().console)
        ]
    });
}

function configureFallbackLogger(): void {
    winston.configure({
        transports: [
            new transports.Console({
                level: 'info',
                handleExceptions: true,
                format: format.combine(...getStandardFormats())
            })
        ]
    });
}

interface Configuration {
    logLevel: string;
}

const getConfiguration: () => Configuration = () => {
    return {
        logLevel: getEnv.getEnvString('log-level', true)
    };
}

export default getConfiguration;
