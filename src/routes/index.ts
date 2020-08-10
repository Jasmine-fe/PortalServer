import { gameListRouter } from './gameRoute'

var express = require('express');
export var router = express.Router();

/* tslint:disable:no-unused-variable */
router.get('/', gameListRouter);
