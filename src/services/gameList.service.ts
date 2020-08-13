import { getManager, Repository, Any } from 'typeorm';
import { GameList } from '../entities/GameList';
import { Provider } from '../entities/Provider';

export class GameListService {

  gameListRepository: Repository<GameList>;
  providerRepository: Repository<Provider>;

  constructor() {
    this.gameListRepository = getManager().getRepository(GameList);
    this.providerRepository = getManager().getRepository(Provider);
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
  
}