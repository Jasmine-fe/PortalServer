import { getManager, Repository, Any } from 'typeorm';
import { GameList } from '../entities/GameList';
import { Provider } from '../entities/Provider';
import { GameServerIp } from '../entities/GameServerIp';

export class GameListService {

  gameListRepository: Repository<GameList>;
  providerRepository: Repository<Provider>;
  gameServerIp: Repository<GameServerIp>;

  constructor() {
    this.gameListRepository = getManager().getRepository(GameList);
    this.providerRepository = getManager().getRepository(Provider);
    this.gameServerIp = getManager().getRepository(GameServerIp)
  }

  /**
   * Returns array of all games from gameList table
   */
  async getAllGameList(req): Promise<GameList[]> {
    const res =  await this.gameListRepository.find();
    return res;
  }

  /**
   * Returns game content by providerId
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

  async recordGameServerIp(req): Promise<any> {
    const serverIp = req.query.gameServerIp
    const status = req.query.status
    this.gameServerIp
    .createQueryBuilder("GSI").insert()
    .into(GameServerIp)
    .values([{
      ip: serverIp,
      lastUpdateTime: new Date()+"",
      status: status
    }])
    .execute()
  }
  
}