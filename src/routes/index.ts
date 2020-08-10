import { gameListRouter } from './gameRoute'

var cors = require('cors')
var express = require('express');

export var router = express.Router();
router.use(cors({origin: '*'}))

/* tslint:disable:no-unused-variable */
router.use('/game', gameListRouter);
