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
 *       loginTime:
 *          type: string
 *          description: loginTime
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
 *   get:
 *     description: checkLogin
 *     tags:
 *       - login
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: username
 *         required: true
 *         type: string
 *       - in: query
 *         name: password
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successfully checkLogin
 *         schema:
 *           type: object
 *           properties:
 *             game: 
 *               type: object
 *               $ref: '#/definitions/Login'
 */
    async checkLogin(req): Promise<any> {
        // login
        const username = req.body.username;
        const password = req.body.password;
        if (username) {
            await getManager()
                .getRepository(Login)
                .findOne({ username: username, password: password })
                .then((res: any) => {
                    console.log("Res", res)
                    if (res) {
                        return res;
                    }
                    else {
                        return Promise.reject();
                    }
                })
        }
        else {
            return Promise.reject();
        }
    }
}
