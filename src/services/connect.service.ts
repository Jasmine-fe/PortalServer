import { getManager, Repository, Any } from 'typeorm';
import { Gaconnection } from '../entities/Gaconnection';

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
 *           type: object
 *           properties:
 *             ip: 
 *               type: string
 *               description: ip
 */
    getConnectedGameServerIp = async (res) => {
        const { username } = res.query;

        const lastIp = await getManager()
            .getRepository(Gaconnection)
            .createQueryBuilder("GSI")
            .orderBy({ "GSI.lastUpdateTime": "DESC" })
            .where("GSI.status = status", { status: 'on' })
            .andWhere("GSI.username = username", { username: username })
            .getOne();

        return lastIp;
    }


    /**
 * @swagger
 * /ip/serverIp:
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