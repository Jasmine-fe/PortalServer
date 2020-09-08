import { getManager, Repository, Any } from 'typeorm';
import { Login } from '../entities/Login';
import { generateAccessToken } from '../auth/auth';
import * as expressJwt from 'express-jwt';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';


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
        const userInfo: any = await getManager()
            .getRepository(Login)
            .findOne({ username })
        const validateResult = await bcrypt.compare(password, userInfo.password)
        if (validateResult) {
            const jwtToken = generateAccessToken(username);
            return Promise.resolve({ token: jwtToken });
        }
        else {
            return Promise.reject();
        }

    }

    async userRegister(req): Promise<any> {
        const { username, password } = req.body;

        const jwtToken = generateAccessToken(username);
        this.loginRepository
        .createQueryBuilder("login").insert()
        .into(Login)
        .values([{
            username,
            password
        }])
        .execute()

        return Promise.resolve({token: jwtToken});
    }
}
