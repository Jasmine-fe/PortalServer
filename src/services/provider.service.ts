import { getManager, Repository, Any } from 'typeorm';
import { Gameslist } from '../entities/Gameslist';
import * as fs from 'fs-extra';
import * as unzipper from 'unzipper';

export class ProviderService {
    gameslistRepository: Repository<Gameslist>;
    constructor() {
        this.gameslistRepository = getManager().getRepository(Gameslist);
    }


    async uploadImgFile(req): Promise<any> {
        const { gameName } = req.query;
        const filename = req.file.filename




        
        // const data = fs.readFileSync("src/uploads/" + filename)

        
        // const res = await this.gameslistRepository
        //     .createQueryBuilder("GLR")
        //     .update(Gameslist)
        //     .set({
        //         imgPath: req.file.path
        //     })
        //     .where("name = :name", { name: gameName })
        //     .execute();
        
        return Promise.resolve(true);
    }

    uploadZipFile(req): Promise<any> {
        return Promise.resolve(true);
    }
    
    async getImgFile(req): Promise<any> {
        const { gameName } = req.query;
        const res = await this.gameslistRepository
            .createQueryBuilder("GLR")
            .where("GLR.name = :gameName", { gameName })
            .getOne()
        const readFileData = res ? fs.readFileSync(res.imgPath) : "";
        const image = Buffer.from(readFileData).toString('base64');
        return Promise.resolve(image);
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