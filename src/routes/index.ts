import { gameListRouter } from './gameRoute'
import { providerRouter } from './providerRouter'

var cors = require('cors')
var express = require('express');

export var router = express.Router();
router.use(cors({origin: '*'}))

/* tslint:disable:no-unused-variable */
router.use('/game', gameListRouter);
// router.use('/file', providerRouter);
