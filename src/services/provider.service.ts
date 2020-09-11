import { getManager, Repository, Any } from 'typeorm';
import { Gameslist } from '../entities/Gameslist';
import { Coverimg } from '../entities/Coverimg';
import * as fs from 'fs-extra';

export class ProviderService {
    gameslistRepository: Repository<Gameslist>;
    coverImgRepository: Repository<Coverimg>;
    constructor() {
        this.gameslistRepository = getManager().getRepository(Gameslist);
        this.coverImgRepository = getManager().getRepository(Coverimg);

    }


    async uploadImgFile(req): Promise<any> {
        const { gameName } = req.query;
        console.log("uploadImgFile name", gameName)
        const filename = req.file.filename
        const data = fs.readFileSync("/Users/apple/Desktop/compal/ProtalServer/src/uploads/" + filename)
        const res = await this.gameslistRepository
            .createQueryBuilder("GLR")
            .update(Gameslist)
            .set({
                imgData: data
            })
            .where("name = :name", { name: gameName })
            .execute();
        
        return Promise.resolve(true);
    }

    async sendImgFile(req): Promise<any> {
        const { filename } = req.query;
        const res: any = await this.coverImgRepository
            .createQueryBuilder("CI")
            .where("CI.name = :filename", { filename })
            .getOne()
        if (res) {
            const image = Buffer.from(res.data).toString('base64');
            return image
        }
    }

    async createNewGame(req): Promise<any> {
        const { name, descp, providerId = '001' } = req.body;
        const res = await this.gameslistRepository
            .createQueryBuilder("GLR").insert()
            .into(Gameslist)
            .values([{
                name,
                descp,
                providerId,
                lastUpdateTime: new Date() + "",
            }])
            .execute()
            .then(res => {
                console.log("res", res)
                res ? Promise.resolve(res) : Promise.reject();
            })
            .catch(err => {
                console.log("err", err)
            })
        return res;
    }


} 