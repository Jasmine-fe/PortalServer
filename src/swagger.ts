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
        ],
        schemes: ['http'],
        host: '54.146.78.28:3000',
        basePath: '/game',
    },
    apis: ['./controllers/gameList.controller.ts'],
};
const swaggerSpec = swaggerJSDoc(options);
router.get('/json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  