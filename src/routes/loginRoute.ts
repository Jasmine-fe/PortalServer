import { Router } from 'express';
import * as login from '../controllers/login.controller';
export const LoginRouter: Router = Router();

LoginRouter.post('/login', login.userLoginJWT);
LoginRouter.post('/register', login.userRegister);
