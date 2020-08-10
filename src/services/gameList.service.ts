import { getManager, Repository } from 'typeorm';
import { GameList } from '../entities/GameList';

export class GameListService {

  gameListRepository: Repository<GameList>;

  constructor() {
    this.gameListRepository = getManager().getRepository(GameList);
  }

  /**
   * Returns array of all games from db
   */
  async getAllGameList(): Promise<GameList[]> {
    const req =  await this.gameListRepository.find();
    return req;
  }

  /**
   * Returns a user by given id
   */
//   async getById(id: string | number): Promise<User> {
//     this.logger.info('Fetching user by id: ', id);
//     if (id) {
//       return await this.gameListRepository.findOne(id);
//     }
//     return Promise.reject(false);
//   }
  
}