import { getManager, Repository, Any } from 'typeorm';
import { Connection } from '../entities/Connection';

/**
   * Returns last game server IP
   */
export const getGameServerIp = async () => {
    const lastIp = await getManager()
    .getRepository(Connection)
    .createQueryBuilder("GSI")
    .orderBy({"GSI.lastUpdateTime": "DESC"})
    .where("GSI.status = 'running'")
    .getOne();
    return lastIp;
} 