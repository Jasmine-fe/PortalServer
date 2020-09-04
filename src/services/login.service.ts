import { getManager, Repository, Any } from 'typeorm';
import { Login } from '../entities/Login';

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
 *     description: checkLogin
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
 *         description: successfully checkLogin
 *         schema:
 *           $ref: '#/definitions/Login'
 */
    async checkLogin(req): Promise<any> {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const res = await getManager()
                .getRepository(Login)
                .findOne({ username: username, password: password })
            if (res && res.username) {
                return res;
            } else {
                return Promise.reject();
            }

        }
        else {
            return Promise.reject();
        }
    }
}
