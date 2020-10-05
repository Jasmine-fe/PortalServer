import { getManager, Repository, Any } from 'typeorm';
import { ConfigData } from '../entities/ConfigData';
import { ConfigTemplate } from '../entities/ConfigTemplate';
import { configConvert } from '../models/config.model';

export class ConfigService {
    configDataRepository: Repository<ConfigData>;
    configTemplateRepository: Repository<ConfigTemplate>;

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

}
