import { getManager, Repository, Any } from 'typeorm';
import { ConfigData } from '../entities/ConfigData';
import { ConfigTemplate } from '../entities/ConfigTemplate';
import { Gameslist } from '../entities/Gameslist';
import { configConvert } from '../models/config.model';
import { gameIdModel } from '../models/game.model'

export class ConfigService {
    configDataRepository: Repository<ConfigData>;
    configTemplateRepository: Repository<ConfigTemplate>;
    gameslistRepository: Repository<Gameslist>;

    constructor() {
        this.configDataRepository = getManager().getRepository(ConfigData);
        this.configTemplateRepository = getManager().getRepository(ConfigTemplate);
    }

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

    async getConfigDataList(req): Promise<any> {
        console.log("getConfigDataList")
        const list =  await this.gameslistRepository.find();
        const configData = await this.configDataRepository
            .createQueryBuilder("CDR")
            .getMany();
        console.log("list", list)
        console.log("configData", configData)
        const res = await gameIdModel(list, configData);
        console.log("res", res);
        return Promise.resolve(res);
    }

    async getConfigData(req): Promise<any> {
        const data = await this.configDataRepository
            .createQueryBuilder("CDR")
            .getMany();

        return Promise.resolve(true);
    }

    async recordDataConfig(req): Promise<any> {
        console.log("recordDataConfig req", req.body.gamename)

        var insertData : Array<ConfigData> = [];
        const modifyConfigs = req.body.config;
        const gName = req.body.gamename;
        for(var i = 0 ; i < modifyConfigs.length; i++) {
            const data = new ConfigData();
            data.gAcolumn = modifyConfigs[i]["GAcolumn"];
            data.newValue = modifyConfigs[i]["value"];
            data.gamename = gName;
            await insertData.push(data);
        }

        const data = await this.configDataRepository
            .save(insertData)
            .then(res => {
                console.log("configDataRepository res", res)
            })
            .catch(err => {
                console.log("configDataRepository error", err)
            });

        return Promise.resolve(true);
    }
    

}
