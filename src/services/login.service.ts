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
        const username = req.body.username;
        if (username) {
            await getManager()
                .getRepository(Login)
                .findOne({ username: username })
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
