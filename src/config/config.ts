import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { getEnv } from "./getEnv"
import { config as dotEnvConfig } from 'dotenv';

export interface Config {
    appPort: number,
    dataSource?: TypeOrmModuleOptions
}

export function configEnvvariables(): void {
    const env = process.env.ENV_PROFILE ? process.env.ENV_PROFILE : ".env"
    console.log(`Using ${env} to load the environment`);
    dotEnvConfig({ path: env });
}

export function loadDBConfig(key: string): TypeOrmModuleOptions {
    return {
        type: getEnv.getEnvString(`dataSource.${key}.type`) as any,
        host: getEnv.getEnvString(`dataSource.${key}.host`),
        port: getEnv.getEnvNum(`dataSource.${key}.port`),
        username: getEnv.getEnvString(`dataSource.${key}.username`),
        password: getEnv.getEnvString(`dataSource.${key}.password`),
        database: getEnv.getEnvString(`dataSource.${key}.database`),
        entities: [__dirname + `/**/*.${key}.entity{.ts,.js}`],
        autoLoadEntities: getEnv.getEnvBoolean(`dataSource.${key}.autoLoadEntities`, true) || false,
        charset: getEnv.getEnvString(`dataSource.${key}.charset`, true),
        synchronize: getEnv.getEnvBoolean(`dataSource.${key}.synchronize`),
        logging: getEnv.getEnvBoolean(`dataSource.${key}.logging`, true),
        keepConnectionAlive: getEnv.getEnvBoolean(`dataSource.${key}.keepConenction`, true)
    }
}

export function loadConfiguration(): Config {
    const appPortEnvVar = getEnv.getEnvString('PORT', true);
    return {
        appPort: appPortEnvVar ? Number(appPortEnvVar) : 3030,
        dataSource: loadDBConfig("legoInv")
    }
}