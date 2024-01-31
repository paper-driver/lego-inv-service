export class GetEnv {
    private sources: VariableSource[];

    constructor() {
        this.sources = [new EnvironmentSource()];
    }

    getEnvArray(envname: string, isOptional: boolean = false): string[] {
        return this.getEnvString(envname, isOptional)?.trimStart()?.trimEnd()?.split(/[,]*/);
    }

    getEnvString(envname: string, isOptional: boolean = false): string {
        for (const source of this.sources) {
            const variable = source.getVariable(envname);
            if(variable !== undefined) {
                return variable;
            }
        }
        if (!isOptional) {
            throw new Error(`${envname} not set`);
        }
    }

    getEnvNum(envname: string): number {
        const stringVal = this.getEnvString(envname, false);
        return Number(stringVal);
    }

    getEnvBoolean(envname: string, isOptional: boolean = false): boolean {
        return /^true$/i.test(this.getEnvString(envname, isOptional));
    }
}

export interface VariableSource {
    getVariable(varName: string): string;
    sourceName: string;
}

export class EnvironmentSource implements VariableSource {
    sourceName = 'environment';
    getVariable(varName: string): string {
        return process.env[varName];
    }
}

export const getEnv = new GetEnv();