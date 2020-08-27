import { getManager, Repository, Any } from 'typeorm';
import { Login } from '../entities/Login';

/**
   * check account
   */
export const checkLogin = async (req) => {
    const username = req.body.username;
    const userInfo = await getManager()
    .getRepository(Login)
    .createQueryBuilder("lg")
    .where("lg.username = username", username )
    .getOne();
    return userInfo;
} 
