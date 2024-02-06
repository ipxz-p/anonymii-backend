import swaggerJSDoc from 'swagger-jsdoc';
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Document',
            version: '1.0.0',
            description: "Simple api doc"
        },
        servers: [
            {
                url: "http://localhost:3500"
            }
        ],
    },
    apis: [
        "./routes/*.js"
    ]
}
export const swaggerSpec = swaggerJSDoc(swaggerOptions)