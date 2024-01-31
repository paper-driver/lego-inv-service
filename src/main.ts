import {config as configure_environment} from 'dotenv';
import { configureDefaultLogger } from './config/logging';
import { bootstrap } from './bootstrap';
import { getEnv } from './config/getEnv';


const env = process.env.ENV_PROFILE ? process.env.ENV_PROFILE : ".env"
console.log(`Using ${env} to load the environment`);
configure_environment({ path: env });
configureDefaultLogger();

const PORT: number = getEnv.getEnvNum("PORT") || 3030;

async function init() {
  const app = await bootstrap();
  await app.listen(PORT);
}
init();