import { getManager, Repository, Any } from 'typeorm';
import { Gameslist } from '../entities/Gameslist';
import { Coverimg } from '../entities/Coverimg';
import * as fs from 'fs-extra';

export class ProviderService {
    gameslistRepository: Repository<Gameslist>;
    coverImgRepository: Repository<Coverimg>;
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
        .into(Coverimg)
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