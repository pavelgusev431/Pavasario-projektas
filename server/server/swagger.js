import swaggerAutogen from 'swagger-autogen';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const routers = path.join(__dirname, '..', 'routers');

const outputFile = './swagger_output.json';
const endpointsFiles = fs
    .readdirSync(routers)
    .map((router) => `../routers/${router}`);

swaggerAutogen(outputFile, endpointsFiles);

console.log('\x1b[32mCreated api docs\x1b[0m');
