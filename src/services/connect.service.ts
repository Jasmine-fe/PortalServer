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
 *       lastUpdateTime: 
 *          type: string
 *          description: lastUpdateTime
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
        const res = await getManager()
            .getRepository(Gaconnection)
            .createQueryBuilder("GSI")
            .orderBy({ "GSI.lastUpdateTime": "DESC" })
            .where("GSI.status = :status", { status: 'TRUE' })
            .andWhere("GSI.username = username", { username: username })
            .getOne();
        console.log("lastIp", res)
        return res;
    }

    async updateConnectStatus(req): Promise<any> {
        const { ip, status } = req.body;
        console.log("ip",ip, "status", status)
        // error
        const res = await this.gaconnectionRepository
            .createQueryBuilder("GAC")
            .update(Gaconnection)
            .set({
                status: status
            })
            .where("status = :status", { status: 'TRUE' })
            .execute();

            
        return Promise.resolve(true);
    }



    /**
 * @swagger
 * /ip/serverip:
 *   get:
 *     description: record game server ip
 *     tags:
 *       - ip
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: gameServerIp
 *         description: game server ip
 *         schema:
 *             type: object
 *             properties:
 *               username:
 *                  type: string
 *               ip:
 *                  type: string
 *               status:
 *                  type: string
 *               pid:
 *                  type: string
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

        const { username, gamename, ip, status, gameId, pid="" } = req.body;
        this.gaconnectionRepository
        .createQueryBuilder("GSI").insert()
        .into(Gaconnection)
        .values([{
          username,
          gamename,
          gameId,
          serverIp: ip,
          status,
          pid,
          lastUpdateTime: new Date()+""
        }])
        .execute()

        return ip;
      }

    

    
    async endGameConnection(req): Promise<any> {
        const { } = req.body;
    
    }
       
}