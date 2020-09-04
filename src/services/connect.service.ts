import { getManager, Repository, Any } from 'typeorm';
import { Gaconnection } from '../entities/Gaconnection';

/**
 * @swagger
 * definitions:
 *   GaConnection:
 *     type: object
 *     properties:
 *       idconnection: 
 *          type: number
 *          description: id
 *       username: 
 *          type: string
 *          description: username
 *       gamename: 
 *          type: string
 *          description: gamename
 *       serverIp: 
 *          type: string
 *          description: serverIp
 *       status: 
 *          type: string
 *          description: status
 *       lstUpdateTime: 
 *          type: string
 *          description: lstUpdateTime
 *       pid: 
 *          type: string
 *          description: pid
 */


export class ConnectService {
    gaconnectionRepository: Repository<Gaconnection>;

    constructor() {
        this.gaconnectionRepository = getManager().getRepository(Gaconnection);
    }

 /**
 * @swagger
 * /ip:
 *   get:
 *     description: get connecting GameServer ip
 *     tags:
 *       - ip
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successfully get connecting GameServer ip
 *         schema:
 *           $ref: '#/definitions/GaConnection'
 */
    getConnectedGameServerIp = async (req) => {
        const { username } = req.query;
        console.log("username", username)
        const res = await getManager()
            .getRepository(Gaconnection)
            .createQueryBuilder("GSI")
            .orderBy({ "GSI.lastUpdateTime": "DESC" })
            .where("GSI.status = status", { status: 'TRUE' })
            .andWhere("GSI.username = username", { username: username })
            .getOne();
        console.log("lastIp", res)
        return res;
    }


    /**
 * @swagger
 * /ip/serverip:
 *   get:
 *     description: get connecting GameServer ip
 *     tags:
 *       - ip
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: username
 *         required: true
 *         type: string
 *       - in: body
 *         name: ip
 *         required: true
 *         type: string
 *       - in: body
 *         name: status
 *         required: true
 *         type: string
 *       - in: body
 *         name: pid
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successfully get connecting GameServer ip
 *         schema:
 *           type: object
 *           properties:
 *             ip: 
 *               type: string
 *               description: ip
 */
    async recordGameServerIp(req): Promise<any> {

        const { username, gamename, ip, status, pid="" } = req.body;
        this.gaconnectionRepository
        .createQueryBuilder("GSI").insert()
        .into(Gaconnection)
        .values([{
          username,
          gamename,
          serverIp: ip,
          status,
          pid,
          lstUpdateTime: new Date()+""
        }])
        .execute()
      }
}