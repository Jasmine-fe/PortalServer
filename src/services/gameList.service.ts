import { getManager, Repository } from 'typeorm';
import { Gamelist } from '../entities/Gamelist';
import { Provider } from '../entities/Provider';
import { Gaconnection } from '../entities/Gaconnection';

/**
 * @swagger
 * definitions:
 *   Gamelist:
 *     type: object
 *     properties:
 *       id: 
 *          type: number
 *          description: id
 *       name: 
 *          type: string
 *          description: name
 *       imageUrl:
 *          type: string
 *          description: imageUrl
 *       descp: 
 *          type: string
 *          description: descp
 *       providerId: 
 *          type: string
 *          description: providerId
 *       lastUpdateTime:
 *          type: string
 *          description: lastUpdateTime
 *       gameId:
 *          type: string
 *          description: gameId
 *       configFile:
 *          type: string
 *          description: configFile
 *   Provider:
 *     type: object
 *     properties:
 *       id: 
 *          type: number
 *          description: id
 *       companyName: 
 *          type: string
 *          description: companyName
 *       companyTel:
 *          type: string
 *          description: companyTel
 *       companyLoc: 
 *          type: string
 *          description: companyLoc
 *       providerId: 
 *          type: string
 *          description: providerId
 */

export class GameListService {
  gameListRepository: Repository<Gamelist>;
  providerRepository: Repository<Provider>;
  gaConnectionRepository: Repository<Gaconnection>;

  constructor() {
    this.gameListRepository = getManager().getRepository(Gamelist);
    this.providerRepository = getManager().getRepository(Provider);
    this.gaConnectionRepository = getManager().getRepository(Gaconnection)
  }

/**
 * @swagger
 * /game/list:
 *   get:
 *     description: get game list
 *     tags:
 *       - game
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: successfully return all available game list
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Gamelist'
 */
  async getAllGameList(req): Promise<Gamelist[]> {
    const res =  await this.gameListRepository.find();
    return res;
  }


/**
 * @swagger
 * /game/content:
 *   get:
 *     description: get one game detail
 *     tags:
 *       - game
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: providerId
 *         required: true
 *         type: string
 *       - in: query
 *         name: gameId
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successfully return one game content
 *         schema:
 *           type: object
 *           properties:
 *             game: 
 *               type: object
 *               $ref: '#/definitions/Gamelist'
 *             provider:
 *               type: object
 *               $ref: '#/definitions/Provider'
 */
  async getGameContent(req): Promise<any> {
    const gameId = req.query.gameId
    const providerId = req.query.providerId
    if (gameId) {
      const game = await this.gameListRepository.findOne({gameId: gameId});
      const provider = await this.providerRepository.findOne({providerId: providerId});
      return { game: game, provider: provider };
    }
    return Promise.reject(false);
  }

  async getProcessingGames(req): Promise<any> {
    const res = await this.gameListRepository
    .createQueryBuilder("GLR")
    .leftJoinAndSelect(Gaconnection, "GAC", "GLR.name = GAC.gamename")
    .andWhere("GAC.status = status", { status: 'TRUE' })
    .getMany();

    if(res) {
      return { processingGames: res };
    }
    return  Promise.reject();
  }
}