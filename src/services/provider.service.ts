import { getManager, Repository, Any } from 'typeorm';
import { GameList } from '../entities/GameList';
import { CoverImg } from '../entities/CoverImg';
import * as fs from 'fs-extra';

export class ProviderService {
    gameListRepository: Repository<GameList>;
    coverImgRepository: Repository<CoverImg>;
    constructor() { }

    async uploadImgFile(req): Promise<any> {
        const fileInfo = req.file;
        const name = fileInfo.originalname
        const filename = fileInfo.filename
        const type = fileInfo.mimetype
        const data = fs.readFileSync("/Users/apple/Desktop/compal/ProtalServer/src/uploads/" + filename)
        // console.log("name", name)
        // console.log("type", type)

        this.coverImgRepository
        .createQueryBuilder("CI").insert()
        .into(CoverImg)
        .values([{
            idCoverImg: 1,
            type,
            name,
            data
        }])
        .execute()
        .then(res => {
            console.log("res")
        })
    }

    async sendImgFile(req): Promise<any> {
        return "123"
    }


} 