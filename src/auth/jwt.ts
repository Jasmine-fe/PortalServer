import * as expressJwt from 'express-jwt';

export const jwt = function () {
    const secret = process.env.TOKEN_SECRET ;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            '/login',
            '/register'
        ]
    });
}