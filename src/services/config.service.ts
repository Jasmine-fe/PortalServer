import { getManager, Repository, Any } from 'typeorm';
import { ConfigTemplate } from '../entities/ConfigTemplate';
import { Gameslist } from '../entities/Gameslist';
import { configConvert } from '../models/config.model';
import { optionModel, configDataModel } from '../models/game.model'
import { ConfigData } from '../entities/ConfigData';
import { ConfigOption } from '../entities/ConfigOption';
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
 *       columnId:
 *          type: int
 *          description: columnId
 */
export class ConfigService {
    configDataRepository: Repository<ConfigData>;
    configOptionRepository: Repository<ConfigOption>;
    configTemplateRepository: Repository<ConfigTemplate>;
    gameslistRepository: Repository<Gameslist>;

    constructor() {
        this.configDataRepository = getManager().getRepository(ConfigData);
        this.configTemplateRepository = getManager().getRepository(ConfigTemplate);
        this.configOptionRepository = getManager().getRepository(ConfigOption);
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


    // add code here
    async getOptionData(req): Promise<any> {
        const options = await this.configOptionRepository
            .createQueryBuilder("COR")
            .getMany();

        const res = await optionModel(options);
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

        var insertData: Array<ConfigData> = [];
        const modifyConfigs = req.body.config;
        const gName = req.body.gamename;
        for (var i = 0; i < modifyConfigs.length; i++) {
            const data = new ConfigData();
            data.gAcolumn = modifyConfigs[i]["gAcolumn"];
            data.dictionary = modifyConfigs[i]["dictionary"];
            data.defaultValue = modifyConfigs[i]["defaultValue"];
            data.newValue = modifyConfigs[i]["newValue"];
            data.columnId = modifyConfigs[i]["columnId"];
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
        
        const modifyData = req.body.config;
        console.log("req.body.gamename", req.body.gamename);
        
        modifyData.forEach(async (element) => {
            console.log("element.columnId ", element.columnId );
            await this.configDataRepository
                .createQueryBuilder()
                .update(ConfigData)
                .set({
                    newValue: element.newValue
                })
                .where("columnId = :columnId", { columnId: element.columnId })
                .andWhere("gamename = :gamename", { gamename: req.body.gamename })
                .execute()
                .then(async (res: any) => {
                    const affectedCount = res.affected;
                    if (affectedCount < 1) {
                        const insertData = new ConfigData();
                        insertData.gAcolumn = element.gAcolumn
                        insertData.dictionary = element.dictionary
                        insertData.defaultValue = element.defaultValue
                        insertData.newValue = element.newValue
                        insertData.columnId = element.columnId
                        insertData.gamename = req.body.gamename
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
                    else {
                        Promise.resolve(res);
                    }

                })
        });
        return Promise.resolve(true);
    }


}
