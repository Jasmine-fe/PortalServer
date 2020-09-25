import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJSDoc from 'swagger-jsdoc';

export var router = express.Router();

// swagger
const options = {
    swaggerDefinition: {
        info: {
            title: 'Game',
            version: '1.0.0',
            description: 'Game API with Swagger doc',
        },
        tags: [
            {
                name: 'game',
                description: 'game API',
            },
            {
                name: 'connection',
                description: 'ip connection API',
            },
            {
                name: 'login',
                description: 'login API',
            },
        ],
        schemes: ['http'],
        host: 'localhost:3000',
        basePath: '/',
    },
    apis: ['src/services/*.service.ts'],
    
};
const swaggerSpec = swaggerJSDoc(options);
router.get('/json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("swaggerSpec", swaggerSpec)
    res.send(swaggerSpec);
  });
  
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  