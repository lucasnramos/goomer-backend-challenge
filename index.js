import { createRequire } from 'module';
const required = createRequire(import.meta.url);
required('ts-node/register');
required('./src/server.ts');
