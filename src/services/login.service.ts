import { getManager, Repository, Any } from 'typeorm';
import { Login } from '../entities/Login';


export class LoginService {
    loginRepository: Repository<Login>;

    constructor() {
        this.loginRepository = getManager().getRepository(Login);
    }

    /**
       * check account
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
