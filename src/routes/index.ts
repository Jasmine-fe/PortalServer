import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJSDoc from 'swagger-jsdoc';
import { gameListRouter } from './gameRoute'
import { providerRouter } from './providerRouter'
import { LoginRouter } from './loginRoute';
import { connectRouter } from './connectRoute';

var cors = require('cors')
var express = require('express');

export var router = express.Router();
router.use(cors({origin: '*'}))

/* tslint:disable:no-unused-variable */

router.use('/', LoginRouter);
router.use('/ip', connectRouter);
router.use('/game', gameListRouter);

// router.use('/file', providerRouter);
