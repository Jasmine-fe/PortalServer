import { getManager, Repository, Any } from 'typeorm';
import { Gaconnection } from '../entities/Gaconnection';

/**
   * Returns last game server IP
   */
export const getGameServerIp = async () => {
    const lastIp = await getManager()
    .getRepository(Gaconnection)
    .createQueryBuilder("GSI")
    .orderBy({"GSI.lastUpdateTime": "DESC"})
    .where("GSI.status = 'running'")
    .getOne();
    return lastIp;
} 