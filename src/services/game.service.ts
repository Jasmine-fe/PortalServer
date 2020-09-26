import { getManager, Repository } from 'typeorm';
import { Gameslist } from '../entities/Gameslist';
import { Provider } from '../entities/Provider';
import { Gaconnection } from '../entities/Gaconnection';
import { gameModel } from '../models/game.model'
import * as fs from 'fs-extra';


/**
 * @swagger
 * definitions:
 *   Gameslist:
 *     type: object
 *     properties:
 *       gameId: 
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
 *       configFile:
 *          type: string
 *          description: configFile
 *       excuteMode:
 *          type: string
 *          description: excuteMode
 *       filename:
 *          type: string
 *          description: filename
 *       imgPath:
 *          type: string
 *          description: imgPath
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

export class GameService {
  gameslistRepository: Repository<Gameslist>;
  providerRepository: Repository<Provider>;
  gaConnectionRepository: Repository<Gaconnection>;

  constructor() {
    this.gameslistRepository = getManager().getRepository(Gameslist);
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
 *           $ref: '#/definitions/Gameslist'
 */
  async getAllGameslist(req): Promise<Gameslist[]> {
    const res = await this.gameslistRepository.find();

    var gamesData: any[] = []
    await res.forEach(element => {
      const readFileData = element ? fs.readFileSync(element.imgPath) : "";
      const image = Buffer.from(readFileData).toString('base64');
      gamesData.push({ base64Img: image, ...element })
    });
    return gamesData;
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
 *               $ref: '#/definitions/Gameslist'
 *             provider:
 *               type: object
 *               $ref: '#/definitions/Provider'
 */
  async getGameContent(req): Promise<any> {
    const gameId = req.query.gameId
    const providerId = req.query.providerId
    if (gameId) {
      const game = await this.gameslistRepository.findOne({gameId: gameId});
      const provider = await this.providerRepository.findOne({providerId: providerId});
      return { game: game, provider: provider };
    }
    return Promise.reject(false);
  }

/**
 * @swagger
 * /progress/list:
 *   get:
 *     description: get progress games list
 *     tags:
 *       - game
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: successfully return progress games list
 *         schema:
 *           type: object
 *           items:
 *             oneOf:
 *               - $ref: '#/definitions/GaConnection'
 *               - $ref: '#/definitions/Gameslist'
 */
  async getProcessingGames(req): Promise<any> {
    const list =  await this.gameslistRepository.find();
    const connectGames = await this.gaConnectionRepository
    .createQueryBuilder('GAC')
    .where('GAC.status = :status', { status: 'TRUE' })
    .leftJoin(Gameslist, 'GLR', 'GAC.gamename = GLR.name')
    .getMany();

    const res = await gameModel(list, connectGames);
    if(list && connectGames) {
      return { processingGames: res };
    }
    return  Promise.reject();
  }


/**
 * @swagger
 * /progress/ip:
 *   get:
 *     description: get the progress game ip
 *     tags:
 *       - game
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: successfully get the progress game ip
 *         schema:
 *           type: object
 *           $ref: '#/definitions/GaConnection'
 */
  async getProcessingGameIp(req): Promise<any> {
    const { gameId } = req.query
    const res = await getManager()
      .getRepository(Gaconnection)
      .createQueryBuilder("GAC")
      .select(['GAC.serverIp', 'GAC.username'])
      .orderBy({ "GAC.lastUpdateTime": "DESC" })
      .where("GAC.gameId = :gameId", { gameId: gameId })
      .andWhere("GAC.status = status", { status: 'TRUE' })
      .getOne();
    if(res) {
      return { processingGame: res };
    }
    return  Promise.reject();
  }



  /**
 * @swagger
 * /progress/info:
 *   get:
 *     description: get the progress game ip
 *     tags:
 *       - game
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
 *         description: successfully get the progress game ip
 *         schema:
 *           type: object
 *           properties:
 *             game: 
 *               type: object
 *               $ref: '#/definitions/GaConnection'
 *             provider:
 *               type: object
 *               $ref: '#/definitions/Gameslist'
 */
  async getProcessingGameInfo(req): Promise<any> {
    const { username } = req.query;
    const progressingInfo = await this.gaConnectionRepository
      .createQueryBuilder("GAC")
      .orderBy({ "GAC.lastUpdateTime": "DESC" })
      .where("GAC.username = :username", { username: username })
      .andWhere("GAC.status = :status", { status: 'TRUE' })
      .getOne();

    if( progressingInfo && progressingInfo.idconnection) {
      const gameInfo = await this.gameslistRepository.findOne({ gameId: progressingInfo.gameId });
      return { progressingInfo, gameInfo };
    }
    return Promise.reject();
  }
}