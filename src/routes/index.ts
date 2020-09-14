import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJSDoc from 'swagger-jsdoc';
import { gameRouter } from './gameRoute'
import { providerRouter } from './providerRouter'
import { LoginRouter } from './loginRoute';
import { connectRouter } from './connectRoute';

var cors = require('cors')
var express = require('express');

export var router = express.Router();
router.use(cors({origin: '*'}))

/* tslint:disable:no-unused-variable */

router.use('/user', LoginRouter);
router.use('/connection', connectRouter);
router.use('/game', gameRouter);
router.use('/provider', providerRouter);
