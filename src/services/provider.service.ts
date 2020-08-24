import { getManager, Repository, Any } from 'typeorm';
import { GameList } from '../entities/GameList';
import * as fs from 'fs-extra';

export class ProviderService {
    gameListRepository: Repository<GameList>;
    constructor() { }

    async uploadImgFile(req): Promise<any> {
        console.log("file", req.file)
    }

    async sendImgFile(req): Promise<any> {
        return "123"
    }


} 