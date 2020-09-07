import { getManager, Repository, Any } from 'typeorm';
import { Login } from '../entities/Login';
import * as expressJwt from 'express-jwt';
import * as jwt from 'jsonwebtoken';
import { generateAccessToken } from '../auth/auth';


/**
 * @swagger
 * definitions:
 *   Login:
 *     type: object
 *     properties:
 *       id:
 *          type: number
 *          description: id
 *       username:
 *          type: string
 *          description: username
 *       password:
 *          type: string
 *          description: password
 */
export class LoginService {
    loginRepository: Repository<Login>;

    constructor() {
        this.loginRepository = getManager().getRepository(Login);
    }

    /**
 * @swagger
 * /login:
 *   post:
 *     description: userLoginJWT
 *     tags:
 *       - login
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: login
 *         description: login info
 *         schema:
 *             type: object
 *             properties:
 *               username:
 *                  type: string
 *               password:
 *                  type: string
 *     responses:
 *       200:
 *         description: successfully userLoginJWT
 *         schema:
 *           $ref: '#/definitions/Login'
 */
    async userLoginJWT(req): Promise<any> {
        const { username, password } = req.body;
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        if (username && password) {
            const res = await getManager()
                .getRepository(Login)
                .findOne({ username: username })
            if (res && res.username) {
                const jwtToken = generateAccessToken(username);
                return Promise.resolve({ token: jwtToken });
            }
        }
        return Promise.reject();
    }

    async userRegister(req): Promise<any> {
        const { username } = req.body;
        const jwtToken = generateAccessToken(username);
        this.loginRepository
        .createQueryBuilder("login").insert()
        .into(Login)
        .values([{
            username,
        }])
        return Promise.resolve({token: jwtToken});
    }
}
