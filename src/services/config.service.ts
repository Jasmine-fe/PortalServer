import { getManager, Repository, Any } from 'typeorm';
import { ConfigData } from '../entities/ConfigData';
import { ConfigTemplate } from '../entities/ConfigTemplate';
import { Gameslist } from '../entities/Gameslist';
import { configConvert } from '../models/config.model';
import { gameIdModel, configDataModel } from '../models/game.model'

/**
 * @swagger
 * definitions:
 *   ConfigData:
 *     type: object
 *     properties:
 *       gameid: 
 *          type: number
 *          description: id
 *       dictionary: 
 *          type: string
 *          description: dictionary
 *       gAcolumn:
 *          type: string
 *          description: gAcolumn
 *       defaultValue: 
 *          type: string
 *          description: defaultValue
 *       newValue: 
 *          type: string
 *          description: newValue
 *       id:
 *          type: number
 *          description: id
 *       gamename:
 *          type: string
 *          description: gamename
 */
export class ConfigService {
    configDataRepository: Repository<ConfigData>;
    configTemplateRepository: Repository<ConfigTemplate>;
    gameslistRepository: Repository<Gameslist>;

    constructor() {
        this.configDataRepository = getManager().getRepository(ConfigData);
        this.configTemplateRepository = getManager().getRepository(ConfigTemplate);
    }

/**
* @swagger
* /config/template:
*   get:
*     description: get config template
*     tags:
*       - config
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: successfully getConfigTemplate
*/
    async getConfigTemplate(req): Promise<any> {
        const dictionaries = [
            { "[core]": [] },
            { "[video]": [] },
            { "[audio]": [] },
            { "[filter]": [] },
            { "[ga-server-event-driven]": [] },
            { "[ga-client]": [] }
        ]
        const data = await this.configTemplateRepository
            .createQueryBuilder("CTR")
            .getMany();

        const res = await configConvert(dictionaries, data);
        return Promise.resolve(res);
    }

/**
* @swagger
* /config/data:
*   get:
*     description: get config dataList
*     tags:
*       - config
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: successfully getConfigTemplate
*/
    async getConfigData(req): Promise<any> {
        const data = await this.configDataRepository
            .createQueryBuilder("CDR")
            .getMany();

        const res = await configDataModel(data);
        return Promise.resolve(res);
    }

/**
* @swagger
* /config/data/new:
*   post:
*     description: get config dataList
*     tags:
*       - config
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - in: body
*         name: config
*         description: setDataConfig
*         schema:
*             type: object
*     responses:
*       200:
*         description: successfully recordDataConfig
*         schema:
*             type: object
*             properties:
*               success:
*                  type: string
*/
    async recordDataConfig(req): Promise<any> {

        var insertData : Array<ConfigData> = [];
        const modifyConfigs = req.body.config;
        const gName = req.body.gamename;
        for(var i = 0 ; i < modifyConfigs.length; i++) {
            const data = new ConfigData();
            data.gAcolumn = modifyConfigs[i]["gAcolumn"];
            data.dictionary = modifyConfigs[i]["dictionary"];
            data.defaultValue = modifyConfigs[i]["defaultValue"];
            data.newValue = modifyConfigs[i]["newValue"];
            data.gamename = gName;
            await insertData.push(data);
        }

        const data = await this.configDataRepository
            .save(insertData)
            .then(res => {
                console.log("configDataRepository insert successfully")
            })
            .catch(err => {
                console.log("configDataRepository insert error")
            });

        return Promise.resolve(data);
    }

/**
* @swagger
* /config/data/modify:
*   post:
*     description: get config dataList
*     tags:
*       - config
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - in: body
*         name: config
*         description: setDataConfig
*         schema:
*             type: object
*     responses:
*       200:
*         description: successfully setDataConfig
*         schema:
*             type: object
*             properties:
*               success:
*                  type: string
*/
    async setDataConfig(req): Promise<any> {
        console.log("setDataConfig", req.body);
        const modifyData = req.body.config;
        modifyData.forEach(async (element) => {
            await this.configDataRepository
                .createQueryBuilder()
                .update(ConfigData)
                .set({
                    newValue: element.newValue
                })
                .where("id = :id", { id: element.id })
                .execute();
        });
        return Promise.resolve(true);
    }


}
