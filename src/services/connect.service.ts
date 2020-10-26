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
 * /connection:
 *   get:
 *     description: get connecting GameServer ip
 *     tags:
 *       - connection
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

/**
 * @swagger
 * /connection/status:
 *   post:
 *     description: update game connect status
 *     tags:
 *       - connection
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
 *               ip:
 *                  type: string
 *               pid:
 *                  type: string
 *     responses:
 *       200:
 *         description: successfully update game connect status
 *         schema:
 *           $ref: '#/definitions/GaConnection'
 */
    async updateConnectStatus(req): Promise<any> {
        const { ip: serverIp, pid } = req.body;
 
        const res = await this.gaconnectionRepository
            .createQueryBuilder()
            .update(Gaconnection)
            .set({ status: "FALSE" })
            .where("status = :status AND serverIp = :serverIp", { status: 'TRUE', serverIp })
            .orderBy("lastUpdateTime", "DESC")
            .limit(1)
            .execute();
            
        return Promise.resolve(true);
    }



    /**
 * @swagger
 * /connection/recordip:
 *   post:
 *     description: record game server ip
 *     tags:
 *       - connection
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
 *               gamename:
 *                  type: string
 *               ip:
 *                  type: string
 *               gameId:
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
        const { username, gamename, ip: serverIp, gameId, pid="" } = req.body;
        this.gaconnectionRepository
        .createQueryBuilder("GSI").insert()
        .into(Gaconnection)
        .values([{
          username,
          gamename,
          gameId,
          pid,
          lastUpdateTime: new Date(),
          serverIp: serverIp,
          status: "TRUE",
        }])
        .execute()

        return serverIp;
    }

}