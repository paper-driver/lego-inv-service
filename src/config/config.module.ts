import { Module } from "@nestjs/common";
import { Config, loadConfiguration, loadDBConfig } from "./config";
import { TypeOrmModule } from "@nestjs/typeorm";

export const CONFIG = "CONFIGURATION_INJECTION_TOKEN";

@Module({
    providers: [
        {
            provide: CONFIG,
            useFactory: (): Config => loadConfiguration()
        }
    ],
    exports: [
        CONFIG
    ]
})
export class ConfigModule {}