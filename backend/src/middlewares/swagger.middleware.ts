import swaggerJsDoc from "swagger-jsdoc";

const { HOSTNAME, PORT } = process.env;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'EventBliss API',
            version: '1.0.0'
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ],
        servers: [{
            url: `${HOSTNAME}:${PORT}`
        }]
    },
    apis: ['../index.ts', '../routes/*.ts']
}

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
