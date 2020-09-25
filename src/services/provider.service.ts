import { getManager, Repository, Any } from 'typeorm';
import { Gameslist } from '../entities/Gameslist';
import * as fs from 'fs-extra';
import * as unzipper from 'unzipper';

export class ProviderService {
    gameslistRepository: Repository<Gameslist>;
    constructor() {
        this.gameslistRepository = getManager().getRepository(Gameslist);
    }

/**
 * @swagger
 * /provider/image:
 *   post:
 *     description: upload image data
 *     tags:
 *       - provider
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 */
    async uploadImgFile(req): Promise<any> {
        const { gameName } = req.query;
        const filename = req.file.filename    
        const data = fs.readFileSync("src/uploads/" + filename)
        const res = await this.gameslistRepository
            .createQueryBuilder("GLR")
            .update(Gameslist)
            .set({
                imgPath: req.file.path
            })
            .where("name = :name", { name: gameName })
            .execute();
        
        return Promise.resolve(true);
    }

    // for test
    uploadZipFile(req): Promise<any> {
        return Promise.resolve(true);
    }



/**
 * @swagger
 * /provider/image:
 *   get:
 *     description: get image
 *     tags:
 *       - provider
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: gameName
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successfully get the progress game ip
 *         schema:
 *           type: object
 *           properties:
 *             image: 
 *               type: string
 */
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


/**
 * @swagger
 * /login:
 *   post:
 *     description: create new game
 *     tags:
 *       - login
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: name
 *         description: name
 *       - in: body
 *         name: descp
 *         description: descp
 *       - in: body
 *         name: providerId
 *         description: providerId
 */
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
                res ? Promise.resolve(true) : Promise.reject();
            })
            .catch(err => {
                console.log("err", err)
            })
        return res;
    }


} 