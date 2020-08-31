import { getManager, Repository, Any } from 'typeorm';
import { Gameserverip } from '../entities/Gameserverip';

/**
   * Returns last game server IP
   */
export const getGameServerIp = async () => {
    const lastIp = await getManager()
    .getRepository(Gameserverip)
    .createQueryBuilder("GSI")
    .orderBy({"GSI.lastUpdateTime": "DESC"})
    .where("GSI.status = 'true'")
    .getOne();
    return lastIp;
} 